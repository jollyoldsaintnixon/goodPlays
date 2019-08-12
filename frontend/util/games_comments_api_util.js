export const addGameComment = game_id => {
    return $.ajax({
        method: 'POST',
        url: `/api/game_comments`,
        data: { game: { game_id } }
    })
}

export const deleteGameComment = (game_comment_id, game_id) => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/game_comments/${game_comment_id}`,
        data: { 
            game: { game_id,
            game_comment_id },
        }
    })
}

