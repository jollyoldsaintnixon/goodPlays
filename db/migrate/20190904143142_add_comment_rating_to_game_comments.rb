class AddCommentRatingToGameComments < ActiveRecord::Migration[5.2]
  def change
    add_column :game_comments, :rating, :integer
  end
end
