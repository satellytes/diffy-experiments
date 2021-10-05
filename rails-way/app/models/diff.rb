class Diff < ApplicationRecord
  has_many :comments, dependent: :destroy

  # this is not a full pars
  def diff_lines
    @diff_lines ||= DiffParser.new.parse(source.each_line, diff_file: self).to_a
  end
end
