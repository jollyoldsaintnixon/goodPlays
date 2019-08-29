import * as APIUtil from '../util/games_comments_api_util'
export const RECEIVE_GAME_COMMENT = 'RECEIVE_GAME_COMMENT'
export const RECEIVE_GAME_COMMENTS = 'RECEIVE_GAME_COMMENTS'


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
    debugger
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
    debugger
    return APIUtil.fetchGameCommentsByGame(game_id)
        .then(comments => dispatch(receiveGameComments(comments)))
}