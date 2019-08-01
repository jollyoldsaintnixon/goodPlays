class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :title, null: false
      t.text :description
      t.date :release_date
      t.integer :developer_id
      t.float :price
      t.float :rating

      t.timestamps
    end
    add_index :games, :developer_id
    add_index :games, :title, unique: true
  end
end
