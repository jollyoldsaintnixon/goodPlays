class GameComment < ApplicationRecord
    validates :title, :author_id, :game_id, presence: true

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
