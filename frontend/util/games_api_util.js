export const fetchGames = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/games',
  })
}

export const fetchPagesOfGames = (page) => {
  debugger
  return $.ajax({
    method: 'GET',
    url: '/api/games',
    data: { page },
  })
}

export const fetchNGames = (page) => {
  debugger
  return $.ajax({
    method: 'GET',
    url: '/api/games',
    data: { page }
    // url: '/api/games/ngames/',
  })
}

export const getCount = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/count`
  })
}

export const fetchGame = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/games/${id}`,
  })
}

export const addGame = id => {
  return $.ajax({
    method: 'POST',
    url: `/api/game_racks`,
    data: {id}
  })
}

export const deleteGame = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/game_racks/${id}`,
    data: { id }
  })
}