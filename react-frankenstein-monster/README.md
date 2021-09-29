# Experiment 1: Frankenstein's monster (React)
Let's create a frankenstein's monster to quickly gain experience and find the fastest way to satisfy our first goal to display a diff with comments.
Run `yarn install && yarn start` once installed to see that we have a diff with comments being displayed (our first goal ✅).

It's a monster because I just picked whatever was required to make this work. We have now a monster
that can display a given diff file and merge it with the comments I authored on GitHub (json file).

Go through the gutter (with the line numbers) and when you see a `plus` icon click it to add your own comments (not persisted though). That's taken straight from the demo site of `react-diff-view` and merge into our repo. 👍

Read the following parts to follow how I ended up here. It's the log I created in parallel.

## diff2html & parser
First experiments with diff2html. Used the parser to check the overall data format. Then iused their html builder
to create a first output.

Next I wanted to use the parser, create the data structure, cherry pick some data processing functions
to create a small react representation. Once I dug deeper I got curious what people created with react around this topic.

## react projects
There is one horrible component (https://github.com/praneshr/react-diff-viewer) that has a bad architecture as it expected the old and new text and does some parsing inside instead of just expecting a unified diff string.

The other component looks much better (https://github.com/otakustay/react-diff-view) and it uses a git diff parser dependency (https://github.com/ecomfe/gitdiff-parser) to create the data presentation of the format. The parser speaks about context lines being "normal lines" instead of context as in the standard itself but as the rest looks fine I trust the code covers the area pretty good.

The component also has some architecture that speaks about being expandable (widgets/gutter). I also see screenshots of comments. When I do a quick rendering comments are not obviously there. You have to go into their example site and cherry pick that code, it's not a magic plugin. I like that and matches the way we want to progress here. Slowly and maintaining control over a small core.

I check if I can find an easy way to combine the good parts into something that we want: parser + view with comments
and potential add some way to add comments. react-diff-view has a great widget & gutter architecture. I got comments working and try to hydrate them with the github list somehow.

## gitlab
Github is not open source and I couldn't find the diff viewer sources (ignore the leaked sources of github). That's why I looked into gitlab.
Gitlab has als an ability to comment inside merge requests and I think the diff rendering
can be found here. It's made with Vue https://github.com/gitlabhq/gitlabhq/tree/master/app/assets/javascripts/diffs/

Comments are called discussions or notes. There is a `notes` component collection and one for `diffs` like this (diff with note): https://github.com/gitlabhq/gitlabhq/blob/4abacac9af9ab869f6be50449345b07d7ed99af1/app/assets/javascripts/notes/components/diff_with_note.vue

for the markdown editor in `note_form` through (vue_shared/components/markdown/field.vue) they use  `GitLab flavoured Markdown` so it's something custom built-in (could not find any lib)

-> The vue base brings vue into this experiment. I think it's a good match and in addition to the frankenstein project based on react and the existing technical base in shape of `react-diff-view` we might be able to use the diff parser that project uses ([Diff Parser](https://github.com/ecomfe/gitdiff-parser)) to create our own minimal project to display the diff and the comments. I like the react project and the architecture but we should give us some more time to tinker around with the foundation of the diff format and doing it yourself is the best way to do that. WE can decide later on in which direction we want to head
