class AddHunkToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :hunk, :string
  end
end
