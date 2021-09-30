<script setup lang="ts">

import Markdown from "vue3-markdown-it";
import { GithubComment } from '../github-comment-parser';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const props = defineProps<{note: GithubComment}>();

function asRelativeDate(value: string) {
  return dayjs().to(dayjs(value));
}
</script>

<template>
  <div class="note">
    <div class="note-header">
      <span class="author">Georgios Kaleadis</span>
      <span class="note-separator"></span>
      <span class="note-date">{{ asRelativeDate(note.created_at) }}</span>
      <span class="note-separator"></span>
      Comment on lines <span>+{{ note.start_line }} +{{ note.line }}</span>

    </div>
    <div class="note-body">
      <Markdown :source="note.body"/>
    </div>
  </div>
</template>

<style scoped>
.author {
  font-weight: 600;
}
.note-separator::before {
  content: '·';
  display: inline-block;
  margin: 0 5px;
}
.note {
  margin: 10px;
  padding: 20px;
  border: 1px solid #dbdbdb;
}
</style>
