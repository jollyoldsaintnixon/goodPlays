import * as APIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS'

// action creators
const receiveCurrentUser = user => {
  return ({
    type: RECEIVE_CURRENT_USER,
    user
  })
}

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
})

// thunk action creators
export const login = user => dispatch => {
  return APIUtil.login(user)
    .then(user => dispatch(receiveCurrentUser(user)),
      error => dispatch(receiveErrors(error.responseJSON)))
}

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(() => dispatch(logoutCurrentUser()),
      error => dispatch(receiveErrors(error.responseJSON)))
}

export const signup = user => dispatch => {
  return APIUtil.signup(user)
    .then((user) => dispatch(receiveCurrentUser(user)),
       error => dispatch(receiveErrors(error.responseJSON)))
}