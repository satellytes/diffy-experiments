import React, { useCallback, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { html, parse } from 'diff2html/lib-esm/diff2html';
import { PATCH_DIFF } from './example-diff';
import CommentTrigger from './CommentTrigger';

import GithubComments from './comments-github.json'
import {parseDiff, Diff, Hunk, getChangeKey, findChangeByNewLineNumber } from 'react-diff-view';
import { nanoid } from 'nanoid';
import "react-diff-view/style"
// import { applyLineGroupping } from './diff-html-cherries';
// import gitDiffParser from 'gitdiff-parser';
import Comment from './Comment';


// const PARSED_DIFF = parse(PATCH_DIFF);

const [firstDiffFiles] = parse(PATCH_DIFF);
// let's pretend the file only has a single block, to focus on details
// firstDiffFiles.blocks = [firstDiffFiles.blocks[0]];
// const blockGrouped = applyLineGroupping(firstDiffFiles.blocks[0]);


/**
 * the github comments come with the full hunk and we need to extract the hunk header (first line)
 * in order to match a comment with an actual parsed hunk
 */
const getHunkHeaderFromComment = comment => {
  const HUNK_HEADER = /(^@@.*)\n/
  const regex = comment.diff_hunk.match(HUNK_HEADER)
  if(regex) {
    const [_, commentHunkHeader] = regex
    return commentHunkHeader
  }

  return null;
}

/**
 * custom function to match github comment data with the local hunks
 * @param files
 */
function githubCommentsToDiffComments(files) {
  const [firstFile] = files;
  console.log('***githubCommentsToDiffComments')

  const [firstComment] = GithubComments;
  const header = getHunkHeaderFromComment(firstComment)
  const matchingHunk = firstFile.hunks.find(hunk => hunk.content === header);
  const line = firstComment.line;
  const side = firstComment.side;

  console.log({matchingHunk}, firstComment, line, side)
  // console.log(GithubComments)

  const getChangeKeyForComment = comment => {
    if(comment.side === 'LEFT') {
      // always deletion
      return `D${comment.line}`
    }else if(comment.side === 'RIGHT') {
      // insertion or context
      // so let's use the `findChangeByNewLineNumber` helper as the line refers to the new line number
      // on the right side. This ensure we get the right change type (context or insertion)
      // hopefully 🤞
      const change = findChangeByNewLineNumber(firstFile.hunks, comment.line);
      return getChangeKey(change);
      // return `I${comment.line}`
    }
  }

  const changes20 = findChangeByNewLineNumber(firstFile.hunks, 20)
  console.log('--->changes20', changes20);

  return GithubComments.map(item => {
    const header = getHunkHeaderFromComment(item)
    const matchingHunk = firstFile.hunks.find(hunk => hunk.content === header);

    const changeKey = getChangeKeyForComment(item);


    // console.log('matchingHunk', matchingHunk, item)
    /**
     * TODO: The context comment 'that's cool but was here before' is not shown
     * because the line in the comment refers to 20 (new) but it's 16 in (old) which
     * seems to be required by the engine. The context needs the old numbers.
     * We might be able to use `computeOldLineNumber` or so, but for this we need to find the matching
     * change entries in the hunk
     */

    // console.log(changeKey, item)
    return {
      changeKey: changeKey,
      content: item.body,
      id: nanoid(),
      state: "display",
      time: new Date()
    }
  })
}


/**
 * cherry picked from the demo site given by react-diff-view
 */
const useComments = (INITIAL_COMMENTS = []) => {
  // inteface Comment {
  //     id: string;
  //     changeKey: string;
  //     state: 'create' | 'edit' | 'display';
  //     content: string;
  //     time: Date;
  // }
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const addComment = useCallback(
    changeKey => {
      const addNew = state => [
        ...state,
        {changeKey, id: nanoid(), state: 'create', content: '', time: new Date()},
      ];
      setComments(addNew);
    },
    []
  );
  const editComment = useCallback(
    commentId => {
      const mayUpdate = comment => {
        if (comment.id !== commentId) {
          return comment;
        }

        return {...comment, state: 'edit'};
      };
      setComments(s => s.map(mayUpdate));
    },
    []
  );
  const saveEdit = useCallback(
    (commentId, content) => {
      const mayUpdate = comment => {
        if (comment.id !== commentId) {
          return comment;
        }

        return {...comment, content, state: 'display', time: new Date()};
      };
      setComments(s => s.map(mayUpdate));
    },
    []
  );
  const cancelEdit = useCallback(
    (commentId, content) => {
      if (content) {
        const mayUpdate = comment => {
          if (comment.id !== commentId) {
            return comment;
          }

          return {...comment, state: 'display'};
        };
        setComments(s => s.map(mayUpdate));
      }
    },
    []
  );
  const deleteComment = useCallback(
    commentId => setComments(s => s.filter(v => v.id !== commentId)),
    []
  );

  return [comments, {addComment, editComment, saveEdit, cancelEdit, deleteComment}];
};

/**
 * quick and dirty react app to get things running with `react-diff-view`
 */
const App = ({diffText}) => {
  const files = parseDiff(diffText);

  const INITIAL_COMMENTS = githubCommentsToDiffComments(files);

  const viewType = 'split'
  const [comments, {addComment, editComment, saveEdit, cancelEdit, deleteComment}] = useComments(INITIAL_COMMENTS);


  const renderGutter = useCallback(
    ({change, side, inHoverState, renderDefault, wrapInAnchor}) => {
      const canComment = inHoverState && (viewType === 'split' || side === 'new');
      if (canComment) {
        return <CommentTrigger change={change} onClick={addComment} />;
      }

      return wrapInAnchor(renderDefault());
    },
    [addComment, viewType]
  );

  console.log({comments, GithubComments, files})
  const widgets = useMemo(
    () => comments.reduce(
      (widgets, comment) => {
        if (!widgets[comment.changeKey]) {
          // eslint-disable-next-line no-param-reassign
          widgets[comment.changeKey] = [];
        }
        widgets[comment.changeKey].push(
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            state={comment.state}
            time={comment.time}
            onSave={saveEdit}
            onEdit={editComment}
            onCancel={cancelEdit}
            onDelete={deleteComment}
          />
        );
        return widgets;
      },
      {}
    ),
    [comments, saveEdit, editComment, cancelEdit, deleteComment]
  );


  const renderFile = ({oldRevision, newRevision, type, hunks}) => (
    <Diff renderGutter={renderGutter} widgets={widgets}  key={oldRevision + '-' + newRevision} viewType="split" diffType={type} hunks={hunks}>
      {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
    </Diff>
  );

  return (
    <div>
      {files.map(renderFile)}
    </div>
  );
};

ReactDOM.render(
  <App diffText={PATCH_DIFF}/>,
  document.getElementById('root'),
)

// out of the box result from `diff2html`  (to compare with the react results)
// diff2html is not that expandable so it's more like a
// spiritual idea to check against because it's working pretty good as the diff viewer

const diffHtml = html([firstDiffFiles], {
  drawFileList: true,
  matching: 'lines',
  outputFormat: 'side-by-side',
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('diff2html').innerHTML = diffHtml;
});


/** TRASH from previous sesssions
 *
 *
 * import { PATCH_DIFF } from './example-diff';

 console.log('works2')
 import {parse, html } from "diff2html/lib-esm/diff2html"
 import {DiffFile } from "diff2html/lib-esm/types"
 // import comments from './comments-github-lightweight.json'

 // copied from https://github.com/georgiee/temporary-comment-api/pull/2.diff

 const [result] = parse(PATCH_DIFF);
 const [firstBlock, secondBlock] = result.blocks;
 const lines = firstBlock.lines
 // @@ -1,6 the deleted/removed lines plus context = the lines from the previous file (6)
 // const deletions = lines.filter(item => item.type === 'delete' || item.type === 'context').length
 // +1,10 the inserted/new lines plus context = the lines from the new file (10)
 // const insertions = lines.filter(item => item.type === 'insert' || item.type === 'context').length
 // console.log(deletions, insertions, lines)


 // const hunk1Comments = findCommentsForHunk(firstBlock, comments);
 // console.log({hunk1Comments})


 var diffHtml = html(PATCH_DIFF, {
    drawFileList: true,
    matching: 'lines',
    outputFormat: 'side-by-side',
});

 document.addEventListener('DOMContentLoaded', () => {
    console.log({diffHtml})
    document.getElementById('root2').innerHTML = diffHtml;
});


 function findCommentsForHunk(block, comments) {
    // first filter matching comments then reorganize into a list of comment + matching lines (in case of a multiline comment
    return comments
        .filter(comment => blockMatchesComment(block,comment))
        .reduce((accu, comment) => {
        const matchingLines = findLines(block, comment)
        accu.push({comment, matchingLines})

        return accu;
    }, [])
}

 function findLines(block, comment) {
    const firstMatchingLine = block.lines.filter(line => {
        const firstLine = comment.start_line ?? comment.line
        const lastLine = comment.line;
        const multiLine = comment.start_line !== null
        return line.newNumber >= firstLine && line.newNumber <= lastLine
    });
    return firstMatchingLine;
}

 function blockMatchesComment(block, comment) {
    const HUNK_HEADER = /(^@@.*)\n/
    const regex = comment.diff_hunk.match(HUNK_HEADER)
    if(regex) {
        const [_, match] = regex
        return match === block.header
    }

    return false;
}


 */
