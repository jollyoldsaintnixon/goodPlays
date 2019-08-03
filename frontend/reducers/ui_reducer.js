import { combineReducers } from 'redux';
import uiGamesReducer from './ui_games_reducer'

const uiReducer = combineReducers({games: uiGamesReducer})

export default uiReducer