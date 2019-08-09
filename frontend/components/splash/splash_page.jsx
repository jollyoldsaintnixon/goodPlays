import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { receiveUiGames } from '../../actions/ui_actions'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'
import { Link, withRouter } from 'react-router-dom'
import { randomElement, genreFilter, categoryFilter } from '../../util/helper_functions'

class SplashPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  handleClick(game) {
    return e => {
      this.props.history.push(`/games/show/${game.id}`)
    }
  }

  addGame(gameId) {
    return e => {
      e.preventDefault()
      this.props.addGameToUser(gameId)
      // this.props.history.push(`/games/show/${gameId}`)
    }
  }

  removeGame(gameId) {
    return e => {
      e.preventDefault()
      this.props.deleteGameFromUser(gameId)
      // this.props.history.push(`/games/show/${gameId}`)
    }
  }

  displayButtons(gameId) {
    if (this.props.user) {
      let buttonText = 'Add to Rack'
      let buttonSubmit = this.addGame(gameId).bind(this)

      if (this.props.game_ids.includes(gameId)) {
        buttonText = 'Remove from Rack'
        buttonSubmit = this.removeGame(gameId).bind(this)
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

  displayGame() {
    debugger
    const { games } = this.props
    if (games.length) {
      const game = randomElement(games)
      return (
        <>
          <ul className='game-show col-2-3' >
            <li><img src={game.imageUrl} alt={`${game.title} image`} /></li> {/* this is supposed to connect to AWS */}
            <li className='game-title'>{game.title}</li>
            <li className='game-release-date'>Released {game.release_date}</li>
            <li className='game-description'>{game.description}</li>
            <li className='game-genres links'>{this.genreLinks(game)}</li>
            <li className='game-categories links'>{this.categoryLinks(game)}</li>
            <div className='button-container'>
              {this.displayButtons(game.id)}
            </div>
          </ul>
        </>
      )
    } else {
      return null
    }
  }

  genreLinks(game) {
    debugger
    const { games } = this.props
    if (game.genres.length) {
      let list = game.genres.map((genre, idx) => {
        let genreArray = []
        genreArray.push(genre)
        return <Link
          to='/index'
          key={`${game}-${genre}-${idx}`}
          onClick={this.typeSearch(genreFilter(games, genreArray))}>
          {genre}</Link>
      })
      list.unshift('Genres: ')
      return list
    } else {
      return null
    }
  }

  typeSearch(filtered) {
    return (e) => {
      this.props.receiveUiGames(filtered)
    }
  }

  categoryLinks(game) {
    const { games } = this.props

    if (game.categories.length) {
      let list = game.categories.map((category, idx) => {
        let categoryArray = []
        categoryArray.push(category)
        return <Link
          to='/index'
          key={`${game}-${category}-${idx}`}
          onClick={this.typeSearch(categoryFilter(games, categoryArray))}>
          {category}</Link>
      })
      list.unshift('Catagories: ')
      return list
    } else {
      return null
    }
  }

  render() {
    return (
    <section className='splash-page'>
        <h1>Welcome to goodPlays</h1>
        <h2>Help yourself to some tendies while the dew carbonates</h2>
        <h2>This render's featured game:</h2>
        {this.displayGame()}
    </section>
    )
  }
}

const msp = (state) => {
  let user = state.entities.users[state.session.id]
  let game_ids = user ? user.game_ids : null
  return ({
    games: Object.values(state.entities.games),
    user,
    game_ids
  })
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
  deleteGameFromUser: gameId => dispatch(deleteGameFromUser(gameId)),
  receiveUiGames: games => dispatch(receiveUiGames(games)),
})

export default withRouter(connect(msp, mdp)(SplashPage))

