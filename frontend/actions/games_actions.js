import * as APIUtil from '../util/games_api_util'

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const RECEIVE_GAME = 'RECEIVE_GAME'
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS'
export const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS'
export const RECEIVE_GAMERACK_ERRORS = 'RECEIVE_GAMERACK_ERRORS'

// action creators
const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games
})

const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
})

const receiveGameErrors = errors => ({
  type: RECEIVE_GAME_ERRORS,
  errors
})

export const clearGameErrors = () => ({
  type: CLEAR_GAME_ERRORS
})

export const receiveGameRackErrors = errors => ({
  type: RECEIVE_GAMERACK_ERRORS,
  errors
})
// thunk action creators


export const fetchGames = () => dispatch => {
  
  const promise = APIUtil.fetchGames()
  debugger
  return promise.then(games => dispatch(receiveGames(games)),
      error => {      
        return dispatch(receiveGameErrors(error.responseJSON))
      })
}

export const fetchGame = (id) => dispatch => {
  debugger
  const promise = APIUtil.fetchGame(id)
  debugger
  return (
    promise.then(game => {
      debugger
      return dispatch(receiveGame(game))
    },
      error => {
        debugger
        return dispatch(receiveGameErrors(error.responseJSON))})
      )
}