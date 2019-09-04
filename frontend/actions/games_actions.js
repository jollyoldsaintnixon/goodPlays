import * as APIUtil from '../util/games_api_util'

export const RECEIVE_GAMES = 'RECEIVE_GAMES'
export const RECEIVE_GAME = 'RECEIVE_GAME'
export const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS'
export const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS'
export const RECEIVE_GAMERACK_ERRORS = 'RECEIVE_GAMERACK_ERRORS'
export const RECEIVE_PAGE_OF_GAMES = 'RECEIVE_PAGE_OF_GAMES'
export const RECEIVE_COUNT = 'RECEIVE_COUNT'

// action creators
const receivePageOfGames = games => ({
  type: RECEIVE_PAGE_OF_GAMES,
  games
})

const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games
})

export const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
})

const receiveGameErrors = errors => ({
  type: RECEIVE_GAME_ERRORS,
  errors
})

const receiveCount = num => ({
  type: RECEIVE_COUNT,
  num
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
  return promise.then(games => dispatch(receiveGames(games)),
      error => {      
        return dispatch(receiveGameErrors(error.responseJSON))
      })
}

export const fetchPagesOfGames = page => dispatch => {
   
  return APIUtil.fetchPagesOfGames(page)
    .then(games => dispatch(receivePageOfGames(games)),
      error => dispatch(receiveGameErrors(error.responseJSON))
    )
}

export const fetchGame = (id) => dispatch => {
  const promise = APIUtil.fetchGame(id)
  return (
    promise.then(game => {
  
      return dispatch(receiveGame(game))
    },
      error => {
    
        return dispatch(receiveGameErrors(error.responseJSON))})
      )
}

export const fetchNGames = idx => dispatch => {
  return APIUtil.fetchNGames(idx)
    .then(games => dispatch(receivePageOfGames(games)))
}

export const getCount = () => dispatch => {
  return APIUtil.getCount()
    .then(num => dispatch(receiveCount(num)))
}

export const updateGameRating = comment => dispatch => {
  return APIUtil.updateGameRating(comment)
    .then(game => dispatch(receiveGame(game)), error => dispatch(receiveGameErrors(error.responseJSON)))
}