import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import gamesErrorsReducer from './games_errors_reducer'
import uiErrorsReducer from './ui_errors_reducer'

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  games: gamesErrorsReducer,
  ui: uiErrorsReducer,
});

export default errorsReducer;
