import { RECEIVE_COUNT } from '../../actions/games_actions'
import { merge } from 'lodash'

export default (state = 0, action) => {
  Object.freeze(state)
  

  switch (action.type) {
    case RECEIVE_COUNT:
      return action.num
    default:
      return state;
  }
}