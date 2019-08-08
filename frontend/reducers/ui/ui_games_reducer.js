import { RECEIVE_UI_GAMES, CLEAR_UI_GAMES} from '../../actions/ui_actions'
import { RECEIVE_GAMES} from '../../actions/games_actions'
import { CLOSE_MODAL } from '../../actions/modal_actions';

const uiGamesReducer = (state = null, action) => {

  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_UI_GAMES:
      return action.games.map(game => {
        return game.id
      })
    // case RECEIVE_GAMES:
    //   return Object.values(action.games)
    case RECEIVE_GAMES:
      return state
    case CLEAR_UI_GAMES:
      debugger
      return []
    case CLOSE_MODAL:  // THIS IS A CODE SMELL; ONLY DOING THIS TO GET ADVANCED SEARCH WORKING
      return state
    default:
      return []
  }
}

export default uiGamesReducer