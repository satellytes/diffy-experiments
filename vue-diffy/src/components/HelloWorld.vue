<script setup lang="ts">
import PatchDiff from '../data/patch.diff?raw';
import gitDiffParser from 'gitdiff-parser';

import { ref } from 'vue'
import Diff from './Diff.vue'
defineProps<{ msg: string }>()

// we know there is only one file in there
const diffFiles = gitDiffParser.parse(PatchDiff);
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <Diff v-for="diffFile of diffFiles" :file="diffFile"/>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
