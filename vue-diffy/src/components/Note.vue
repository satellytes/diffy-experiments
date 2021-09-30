<script setup lang="ts">

import Markdown from "vue3-markdown-it";
const props = defineProps<{note: GithubComment}>();
</script>

<template>
  <div class="note">
    <div class="note-header">
      <span class="author">Georgios Kaleadis</span>
      <span class="note-separator"></span>
      <span class="note-separator">1 week ago</span>
      Comment on lines <span class="note-separator">+{{ note.start_line }} +{{ note.line }}</span>

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

.note {
  margin: 10px;
  padding: 20px;
  border: 1px solid #dbdbdb;
}
</style>
