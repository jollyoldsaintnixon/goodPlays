import React from 'react'
import { Link } from 'react-router-dom'


export const GameIndexItem = ({game}) => {
  
    return (
      <li>
        <div className='game-show'>
          <Link to={`/games/show/${game.id}`} >{game.title}</Link>
          {/* <Route link="/games/:game_id"></Route> */}
          {/* this.props.games[this.props.match.params.game_id] */}
        </div>
      </li>
    )
}