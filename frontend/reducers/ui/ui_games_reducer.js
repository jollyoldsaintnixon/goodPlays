import { RECEIVE_UI_GAMES, CLEAR_UI_GAMES} from '../../actions/ui_actions'
import { RECEIVE_GAMES} from '../../actions/games_actions'

const uiGamesReducer = (state = null, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_UI_GAMES:
      return action.games
    case RECEIVE_GAMES:
      return Object.values(action.games)
    case CLEAR_UI_GAMES:
      return []
    default:
      return state
  }
}

export default uiGamesReducer