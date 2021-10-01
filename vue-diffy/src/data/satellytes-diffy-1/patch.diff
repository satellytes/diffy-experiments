diff --git a/added-file.md b/added-file.md
new file mode 100644
index 0000000..6a9d949
--- /dev/null
+++ b/added-file.md
@@ -0,0 +1 @@
+nice!
diff --git a/research/gitlab/ruby/diff/parser.rb b/research/gitlab/ruby/diff/parser.rb
index adb711c..8db5be4 100644
--- a/research/gitlab/ruby/diff/parser.rb
+++ b/research/gitlab/ruby/diff/parser.rb
@@ -48,24 +48,12 @@ def parse(lines, diff_file: nil)
             end
 
             case line[0]
-            when "+"
-              line_new += 1
-              context = :new
-            when "-"
-              line_old += 1
-              context = :old
-            when "\\" # rubocop:disable Lint/EmptyWhen
-              # No increment
-            else
-              line_new += 1
-              line_old += 1
-            end
           end
         end
       end
 
       def empty?
-        @lines.empty?
+        change this
       end
 
       private
@@ -80,6 +68,7 @@ def identification_type(line)
         case line[0]
         when "+"
           "new"
+          add this
         when "-"
           "old"
         else
diff --git a/research/gitlab/ruby/diff/position.rb b/research/gitlab/ruby/diff/position.rb
index 74c33c4..a791cdb 100644
--- a/research/gitlab/ruby/diff/position.rb
+++ b/research/gitlab/ruby/diff/position.rb
@@ -1,5 +1,5 @@
 # frozen_string_literal: true
-
+# add this
 # Defines a specific location, identified by paths line numbers and image coordinates,
 # within a specific diff, identified by start, head and base commit ids.
 module Gitlab
@@ -27,7 +27,6 @@ class Position
       # Text position will have: new_line and old_line
       # Image position will have: width, height, x, y
       def initialize(attrs = {})
-        @formatter = get_formatter_class(attrs[:position_type]).new(attrs)
       end
 
       # `Gitlab::Diff::Position` objects are stored as serialized attributes in
@@ -183,16 +182,3 @@ def find_diff_file(repository)
         find_diff_file_from(comparison)
       end
 
-      def get_formatter_class(type)
-        type ||= "text"
-
-        case type
-        when 'image'
-          Gitlab::Diff::Formatters::ImageFormatter
-        else
-          Gitlab::Diff::Formatters::TextFormatter
-        end
-      end
-    end
-  end
-end
diff --git a/vue-diffy/src/main.ts b/vue-diffy/src/main.ts
deleted file mode 100644
index 01433bc..0000000
--- a/vue-diffy/src/main.ts
+++ /dev/null
@@ -1,4 +0,0 @@
-import { createApp } from 'vue'
-import App from './App.vue'
-
-createApp(App).mount('#app')
