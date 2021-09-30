<script setup lang="ts">
import Diff from './components/Diff.vue'
// that's so cool, it's just working by appending `?raw`, compare this with the raw-loader from webpack 🤩
import PatchDiff from './data/patch-v2.diff?raw';
import PatchCommentGitHub from './data/comments-github-v2.json';
import { parseGithubPR } from './utils/parse-github';

const diffFiles = parseGithubPR(PatchDiff, PatchCommentGitHub);

</script>

<template>
  <Diff v-for="diffFile of diffFiles" :file="diffFile"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 20px;
}
</style>
