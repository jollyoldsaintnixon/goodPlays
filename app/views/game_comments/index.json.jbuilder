@comments.each do |comment|
    json.set! comment.id do
        json.partial! `api/game_comments/game_comments`, comment: comment
    end
end