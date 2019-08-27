import * as APIUtil from '../util/games_comments_api_util'
export const RECEIVE_GAME_COMMENT = 'RECEIVE_GAME_COMMENT'

const receiveGameComment = (comment) => {
    debugger
    // user = comment.author
    // game = comment.game
    // parent = comment.parent
    return ({
        type: RECEIVE_GAME_COMMENT,
        comment,
    })
}

export const addGameComment = comment => dispatch => {
    return APIUtil.addGameComment(comment)
            .then(comment => dispatch(receiveGameComment(comment)))
}