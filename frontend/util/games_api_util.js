export const fetchGames = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/games',
  })
}

export const fetchGame = id => {
  debugger
  return $.ajax({
    method: 'GET',
    url: `/api/games${id}`,
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