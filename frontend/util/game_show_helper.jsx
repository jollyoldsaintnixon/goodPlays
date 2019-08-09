export const handleClick = (game) => {
  return e => {
    this.props.history.push(`/games/show/${game.id}`)
  }
}

export const addGame = (gameId, component) => {
  return e => {
    e.preventDefault()
    component.props.addGameToUser(gameId)
    // component.props.history.push(`/games/show/${gameId}`)
  }
}

export const removeGame = (gameId, component) => {
  return e => {
    e.preventDefault()
    component.props.deleteGameFromUser(gameId)
    // component.props.history.push(`/games/show/${gameId}`)
  }
}