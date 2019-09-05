import { RECEIVE_GAMES, RECEIVE_GAME, RECEIVE_PAGE_OF_GAMES } from '../../actions/games_actions'
// import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions'
import { merge } from 'lodash'
import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions';

export default (state = {}, action) => {
  
  Object.freeze(state)
  
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games
    case RECEIVE_GAME:
      return merge({}, state, { [action.game.id]: action.game })
    case RECEIVE_PAGE_OF_GAMES:
      return merge({}, state, action.games)
    // case RECEIVE_GAME_COMMENT:
    //   return merge({}, state, { [action.game.id]: action.game })
    default:
      return state;
  }
}