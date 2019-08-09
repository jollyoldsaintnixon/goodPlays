import React from 'react'
import { ulFromArray } from '../../util/helper_functions'
import { Link } from 'react-router-dom'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'
import { connect } from 'react-redux'
import { removeGame } from '../../util/game_show_helper'

class UserGameRack extends React.Component {
  constructor(props) {
    super(props)

    this.rackList = this.rackList.bind(this)
  }

  rackList(gameRackGames) {
    const { userId } = this.props
    if (gameRackGames) {
      const list = gameRackGames.map((game) => {
        return (
          <li className='game-box'
            key={`user-${userId}-game-${game.id}`}>
            <Link to={`/games/show/${game.id}`}>
              <ul className='game-rack-info'>
                <div>
                  <h5>{game.title}</h5>
                  <span></span>
                  <li>Price: ${game.price}</li>
                  <li className='game-genres'>Genres: {game.genres.join(', ')}</li>
                  <li className='game-categories'>Categories: {game.categories.join(', ')}</li>
                </div>
                <button onClick={removeGame(game.id, this)}>Remove Game</button>
              </ul>
              <img className='thumb-nail-img' src={game.imageUrl} alt={`image for ${game.title}`} />
            </Link>
          </li>
        )
      })
      return list
    } else {
      return <li className='game-box'>Your rack is empty!</li>
    }
  }

  render() {
    const { gameRackGames, count } = this.props
    if (!gameRackGames) {
      return null
    }
    return (
      <ul className='game-rack col-2-3' >
        <h3>Your Rack has {count} games</h3>
        <h2><Link className='add-more' to='/index'>add more!</Link></h2>
        {this.rackList(gameRackGames)}
      </ul>
    )
  }
}

const mdp = dispatch => ({
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId)),
})

export default connect(null, mdp)(UserGameRack)

