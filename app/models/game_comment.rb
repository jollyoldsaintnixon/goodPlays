class GameComment < ApplicationRecord
    validates :title, :author_id, :game_id, presence: true

    has_many :games

    belongs_to :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id,

    belongs_to :parent,
    class_name: :GameComment,
    foreign_key: :parent_id,
    primary_key: :id

end
