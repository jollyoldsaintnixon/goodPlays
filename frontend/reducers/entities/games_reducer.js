import { RECEIVE_GAMES, RECEIVE_GAME, RECEIVE_PAGE_OF_GAMES } from '../../actions/games_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games
    case RECEIVE_GAME:
      return merge({}, state, {[action.game.id]: action.game})
    case RECEIVE_PAGE_OF_GAMES:
      return merge({}, state, action.games)
    default:
      return state;
  }
}