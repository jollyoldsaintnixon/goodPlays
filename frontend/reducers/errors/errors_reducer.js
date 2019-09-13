import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import gamesErrorsReducer from './games_errors_reducer'
import uiErrorsReducer from './ui_errors_reducer'
import gameCommentErrorsReducer from './game_comment_errors_reducer'

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  games: gamesErrorsReducer,
  ui: uiErrorsReducer,
  game_comments: gameCommentErrorsReducer,
});

export default errorsReducer;
