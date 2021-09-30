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
<script setup lang="ts">
import Note from './Note.vue';
import {parseDiff} from '../utils/parse-diff';
import {GitDiffParserType} from "../utils/parse-github";
const {file} = defineProps<{file: GitDiffParserType}>();
const lines = parseDiff(file);

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
    <div>
      <strong>{{file.newPath ?? file.oldPath}} ({{file.type}})</strong>
      <br>{{file.hunks.length}} hunks
    </div>
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
</template>


<style scoped>
.file {
  border: 1px solid #aaaaaa;
  padding: 5px;
}

.file + .file {
  margin-top: 20px;
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

.code-line {
  white-space: break-spaces;
}
</style>

