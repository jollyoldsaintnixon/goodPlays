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

export const fetchGameCommentsByUser= () => {
    return $.ajax({
        method: 'GET',
        url: `/game_comments`,
        // data: { game_id },
    })
}

export const deleteGameComment = (game_comment_id) => {
    debugger
    return $.ajax({
        method: 'DELETE',
        url: `/game_comments/${game_comment_id}`,
        data: { 
            game_comment_id
        }
    })
}

