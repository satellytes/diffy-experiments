A repository where we tinker around with diffs.

1. Create a way to display diff + comments (like in github)
2. Provide a way to author comments
3. Provide a simple role model to display comments only to specific users

Read the [Notion Docs](https://www.notion.so/satellytes/Codename-Diffy-ef969ac1cf0c428087b7936f744e2609) for more insights about the plan 

---

# Experiments
Click for details
+ [ Frankenstein's Monster (React Parse & View w/ comments)](react-frankenstein-monster/)
+ [ Vue Diffy (organic growing with parser & viewer)](vue-diffy/)

# Lost & Found
Some stuff I needed to fetch data from github or whatever comes.

Fetch latest github comments from an example repo so we have some standardized format to merge with the local diffs.
The comment format is okay but the comments on the "right" side can be `context` or `addition` changes and we have to find out ourselves by searchign the hunk for the matching lines to find out where the comment belongs.

```
# fetch a first I prepared with some example data PR
curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/georgiee/temporary-comment-api/pulls/2/comments >| comments-github.json

# fetch second PR comments and diff
curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/satellytes/diffy/pulls/1/comments >| comments-github-v2.json
curl \
    https://patch-diff.githubusercontent.com/raw/satellytes/diffy/pull/1.diff  >| patch-v2.diff

# pick only the interesting fields (requires jq)
cat comments-github-v2.json | jq '.[] | {body, diff_hunk, position, original_position, created_at, start_line, original_start_line, start_side, line, original_line, side}'
# or combine

curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/satellytes/diffy/pulls/1/comments | jq '.[] | {body, diff_hunk, position, original_position, created_at, start_line, original_start_line, start_side, line, original_line, side}' | jq '[inputs]' >| comments-github-v2.json
  
```

Interesting. Two comments on the same line but on the right and left side (addition and removal) are not

# Resources
The interesting things I found:
+ [praneshr/react-diff-viewer (pretty bad, ignore the existence of the unified diff format)](https://github.com/praneshr/react-diff-viewer)
+ [react-diff-view (great architecture 🌟)](https://github.com/otakustay/react-diff-view)
+ [Gitlab Diff Viewer (Vue based 🙏)](https://github.com/gitlabhq/gitlabhq/tree/master/app/assets/javascripts/diffs/)
+ [Diff Parser](https://github.com/ecomfe/gitdiff-parser)
+ [Unified Diff Format](https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html)
+ [Gitlab Reference Commit with many changes and some comments](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/70664/diffs)
+ [Gitlab docs about workign with diffs and notes](https://docs.gitlab.com/ee/development/diffs.html)
+ [Gitlab Diffs youtube ](https://www.youtube.com/watch?v=K6G3gMcFyek)
+ [Gitlab Deep Dive including diff videos, pdf, slides (okay but not that useful)](https://gitlab.com/gitlab-org/create-stage/-/issues/1)
+ 
