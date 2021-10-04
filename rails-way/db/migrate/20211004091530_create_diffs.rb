class CreateDiffs < ActiveRecord::Migration[6.1]
  def change
    create_table :diffs do |t|
      t.text :source
      t.string :title

      t.timestamps
    end
  end
end
