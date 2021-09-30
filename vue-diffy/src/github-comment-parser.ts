import { pick } from 'lodash/object';

export interface GithubComment {
  body: string;
  diff_hunk: string;
  original_line: number;
  original_position: number;
  original_start_line: number;
  position: number;
  side: string;
  start_line: number;
  start_side: string;
}

export function parseGithubComments(comments):GithubComment[] {
  return comments.map(item => pick(item, ['body', 'diff_hunk', 'original_line', 'original_position', 'original_start_line', 'position', 'side', 'start_line', 'start_side']));
}

