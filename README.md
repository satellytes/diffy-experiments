A repository where we tinker around with diffs.

1. Create a way to display diff + comments (like in github)
2. Provide a way to author comments
3. Provide a simple role model to display comments only to specific users

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
curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/georgiee/temporary-comment-api/pulls/2/comments >| comments-github.json

```

Interesting. Two comments on the same line but on the right and left side (addition and removal) are not

# Resources
The interesting things I found:
+ [praneshr/react-diff-viewer (pretty bad, ignore the existence of the unified diff format)](https://github.com/praneshr/react-diff-viewer)
+ [react-diff-view (great architecture 🌟)](https://github.com/otakustay/react-diff-view)
+ [Gitlab Diff Viewer (Vue based 🙏)](https://github.com/gitlabhq/gitlabhq/tree/master/app/assets/javascripts/diffs/)
+ [Diff Parser](https://github.com/ecomfe/gitdiff-parser)
+ [Unified Diff Format](https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html)
+ []
