class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name

      t.timestamps
    end

    remove_column :comments, :author, :string
    add_reference :comments, :author, null: false, foreign_key: { to_table: :users }
  end
end
