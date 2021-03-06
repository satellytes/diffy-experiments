require 'rails_helper'
require "diff_parser"

# Taken from gitlab to have some parsed content on the backend side
RSpec.describe DiffParser do
  let(:diff) {  }
  let(:parser) { described_class.new }
  let(:diff) do
    <<eos
--- a/files/ruby/popen.rb
+++ b/files/ruby/popen.rb
@@ -6,12 +6,18 @@ module Popen

   def popen(cmd, path=nil)
     unless cmd.is_a?(Array)
-      raise "System commands must be given as an array of strings"
+      raise RuntimeError, "System commands must be given as an array of strings"
     end

     path ||= Dir.pwd
-    vars = { "PWD" => path }
-    options = { chdir: path }
+
+    vars = {
+      "PWD" => path
+    }
+
+    options = {
+      chdir: path
+    }

     unless File.directory?(path)
       FileUtils.mkdir_p(path)
@@ -19,6 +25,7 @@ module Popen

     @cmd_output = ""
     @cmd_status = 0
+
     Open3.popen3(vars, *cmd, options) do |stdin, stdout, stderr, wait_thr|
       @cmd_output << stdout.read
       @cmd_output << stderr.read
eos
  end

  before do
    @lines = parser.parse(diff.lines).to_a
  end


  it { expect(@lines.size).to eq(30) }

  describe 'lines' do
    describe 'first line' do
      let(:line) { @lines.first }
      it {
        expect(line.type).to eq('match')
      }
      it { expect(line.old_pos).to eq(6) }
      it { expect(line.new_pos).to eq(6) }
      it { expect(line.text).to eq('@@ -6,12 +6,18 @@ module Popen') }
    end
  end
end
