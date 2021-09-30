import PatchDiff from '../data/patch-v2.diff';
import PatchCommentGitHub from '../data/comments-github-v2.json';
import { parseGithubPR } from '../utils/parse-github';

describe("works", () => {
  test('works', () => {
    parseGithubPR(PatchDiff, PatchCommentGitHub)
  })
})
