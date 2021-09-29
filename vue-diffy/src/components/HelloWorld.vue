<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    works
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Comments from '../../data/comments-github.json';
// oh what a surprise and thanks to this comment (https://forum.vuejs.org/t/importing-text-file-as-string-in-vue-cli-3/37784/3)
// this just works. In Angular (or any other webpack project) I know about this but it's still a pain in the ass to load text files with TS
// until it works mostly because of the typing but sometimes also for unknown reasons. Nice 🙌
import PatchDiff from 'raw-loader!../../data/patch.diff';
import { parseDiff } from '@/utils/parse-diff';

const diffParsedResult = parseDiff(PatchDiff);
// TODO: We have the comments and the parsed diff
// we can now merge them into an appropriate data format to process later with
// vue to display

console.log('Comments', Comments, diffParsedResult)

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
