# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

diff1 = Diff.create(title: "satellytes-diffy-1", source: File.read("db/diffs/patch-1.diff"))
diff1.comments.create(author: "Georgios", body: "That works and is great")
Diff.create(title: "georgiee-temporary-comment-api-2", source: File.read("db/diffs/patch-2.diff"))
