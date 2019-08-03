class AddImageUrlToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :image_url, :string
  end
end
