export const addGameComment = comment => {
    return $.ajax({
        method: 'POST',
        url: `/game_comments`,
        data: { comment }
    })
}

export const fetchGameCommentsByGame = game_id => {
    return $.ajax({
        method: 'GET',
        url: `/game_comments`,
        data: { game_id },
    })
}

export const deleteGameComment = (game_comment_id, game_id) => {
    return $.ajax({
        method: 'DELETE',
        url: `/game_comments/${game_comment_id}`,
        data: { 
            game: { game_id,
            game_comment_id },
        }
    })
}

