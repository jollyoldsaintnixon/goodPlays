import React from 'react'

export function GameIndexItemDisplay({game, className}) {

  if (!game) {
    return null
  }

  let expand = null;
  let slice = game.description.slice(0, 250)
  function more() {   
    if (game.description.length > 250) {
      return (
      <p>
        {slice}
        <span>...</span>
      </p>
      )
    }
    return null
  }

  return (
    <div className={`${className} ${expand} game-index-item-display`}>
      <h1>{game.title}</h1>
      <h2>${game.price}</h2>
      <>{more()}</>
    </div>
  )

}