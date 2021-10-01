import PatchDiff from '../data/pr-test-02/patch-v2.diff';
import PatchCommentGitHub from '../data/pr-test-02/comments-github-v2.json';
import { parseGithubPR } from '../utils/parse-github';

/**
 * just a runner to quickly rerun this partial code for development purposes.
 */
describe("works", () => {
  test('works', () => {
    parseGithubPR(PatchDiff, PatchCommentGitHub)
  })
})
