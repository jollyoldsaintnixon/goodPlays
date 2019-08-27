# == Schema Information
#
# Table name: games
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  description  :text
#  release_date :date
#  developer_id :integer
#  price        :float
#  rating       :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  image_url    :string
#  genres       :string           default([]), is an Array
#  categories   :string           default([]), is an Array
#

class Game < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_one_attached :image

  has_many :game_racks
  has_many :users, through: :game_racks
  has_many :game_comments
end
