class CreateGameComments < ActiveRecord::Migration[5.2]
  def change
    create_table :game_comments do |t|
      t.integer :game_id, null: false
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :body
      t.integer :parent_id

      t.timestamps
    end
    add_index :game_comments, :game_id
    add_index :game_comments, :author_id
  end
end
