/**
 * parse github diff & comments into an appropriate diff with comments format
 * we can process
 */
import gitDiffParser from 'gitdiff-parser';
import { GithubComment } from '../github-comment-parser';

/**
 * some specific types matching the output of the parser
 * which doesn't ship any types. Makes our life easier when mangling
 * the data.
 */
export interface GitDiffParserChange {
  content: string;
  type: string;
  isInsert: boolean;
  isNormal: boolean;
  isDelete: boolean;
  lineNumber?: number;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface GitDiffParserHunk {
  content: string,
  oldStart: number,
  newStart: number,
  oldLines: number,
  newLines: number,
  changes: GitDiffParserChange[];
}

export interface GitDiffParserType {
  hunks: GitDiffParserHunk[];
  newEndingNewLine: boolean
  newMode: string
  newPath: string;
  newRevision: string;
  oldEndingNewLine: true
  oldPath: string;
  oldRevision: string;
  type: string;
}

enum DiffLineType {
  Context = "normal",
  Addition = "insert",
  Removal = "delete"
}

interface DiffNote {
  date: string;
  body: string;
}

interface DiffLine {
  content: string;
  type: DiffLineType
  oldLine: number | null;
  newLine: number | null;
  changeOriginal: any;
  // optional comment anchored at this line
  // can still refer to multiple lines
  note: DiffNote | null;
}

/**
 * the parser we are using return different variables
 * A we are doing basically a normalization of lineNumber, oldLineNumber & newLineNumber
 * into the value oldLine & newLine which is fully sufficient.
 *
 * It's well defined what we get.
 * For an addition: the new line is defined, old line is null
 * For a deletion: the old line is defined, and new line is null
 * For a context line: both lines are defined
 */
function getSourceLineForChange(change: GitDiffParserChange) {
  const changeType = change.type as DiffLineType;
  if(changeType === DiffLineType.Removal) {
    return {
      oldLine: change.lineNumber!,
      newLine: null
    }
  }

  if(changeType === DiffLineType.Addition) {
    return {
      oldLine: null,
      newLine: change.lineNumber!
    }
  }

  if(changeType === DiffLineType.Context) {
    return {
      oldLine: change.oldLineNumber!,
      newLine: change.newLineNumber!
    }
  }
  return {
    oldLine: null,
    newLine: null
  }
}

function commentToNote(comment: GithubComment): DiffNote {
  return {
    body: comment.body,
    date: comment.created_at
  }
}

function findCommentForChange(change, comments: GithubComment[], line) {
  let comment;
  if(change.isDelete) {
    comment = comments.find(comment => comment.original_line === change.lineNumber && comment.side === "LEFT") ?? null
  }

  if(change.isInsert) {
    comment = comments.find(comment => comment.original_line === change.lineNumber && comment.side === "RIGHT") ?? null
  }

  if(change.isNormal) {
    comment = comments.find(comment => comment.original_line === change.newLineNumber && comment.side === "RIGHT") ?? null
  }

  if(comment) {
    return commentToNote(comment);
  }

  return null;
}

function mapChangeToLine(change: GitDiffParserChange, comments: GithubComment[]): DiffLine {
  const changeType = change.type as DiffLineType;
  const line = getSourceLineForChange(change);

  return {
    content: change.content,
    type: changeType,
    oldLine: line.oldLine,
    newLine: line.newLine,
    changeOriginal: change,
    note: findCommentForChange(change, comments, line)
  }
}

export function parseGithubPR(diff, comments) {
  // this will get as an arbitrary diff format we can interact with but it's not perfect
  // and it's lacking any support for comments
  const result = gitDiffParser.parse(diff) as GitDiffParserType[];
  const [firstFile, secondFile] = result;
  const [firstComment] = comments;
  // let wire the data a little bit different to our liking
  // ...
  console.log(firstFile, secondFile, firstComment)
  const [hunk] = secondFile.hunks;

  const lines = hunk.changes.map(change => mapChangeToLine(change, comments))
  debugger;
  return [firstFile, secondFile];
}


