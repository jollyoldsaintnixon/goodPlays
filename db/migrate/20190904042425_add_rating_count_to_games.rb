class AddRatingCountToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :rating_count, :integer, default: 0
  end
end
