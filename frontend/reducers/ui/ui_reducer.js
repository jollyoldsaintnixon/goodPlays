import { combineReducers } from 'redux';
import uiGamesReducer from './ui_games_reducer';
import modalReducer from './modal_reducer'

const uiReducer = combineReducers({
  games: uiGamesReducer,
  modal: modalReducer,
})

export default uiReducer