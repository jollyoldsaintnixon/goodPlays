import * as APIUtil from '../util/games_comments_api_util'
export const RECEIVE_GAME_COMMENT = 'RECEIVE_GAME_COMMENT'
export const RECEIVE_GAME_COMMENTS = 'RECEIVE_GAME_COMMENTS'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'


const receiveGameComment = comment => {
    // user = comment.author
    // game = comment.game
    // parent = comment.parent
    return ({
        type: RECEIVE_GAME_COMMENT,
        comment,
    })
}

const receiveGameComments = comments => {
    
    return ({
        type: RECEIVE_GAME_COMMENTS,
        comments
    })
}

export const addGameComment = comment => dispatch => {
    return APIUtil.addGameComment(comment)
            .then(comment => dispatch(receiveGameComment(comment)))
}

export const fetchGameCommentsByGame = game_id => dispatch => {
    
    return APIUtil.fetchGameCommentsByGame(game_id)
        .then(comments => dispatch(receiveGameComments(comments)))
}

export const fetchGameCommentsByUser = () => dispatch => {
    
    return APIUtil.fetchGameCommentsByGame()
        .then(comments => dispatch(receiveGameComments(comments)))
}

export const deleteGameComment = game_comment_id => dispatch => {
    return APIUtil.deleteGameComment(game_comment_id)
        .then(comments => dispatch(receiveGameComments(comments)))
}