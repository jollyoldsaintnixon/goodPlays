# == Schema Information
#
# Table name: game_racks
#
#  id         :bigint           not null, primary key
#  user_id    :integer
#  game_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GameRack < ApplicationRecord
  validates :user_id, uniqueness: {scope: :game_id,
    message: 'game already added to rack'}
  belongs_to :user
  belongs_to :game
end
