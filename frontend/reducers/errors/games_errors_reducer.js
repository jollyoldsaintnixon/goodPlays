import { RECEIVE_GAME_ERRORS, CLEAR_GAME_ERRORS, RECEIVE_GAMERACK_ERRORS } from '../../actions/games_actions'

export default (state = [], action) => {
  Object.freeze(state)
  
  switch (action.type) {
    case RECEIVE_GAMERACK_ERRORS:
      return action.errors
    case RECEIVE_GAME_ERRORS:
       
      return action.errors
    case CLEAR_GAME_ERRORS:
      return []
    default:
      return state
  }
}