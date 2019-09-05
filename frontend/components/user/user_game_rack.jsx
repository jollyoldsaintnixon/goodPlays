import React from 'react'
import { ulFromArray } from '../../util/helper_functions'
import { Link } from 'react-router-dom'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'
import { connect } from 'react-redux'
import { removeGame } from '../../util/game_show_helper'
import UserGameCommentsContainer from '../comments/user_game_comments_container'

class UserGameRack extends React.Component {
  constructor(props) {
    super(props)

    this.rackList = this.rackList.bind(this)
  }

  rackList(gameRackGames) {
    const { userId } = this.props.user.id
    // if (gameRackGames.length) {
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
    // } else {
    //   return <li className='game-box'>Your rack is empty!</li>
    // }
  }

  render() {
    const { gameRackGames, count } = this.props
    const lede = count ? // these next two ternaries render different text if the rack is empty
      (count === 1) ? `Your Rack has only ${count} game` : `Your Rack has ${count} games` : `Your Rack is empty`;
    const find_games = count ? 
      `more` : `your first one`;
    if (!gameRackGames) {
      return null
    }
    return (
      <ul className='game-rack col-2-3' >
        <h3>{lede}</h3>
        <a className='jump-link' id='game-rack'></a>
        <h2><Link className='add-more' to='/index'>click to find {find_games}!</Link></h2>
        {this.rackList(gameRackGames)}
        <a id='user-game-comments' className='profile-anchor-tag'></a> {/* anchor tag to jump to */}
        <UserGameCommentsContainer user={this.props.user}/>
      </ul>
    )
  }
}

const mdp = dispatch => ({
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId)),
})

export default connect(null, mdp)(UserGameRack)

