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

class GameComment < ApplicationRecord
    validates :body, :author_id, :game_id, :username, presence: true

    belongs_to :game

    belongs_to :author,
    class_name: :User,
    foreign_key: :author_id,
    primary_key: :id

    belongs_to :parent,
    class_name: :GameComment,
    foreign_key: :parent_id,
    primary_key: :id,
    optional: true

    has_many :children,
    class_name: :GameComment,
    foreign_key: :parent_id,
    primary_key: :id

end
