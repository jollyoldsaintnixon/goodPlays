import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import gamesReducer from './games_reducer';
import gamesCountReducer from './games_count_reducer'
import gameCommentsReducer from './game_comments_reducer'

const entitiesReducer = combineReducers({
  users: usersReducer,
  games: gamesReducer,
  game_comments: gameCommentsReducer,
  count: gamesCountReducer,
});

export default entitiesReducer;