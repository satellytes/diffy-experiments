import gitDiffParser from 'gitdiff-parser';

/**
 * cherry picked from to get the git diff normalization in place
 * we need for the parser even though we feed in an actual git diff file anyway right now.
 * https://github.com/otakustay/react-diff-view/blob/f9e5f9f248f331598e5c9e7839fccb211efe43c2/src/utils/parse.js
 */
const normalizeDiffText = text => {
    // Git diff header:
    //
    // diff --git a/test/fixture/test/ci.go b/test/fixture/test/ci.go
    // index 6829b8a2..4c565f1b 100644
    // --- a/test/fixture/test/ci.go
    // +++ b/test/fixture/test/ci.go
    if (text.indexOf('diff --git') === 0) {
        return text;
    }

    // Unidiff header:
    //
    // --- /test/fixture/test/ci.go 2002-02-21 23:30:39.942229878 -0800
    // +++ /test/fixture/test/ci.go 2002-02-21 23:30:50.442260588 -0800
    const indexOfFirstLineBreak = text.indexOf('\n');
    const indexOfSecondLineBreak = text.indexOf('\n', indexOfFirstLineBreak + 1);
    const firstLine = text.slice(0, indexOfFirstLineBreak);
    const secondLine = text.slice(indexOfFirstLineBreak + 1, indexOfSecondLineBreak);
    const oldPath = firstLine.split(' ').slice(1, -3).join(' ');
    const newPath = secondLine.split(' ').slice(1, -3).join(' ');
    const segments = [
        `diff --git a/${oldPath} b/${newPath}`,
        'index 1111111..2222222 100644',
        `--- a/${oldPath}`,
        `+++ b/${newPath}`,
        text.slice(indexOfSecondLineBreak + 1),
    ];

    return segments.join('\n');
};

export const parseDiff = (text, options = {}) => {
    const diffText = normalizeDiffText(text.trim());
    return gitDiffParser.parse(diffText);
};
