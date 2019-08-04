class AddGenresToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :genres, :string, array: true, default: [] 
    add_column :games, :categories, :string, array: true, default: []
  end
end
