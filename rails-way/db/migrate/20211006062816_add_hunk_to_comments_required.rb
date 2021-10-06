class AddHunkToCommentsRequired < ActiveRecord::Migration[6.1]
  def change
    change_column :comments, :hunk, :string, :default => "", :null => false
  end
end
