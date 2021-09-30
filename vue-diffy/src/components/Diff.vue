<!--
Let's keep a mental model of the two other libraries here for reference.
Gitlab is processing their files into mere lines and dropping the hunk idea entirely
hile the react viewer is more naive and keeps the hunks. I like both ways and the hunk way
is easier to start with as it matches the available parsed format of hunks with lines.
Gitlab Outline:

diff_file
  diff-file-header
    # display the file, clipboard, line changes +9/-0 etc
  diff_content
    diff-view (file, lines)
      # iterate over all lines
      # no hunks just lines
      # hunks are divided by `diff-tr line_expansion match`
      # entries to expand the got in between which are not part of the diff
      # we can process the hunks

React Viewer Outline:
Hunk
  UnifiedHunk|SplitHunk (tbody)
    then render tr per line either with one or two cells (split or not)

-->
<script setup>

import {pick} from "lodash/object";

console.log('hello diff file')

import GithubComments from './../data/comments-github.json'
import Note from './Note.vue';
import {parseGithubComments} from "../github-comment-parser";

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

const {file} = defineProps({file: Object})

function findCommentForChange(comments, change) {
  change.lineNumber
  change.isDelete
  change.isNormal
  change.isInsert
  // console.log('findCommentForChange', {change, comments});

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
let x = 0;
function hunkToLines(hunk) {
  const comments = findCommentsForHunk(hunk);

  let hunkChangesLines = [];
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
      console.log(++x)
    }
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

const lines = fileToLines(file);
</script>

<!--

row/line
  left-side
    gutter/nr
    content
  right-side
    gutter
    content


row/line (old, new, context)
gutter/nr
content

row -> diff row or notes row (marked with renderCommentRow if form or discussion left or right)

a hunk is called a "match" in gitlab and the diff view separates diff content from matches with a flag `isMatchLine`.

-->
<template>
  <div class="file">
    <h2> A Diff File with {{file.hunks.length}} hunks</h2>

    <div class="hunk" >
      <template  v-for="line in lines">
        <!--render the code line-->
        <div class="hunk-header" v-if="line.hunk">
          {{line.hunkHeader}}
        </div>

        <!--render the code line-->
        <div v-if="line.code"  class="row code-line" :class="{added: line.change.isInsert, removed: line.change.isDelete}">
          <template v-if="line.change.isDelete">
            <div class="line-number">{{ line.change.lineNumber }}</div>
            <div class="line-number"></div>
          </template>

          <template v-if="line.change.isInsert">
            <div class="line-number"></div>
            <div class="line-number">{{ line.change.lineNumber }}</div>
          </template>


          <template v-if="line.change.isNormal">
            <div class="line-number">{{ line.change.oldLineNumber }}</div>
            <div class="line-number">{{ line.change.newLineNumber }}</div>
          </template>

          <div class="gutter">
            <template v-if="line.change.isDelete">-</template>
            <template v-if="line.change.isInsert">+</template>
          </div>
          <div class="code">{{line.change.content}}</div>
        </div>

        <!--render the comment if any is attached to the line-->
        <Note v-if="line.discussion" :note="line.note"/>
      </template>

    </div>
  </div>
</template>


<style scoped>
.file {
}
.hunk-header {
  background-color: #ddf4ff;
}
.row {
  display: grid;
  grid-template-columns: 50px 50px 50px 1fr;
  padding: 0 18px;
}

.row.added {
  background-color: #ecfdf0;
}

.row.removed {
  background-color: #fbe9eb;
}


.hunk {
}

.hunk + .hunk {
  margin-top: 20px;
}
.code-line {
  white-space: break-spaces;
}
</style>

