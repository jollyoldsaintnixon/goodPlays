# == Schema Information
#
# Table name: game_comments
#
#  id         :bigint           not null, primary key
#  game_id    :integer          not null
#  author_id  :integer          not null
#  title      :string           not null
#  body       :text
#  parent_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  username   :string
#  rating     :integer
#

require 'test_helper'

class GameCommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
