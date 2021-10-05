class Comment < ApplicationRecord
  belongs_to :diff
  belongs_to :author, class_name: 'User'
  enum side: %i[left right]
end
