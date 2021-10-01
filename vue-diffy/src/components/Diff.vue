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
import { DiffFile } from '../utils/parse-github';
import {DiffLineType} from '../utils/parse-github';
const {file} = defineProps<{file: DiffFile}>();
console.log(file)
</script>


<template>
  <div class="file">
    <div class="file-header">
      <strong>{{file.newPath ?? file.oldPath}} ({{file.changeType}})</strong>
      <br>{{file.lines.length}} lines
    </div>
    <template  v-for="line in file.lines">
      <!--render any hunk header line given -->
      <div v-if="line.type === DiffLineType.Hunk" class="hunk">
        {{line.content}}
      </div>

      <template v-if="line.type !== DiffLineType.Hunk">
        <!--render the code line-->
        <div class="row code-line" :class="{added: line.type === DiffLineType.Addition, removed: line.type === DiffLineType.Removal}">
          <div class="line-number" :class="{added: line.type === DiffLineType.Addition, removed: line.type === DiffLineType.Removal}">{{ line.oldLine }}</div>
          <div class="line-number" :class="{added: line.type === DiffLineType.Addition, removed: line.type === DiffLineType.Removal}">{{ line.newLine }}</div>

          <div class="gutter">
            <template v-if="line.type === DiffLineType.Removal">-</template>
            <template v-if="line.type === DiffLineType.Addition">+</template>
          </div>
          <div class="code">{{line.content}}</div>
        </div>

        <!--render the comment if any is attached to the line-->
        <Note v-if="line.note" :note="line.note"/>
      </template>
    </template>
  </div>
</template>


<style scoped>
.file-header {
  padding: 10px;
}

.line-number {
  background-color: #fafafa;
  border-right: 1px solid #f0f0f0;
  padding: 0 10px 0 5px;
  text-align: right;
  color: rgba(0,0,0,0.3);
}

.line-number.added {
  background-color: #ddfbe6;
  border-color: #c7f0d2;
}

.line-number.removed {
  background-color: #f9d7dc;
  border-color: #fac5cd;
}

.file {
  border: 1px solid #aaaaaa;
}

.file + .file {
  margin-top: 20px;
}

.row {
  display: grid;
  grid-template-columns: 50px 50px 30px 1fr;
}
.hunk {
  text-align: left;
  background-color: #ddf4ff;
  padding: 10px;
  padding-left: 150px;
  border-top: 1px solid #aaaaaa;
  border-bottom: 1px solid #aaaaaa;
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
.gutter {
  text-align: center;
}
.code {
  padding: 0 1.5em;
  font-family: "Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;
  color: #303030;
}
</style>

