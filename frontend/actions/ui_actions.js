export const RECEIVE_UI_GAMES = 'RECEIVE_UI_GAMES'
export const CLEAR_UI_GAMES = 'CLEAR_UI_GAMES'

export const receiveUiGames = games => ({
  type: RECEIVE_UI_GAMES,
  games
})

export const clearUiGames = () => ({
  type: CLEAR_UI_GAMES
})