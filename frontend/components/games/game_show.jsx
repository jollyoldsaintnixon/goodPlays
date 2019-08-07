import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../actions/ui_actions'
import { fetchGame, fetchGames } from '../../actions/games_actions'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'
import { genreFilter, categoryFilter } from '../../util/helper_functions'

const msp = (state, ownProps) => {
  let user = state.entities.users[state.session.id]
  let game_ids = user ? user.game_ids : null
  return {
    allGames: Object.values(state.entities.games),
    game: state.entities.games[ownProps.match.params.gameId],
    user,
    game_ids,
  }
}

const mdp = dispatch => ({
  fetchGame: id => dispatch(fetchGame(id)),
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId)),
  fetchGames: () => dispatch(fetchGames()),
  receiveUiGames: games => dispatch(receiveUiGames(games)),
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

  typeSearch(filtered) {
    return (e) => {
      this.props.receiveUiGames(filtered)
    }
  }

  genreLinks(game) {
    const { allGames } = this.props
    if (game.genres.length) {
      let list = game.genres.map((genre, idx) => {
        let genreArray = []
        genreArray.push(genre)
        return <Link
          to='/index'
          key={`${game}-${genre}-${idx}`}
          onClick={this.typeSearch(genreFilter(allGames, genreArray))}>
          {genre}</Link>
      })
      list.unshift('Genres: ')
      return list
    } else {
      return null
    }
  }

  categoryLinks(game) {
    const { allGames } = this.props
        
    if (game.categories.length) {
      let list = game.categories.map((category, idx) => {
        let categoryArray = []
        categoryArray.push(category)           
        return <Link
          to='/index'      
          key={`${game}-${category}-${idx}`}
          onClick={this.typeSearch(categoryFilter(allGames, categoryArray))}>
          {category}</Link>
      })
      list.unshift('Catagories: ')
      return list
    } else {
      return null
    }
  }


  componentDidMount() {
    debugger
    this.props.fetchGame(this.props.match.params.gameId)
    this.props.fetchGames()
  }

  componentDidUpdate(prevProps) {
    debugger
    if (prevProps.id != this.props.match.params.imageId) {
      this.props.fetchGame(this.props.match.params.gameId)
      this.props.fetchGames()
    }
  }

  render () {
    
    let { game } = this.props
    if (game === undefined) {
      game = { title: '', release_date: '', description: '', imageUrl: '', image_url: '', genres: [], categories: [] }
    }
    // debugger
    return (
      <ul className='game-show col-2-3'>
          <li><img src={game.imageUrl} alt={`${game.title} image`} /></li> {/* this is supposed to connect to AWS */} 
          <li className='game-title'>{game.title}</li>
          <li className='game-price'>${game.price}</li>
          <li className='game-release-date'>Released {game.release_date}</li>
          <li className='game-description'>{game.description}</li>
          <li className='game-genres links'>{this.genreLinks(game)}</li>
          <li className='game-categories links'>{this.categoryLinks(game)}</li>
          <div className='button-container'>
            {this.displayButtons()}
          </div>
        </ul>
    )
  }
}

export default withRouter(connect(msp, mdp)(GameShow))