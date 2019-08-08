export const RECEIVE_UI_GAMES = 'RECEIVE_UI_GAMES'
export const CLEAR_UI_GAMES = 'CLEAR_UI_GAMES'
export const RECEIVE_UI_ERRORS = 'RECEIVE_UI_ERRORS'
export const CLEAR_UI_ERRORS = 'CLEAR_UI_ERRORS'

export const receiveUiGames = games => ({
  type: RECEIVE_UI_GAMES,
  games
})

export const clearUiGames = () => ({
  type: CLEAR_UI_GAMES
})

export const receiveUiErrors = () => ({
  type: RECEIVE_UI_ERRORS
})

export const clearUiErrors = () => ({
  type: CLEAR_UI_ERRORS
})
