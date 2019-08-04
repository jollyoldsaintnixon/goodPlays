import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import gamesErrorsReducer from './games_errors_reducer'

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  games: gamesErrorsReducer
});

export default errorsReducer;
