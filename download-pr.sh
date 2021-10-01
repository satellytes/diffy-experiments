#!/bin/bash

# I don't know what I'm doing, just need named parameters in bas
# via https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash

# Invoke like this from the root of the repo
# ./download-pr.sh --repo satellytes/diffy --pr 1 --output vue-diffy/src/data
# ./download-pr.sh --repo georgiee/temporary-comment-api --pr 2 --output vue-diffy/src/data

# forget about nodes
# I wanted a quick solution. this worked.
# then I wanted to make it more beautiful, regex, full pr url
# went to node and then the dependency hell (yargs, node-fetch) started and I immediately stopped

# I also tried to fetch regex groups to parse a full url with bash. what a horror, don't try. Hell is opening otherwise. 😁
# that was the regex to extract repo and pr from a given url
# https:\/\/github.com\/(.*)\/(.*)\/pull\/(\d)

POSITIONAL=()
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -r|--repo)
      REPO="$2"
      shift # past argument
      shift # past value
      ;;
    -p|--pr)
      PR="$2"
      shift # past argument
      shift # past value
      ;;
    -o|--output)
      OUTPUT="$2"
      shift # past argument
      shift # past value
      ;;
    *)    # unknown option
      POSITIONAL+=("$1") # save it in an array for later

      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL[@]}" # restore positional parameters



REPO_KEBAP="${REPO//\//-}"
OUTPUT_FOLDER="${OUTPUT}/${REPO_KEBAP}-${PR}/"
#
mkdir -p "$OUTPUT_FOLDER"
echo $OUTPUT_FOLDER
curl "https://patch-diff.githubusercontent.com/raw/$REPO/pull/$PR.diff"  >| $OUTPUT_FOLDER/patch.diff
echo "https://api.github.com/repos/$REPO/pulls/$PR/comments"
curl \
  -H "Accept: application/vnd.github.v3+json" "https://api.github.com/repos/$REPO/pulls/$PR/comments" \
  | jq '.[] | {body, diff_hunk, position, original_position, created_at, start_line, original_start_line, start_side, line, original_line, side}' \
  | jq -n '[inputs]' \
  >| "$OUTPUT_FOLDER/comments.json"
