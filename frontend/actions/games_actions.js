import * as APIUtil from '../util/games_api_util'

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const RECEIVE_GAME = 'RECEIVE_GAME'
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS'
export const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS'

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

// thunk action creators

export const fetchGames = () => dispatch => {
  
  return APIUtil.fetchGames()
    .then(games => dispatch(receiveGames(games)),
      error => {
        
        return dispatch(receiveGameErrors(error.responseJSON))
      })
}

export const fetchGame = () => dispatch => {
  return APIUtil.fetchGame()
    .then(game => dispatch(receiveGame(game)),
      error => dispatch(receiveGameErrors(error.responseJSON)))
}