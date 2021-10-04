class Comment < ApplicationRecord
  belongs_to :diff
  enum side: %i[left right]
end
