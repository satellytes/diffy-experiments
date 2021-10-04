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
