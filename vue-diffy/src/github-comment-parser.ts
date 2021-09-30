import { pick } from 'lodash/object';

export interface GithubComment {
  body: string;
  diff_hunk: string;
  original_line: number;
  original_position: number;
  original_start_line: number;
  position: number;
  line: number;
  side: string;
  start_line: number;
  start_side: string;
  created_at: string;
}

export interface Note {
  body: string
  // what else do we want
  // how to handle single line (old, new is enough?)
  // how to handle multi line

}

export function parseGithubComments(comments):GithubComment[] {
  console.log(comments)
  return comments.map(item => pick(item, ['body', 'line', 'created_at', 'diff_hunk', 'original_line', 'original_position', 'original_start_line', 'position', 'side', 'start_line', 'start_side']));
}

