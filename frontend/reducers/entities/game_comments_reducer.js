import { RECEIVE_GAME_COMMENT, RECEIVE_GAME_COMMENTS } from '../../actions/game_comments_actions';
import { merge } from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_GAME_COMMENT:
            const id = action.comment.id
            return merge({}, state, { [id]: action.comment })
        case RECEIVE_GAME_COMMENTS:
            return action.comments
        default:
            return state
    }
}