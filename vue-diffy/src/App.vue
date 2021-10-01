<script setup lang="ts">
import Diff from './components/Diff.vue'
// alternative from https://github.com/satellytes/diffy/pull/1
// that's so cool, it's just working by appending `?raw`, compare this with the raw-loader from webpack 🤩
import PatchDiff from './data/satellytes-diffy-1/patch.diff?raw';
import CommentsGitHub from './data/satellytes-diffy-1/comments.json';

// alternative from https://github.com/georgiee/temporary-comment-api/pull/2
// import PatchDiff from './data/georgiee-temporary-comment-api-2/patch.diff?raw';
// import CommentsGitHub from './data/georgiee-temporary-comment-api-2/comments.json';

import { parseGithubPR } from './utils/parse-github';
const diffFiles = parseGithubPR(PatchDiff, CommentsGitHub);
</script>

<template>
  <div class="app">
    <Diff v-for="file of diffFiles" :file="file"/>
  </div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: auto;
  max-width: 960px;
}
</style>
