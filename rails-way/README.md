# README

Rails backend/base for our diffy tool. 
## Getting started
New to Ruby? Ideally you use `rbenv` or `rvm` (rbenv is more lightweight) to manage different ruby versions (comparable to `n` or `nvm`, they took the ideas from Ruby I guess 😎).

Then install the bundler (kind of npm) and then rails (globally is fine and normal). Once you are done you can run `rails serve` in an existing repo or create new projects with the built-in generators.

Rails has a great DB migration functionality and you might need to prepare the database with `rake db:migrate`. Read the docs for all information. A SQLLite DB is bundled (Postgres is kind of the standard and we can swap later if we need)

There is a `seed.rb` to provide initial data for the local development database. Use `rake db:migrate` to insert the data into the local database or run `rake db:seed:replant` to reset and insert the data.

## What, why Rails?
Because I had a great time using it for five years (~2010-2015).
It's kind of boring technology these days because things are not changing dramatically, but I think it's a great plus
and the developer ergonomics are so great. The JavaScript Node community is a wild west in comparison. That's why I would
like to give it a chance and it might be very intresting for people not knowing Rails yet.

## Approach
The plan is to provide the diff viewer with vue (because it works great, see the other repo) but provide
the rest of the application through Rails. Either focus on the API (through Rails API) or embed more logic 
and create a class backend driven experience.

I would like to create an easy way to create challenges for any given technical interview. Creatign a challenge includes
picking from a set of given diffs & questions, assigning an applicant and then provide different views for the applicant and interviewer to give comments.

The following things I plan to provide
+ Curated Diffs (with problem descriptions per code line (comments))
+ Curated Technical Questions (to pick from)
+ Challenges (multiple diffs & questions bound to an applicant)
+ Users (Applicants, Interviewers)

## Notes (or Coming back from the dark side)
I have not done many CRUD stuff in the past years. The focus was on the frontend. Which was good.
But for this project I want to push forward so I had to touch the backend universe again. Being a Ruby on Rails developer at hearts I wanted to use it to drive my development. I was sure that this was the right tool not to stand in my way.

Of course I had to read about Rails again to get back into the mood again (being absent since ~Rails v3 probably, v6 is released now). The fun is there from the beginning. Here a list I will grow:
+ The generator is super convenient and every RoR developer uses it where in JavaScript you are always undecided and sometimes thinks are not working as expected. In Rails many times you find generators you wouldn't expect
+ The database migration is just fund. `rake db:drop`,  `rake db:migrate`, `rake:db:reset` or `rake db:seed` are some commands you can use to modify your database. It's so much fun. I'm sure migrations are available in many other backend frameworks but it just works great in Rails and I have a lot of fun just shaping the models 🌟
+ The meta programming aspects of Ruby are perfectly integrated in Ruby on Rails. I love things like `diffs.comments.create(author: 'Georgios', body: 'Works')` just work because of a single line in the model `has_many :comments, dependent: :destroy` and Rails creates everything related to the dependent model 'comments' including the foreign key relationship to the parent diff model. 

## Lost & Found
Main entry point for gitlab merge request file + comments seems to be:
(all diff files involved)
https://gitlab.com/theeunknowns/test/-/merge_requests/1/diffs_batch.json?diff_head=true&view=inline&w=0&page=0&per_page=5

(all discussions/threads. four single comments create four discussions with a single note)
https://gitlab.com/theeunknowns/test/-/merge_requests/1/discussions.json

Installed vite ruby to make vite with vue possible.
There is now a second server to run if we want to actively develop js: `bundle exec vite dev`
otherwise vite itself builds once when rails is starting.

Introduced the great `Grape` API framework and created a first endpoint. While doing so I also checked
the documentation on how autoloading is working these days (finding the stuff without requiring it which is super common with ruby).

Here is the great documentation for the `Zeitwerk` autloading mechanism:
this https://guides.rubyonrails.org/v6.0.3/autoloading_and_reloading_constants.html
With the API at our hands we can provide json API output for our vue diff viewer (once we make it available)

(hello world works: localhost:3000/api/hello )

I also struggled sorting my mind today. Diffs are parsed in gitlab because they are a fully fledged system. If we go that routes
it's like being back at zero after the great success with vue. Maybe it's fine to store the diff files as is (plain text), have user + comments in addition. Without a proper parser we can't validate any new comments and we are very dependent on the frontend to make any sense of the comments (we will kind of mimic the github comment output because that's what we are reading right now).

I think this is the best for the first step: Store plain diffs plus users & comments. No other parsing artefacts. The rest should happen in the frontend which should send comment + metadata (lines etc, hunk header?). We can then slightly refactor to have a more atomic structure of diffs > hunks > lines so comments can refer to the lines more easily. but that's sounds like the future right now.

good to know: `alt + p` toggles the performance badge in the output. 


preparing deployment to heroku, installing heroku with brew
and then follow the heroku with rails 6 guide (not 12 factor gem anymore) https://devcenter.heroku.com/articles/getting-started-with-rails6

we need to switch to postgress for heroku, sqlite is not supported on their platform.
there is a nice app for osx (https://postgresapp.com/). The default credentials created are a database with the name of the local user
with the same password. I changed the config/database.yml and rerun the migrations and the app was working very well on postgres. It's very possible that this could work as a mixed approach because we don't have very complex databases. Makes it easier for other people to start the project in any case.
