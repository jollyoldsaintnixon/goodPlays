import React from 'react'

export function NavSearchList({ gameList }) {

  const gameListItems = gameList.map(game => {
    return <li key={`search-item-${game.id}`} id={game.id} onClick={this.dropDownSelect.bind(this)}>
    {game.title}</li>
  })

  return (
    null
  )

}