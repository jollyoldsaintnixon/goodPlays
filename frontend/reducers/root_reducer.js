// gems
import { combineReducers } from 'redux';
// reducers
import errorsReducer from './errors/errors_reducer';
import entitiesReducer from './entities/entities_reducer';
import sessionReducer from './session/session_reducer';
import uiReducer from './ui/ui_reducer'

export default combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  session: sessionReducer,
  ui: uiReducer,
})
