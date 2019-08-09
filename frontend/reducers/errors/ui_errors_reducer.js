import { RECEIVE_UI_ERRORS, CLEAR_UI_ERRORS } from '../../actions/ui_actions'

export default (state = [], action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_UI_ERRORS:
      return 'No games matched search'
    case CLEAR_UI_ERRORS:
      return null
    default:
      return state
  }
}