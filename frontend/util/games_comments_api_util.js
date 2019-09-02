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
    
    return $.ajax({
        method: 'DELETE',
        url: `/game_comments/${game_comment_id}`,
        data: { 
            game_comment_id
        }
    })
}

export const updateGameComment = comment => {
    return $.ajax({
        method: 'PATCH',
        url: `/game_comments/${comment.id}`,
        data: { comment }
    })
}

