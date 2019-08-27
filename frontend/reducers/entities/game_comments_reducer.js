import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions';
import { merge } from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_GAME_COMMENT:
            debugger
            const id = action.comment.id
            return merge({}, state, { [id]: action.comment })
        default:
            return state
    }
}