import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'

class SplashPage extends React.Component {

  componentDidMount() {
    this.props.fetchGames()
  }

  handleClick(game) {
    return e => {
      this.props.history.push(`/index/games/show/${game.id}`)
    }
  }

  displayGame() {
    const { games } = this.prop
    debugger
    if (games.length) {
      const game = games[Math.floor(Math.random() * games.length)]
      return (
        <ul className='game-show' onClick={this.handleClick(game).bind(this)}>
          <li><img src={game.imageUrl} alt={`${game.title} image`} /></li> {/* this is supposed to connect to AWS */}
          <li className='game-title'>{game.title}</li>
          <li className='game-release-date'>Released {game.release_date}</li>
          <li className='game-description'>{game.description}</li>
          <li className='game-genres'>Genres: {game.genres.join(', ')}</li>
          <li className='game-categories'>categories: {game.categories.join(', ')}</li>
        </ul>
      )
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
  return ({
    games: Object.values(state.entities.games),
    user: state.entities.users[state.session.id]
  })
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
})

export default connect(msp, mdp)(SplashPage)

