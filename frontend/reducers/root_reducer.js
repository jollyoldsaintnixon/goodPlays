// gems
import { combineReducers } from 'redux';
// reducers
import errorsReducer from './errors_reducer';
import entitiesReducer from './entities_reducer';
import sessionReducer from './session_reducer';
import uiReducer from './ui_reducer'

export default combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  session: sessionReducer,
  ui: uiReducer,
})
