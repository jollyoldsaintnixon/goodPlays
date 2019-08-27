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

require 'test_helper'

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
