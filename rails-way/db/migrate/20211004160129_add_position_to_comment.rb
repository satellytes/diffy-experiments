class AddPositionToComment < ActiveRecord::Migration[6.1]
  def change
    add_column(:comments, :line, :string)
    add_column(:comments, :side,  :integer, default: 0)
  end
end
