import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchGame } from '../../actions/games_actions'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'

const msp = (state, ownProps) => {
  let user = state.entities.users[state.session.id]
  let game_ids = user ? user.game_ids : null
  debugger
  return {
    game: state.entities.games[ownProps.match.params.gameId],
    user,
    game_ids,
  }
}

const mdp = dispatch => ({
  fetchGame: id => dispatch(fetchGame(id)),
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId))
})

class GameShow extends React.Component {
  constructor(props) {
    super(props)
  }

  displayButtons() {
    if (this.props.user) {
      let buttonText = 'Add to Rack'
      let buttonSubmit = this.addGame.bind(this)
      const gameId = parseInt(this.props.match.params.gameId)
  
      if (this.props.game_ids.includes(gameId)) {
        buttonText = 'Remove from Rack'
        buttonSubmit = this.removeGame.bind(this)
      }
      return (
        <>
          <button className='button' onClick={buttonSubmit}>{buttonText}</button>
          <button className='button' ><Link to='/profile' >My Rack</Link></button>
        </>
      )
    } else {
      return null
    }
  }
  

  addGame(e) {
    e.preventDefault()
    this.props.addGameToUser(this.props.match.params.gameId)
  }

  removeGame(e) {
    e.preventDefault()
    this.props.deleteGameFromUser(this.props.match.params.gameId)
  }


  componentDidMount() {
    fetchGame(this.props.match.params.gameId)
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.id != this.props.match.params.imageId) {
      fetchGame(this.props.match.params.gameId)
    }
  }

  render () {
    debugger
    let { game } = this.props
    if (game === undefined) {
      game = { title: '', release_date: '', description: '', imageUrl: '', image_url: '', genres: [], categories: [] }
    }
    // debugger
    return (
      <ul className='game-show col-2-3'>
          <li>{game.id}</li>
          <li><img src={game.imageUrl} alt={`${game.title} image`} /></li> {/* this is supposed to connect to AWS */} 
          <li className='game-title'>{game.title}</li>
          <li className='game-release-date'>Released {game.release_date}</li>
          <li className='game-description'>{game.description}</li>
          <li className='game-genres'>Genres: {game.genres.join(', ')}</li>
          <li className='game-categories'>categories: {game.categories.join(', ')}</li>
          {this.displayButtons()}
        </ul>
    )
  }
}

export default connect(msp, mdp)(GameShow)