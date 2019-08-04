import React from 'react'
import { Link } from 'react-router-dom'


export const GameIndexItem = ({game}) => {
    // debugger
    return (
      <li className='game-index-item' >
          <Link to={`/games/show/${game.id}`} >{game.title}</Link>
      </li>
    )
}