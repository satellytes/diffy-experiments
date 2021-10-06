# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: "Georgios Kaleadis")
diff1 = Diff.create(title: "satellytes-diffy-1", source: File.read("db/diffs/patch-1.diff"))
diff1.comments.create(author: user, body: "That works and is great", line:1, side: 0, hunk: '@@ -183,16 +182,3 @@ def find_diff_file(repository)')

diff2 = Diff.create(title: "georgiee-temporary-comment-api-2", source: File.read("db/diffs/patch-2.diff"))
diff2.comments.create(author: user, body: "That is also cool", line: 13, side: 1, hunk: '@@ -16,10 +20,23 @@ body {')
diff2.comments.create(author: user, body: "Neat", line: 563, side: 1, hunk: '@@ -1,6 +1,10 @@')
