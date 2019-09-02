json.partial! `api/game_comments/game_comments`, comment: @comment
json.time_ago time_ago_in_words(comment.created_at)
json.time_since_update time_ago_in_words(comment.updated_at)