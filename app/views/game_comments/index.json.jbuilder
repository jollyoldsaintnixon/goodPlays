@comments.each do |comment|
    
    # time_ago = time_ago_in_words(comment.created_at)
    json.set! comment.id do
        # json.partial! `game_comments/game_comment`, comment: comment
        # :id, :title, :body, :author_id, :game_id
        json.extract! comment, :id, :title, :body, :author_id, :game_id, :username, :parent_id, :created_at, :updated_at
        json.time_ago time_ago_in_words(comment.created_at) # built in helper method to show how long since a DateTime object
    end 
end