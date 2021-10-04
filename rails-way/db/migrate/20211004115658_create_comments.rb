class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.string :author

      t.timestamps
    end
    add_reference :comments, :diff, null: false, foreign_key: true
  end
end
