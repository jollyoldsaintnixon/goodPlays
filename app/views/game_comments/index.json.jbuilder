@comments.each do |comment|
    json.set! comment.id do
        # json.partial! `game_comments/game_comment`, comment: comment
        # :id, :title, :body, :author_id, :game_id
        json.extract! comment, :id, :title, :body, :author_id, :game_id, :username, :parent_id
    end
end