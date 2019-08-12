class Game < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_one_attached :image

  has_many :game_racks
  has_many :users, through: :game_racks
  has_many :game_comments
end
