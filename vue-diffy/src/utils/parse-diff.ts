import {parseGithubComments} from "../github-comment-parser";
import GithubComments from './../data/comments-github.json'
const getHunkHeaderFromComment = comment => {
  const HUNK_HEADER = /(^@@.*)\n/
  const regex = comment.diff_hunk.match(HUNK_HEADER)
  if(regex) {
    const [_, commentHunkHeader] = regex
    return commentHunkHeader
  }

  return null;
}
const AVAILABLE_COMMENT = parseGithubComments(GithubComments);

function findCommentForChange(comments, change) {
  if(change.isDelete) {
    return comments.find(comment => comment.original_line === change.lineNumber && comment.side === "LEFT") ?? null
  }
  if(change.isInsert) {
    return comments.find(comment => comment.original_line === change.lineNumber && comment.side === "RIGHT") ?? null
  }
  if(change.isNormal) {
    // oldLineNumber //16
    // newLineNumber //20
    return comments.find(comment => comment.original_line === change.newLineNumber && comment.side === "RIGHT") ?? null
  }
  // item.lineNumber === 31 && item.isInsert
  return null;
}

function findCommentsForHunk(hunk) {
  return AVAILABLE_COMMENT.filter(comment => {
    return hunk.content === getHunkHeaderFromComment(comment);
  });
}

function hunkToLines(hunk) {
  const comments = findCommentsForHunk(hunk);

  let hunkChangesLines: any[] = [];
  hunkChangesLines.push({
    hunk: true,
    code: false,
    discussion: false,
    hunkHeader: hunk.content
  })

  const hunkLines = hunk.changes.reduce((accu, item)=> {
    accu.push({
      hunk: false,
      code: true,
      discussion: false,
      hunkHeader: null,
      change: item
    });

    const comment = findCommentForChange(comments, item);
    if(comment) {
      accu.push({
        hunk: false,
        code: false,
        discussion: true,
        note: comment,
        hunkHeader: null,
        change: null
      });
    }
    return accu;
  }, [])

  hunkChangesLines.push(...hunkLines);
  return hunkChangesLines;
}

function fileToLines(file) {
  return file.hunks.reduce((accu, hunkItem) => {
    const lines = hunkToLines(hunkItem);
    accu.push(...lines)

    return accu;
  }, [])
}



export function parseDiff(file) {
  return fileToLines(file);
};
