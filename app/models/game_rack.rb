class GameRack < ApplicationRecord
  validates :user_id, uniqueness: {scope: :game_id,
    message: 'game already added to rack'}
  belongs_to :user
  belongs_to :game
end
