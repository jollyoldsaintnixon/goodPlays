import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
// import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions'
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    // case RECEIVE_GAME_COMMENT:
    //   return Object.assign({}, state, {[action.user.id]: action.user});
    default:
      return state;
    } 
}