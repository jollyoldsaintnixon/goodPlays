import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { Link } from 'react-router-dom'
import { ulFromArray, randomElement } from '../../util/helper_functions'
import UserRecommendations from './user_recommendations'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: null,
    }

    this.gameRackGames = this.gameRackGames.bind(this)
    this.rackList = this.rackList.bind(this)
  }

  rackList(gameRackGames) {
    const { user } = this.props
    if (gameRackGames) {
      const list = gameRackGames.map((game) => {
        return (
            <li className='game-box'
              key={`user-${user.id}-game-${game.id}`}>
              <ul className='game-rack-info'>
                <Link to={`/index/games/show/${game.id}`}>{game.title}</Link>
                <li>Price: ${game.price}</li>
                  {ulFromArray(game.genres, 'game-genres')}
                  {ulFromArray(game.categories, 'game-categories')}
              </ul>
              <img className='thumb-nail-img' src={game.imageUrl} alt={`image for ${game.title}`} />
            </li>
          )
      })
      return list
    } else {
      return <li className='game-box'>Your rack is empty!</li>
    }
  }

  gameRackGames() {
    const { user, games } = this.props
    let gameRackGames
    if (Object.keys(games).length) {
      gameRackGames = user.game_ids.map(game_id => {
        return this.props.games[game_id]
      })
    } 
    debugger
    return gameRackGames 
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { user } = this.props
    const gamesArray = Object.values(this.props.games)
    const gameRackGames = this.gameRackGames()
    let selectedGame1, selectedGame2, selectedGenre, selectedCategory
    if (gameRackGames) {  // will be undefined before component mounts
      debugger
      selectedGame1 = randomElement(gameRackGames)
      selectedGame2 = randomElement(gameRackGames)
      selectedGenre = randomElement(selectedGame1.genres) || 'indie'
      selectedCategory = randomElement(selectedGame2.categories) || 'single-player'
    }
    return (
      <section className='profile-container'>
        <h1>Whatup, {user.username}</h1>
        <section className='user-profile'>
          <ul className='game-rack col-2-3' >
            <h3>Your Rack has {user.game_ids.length} games</h3>
            <h2><Link to='/index'>add more!</Link></h2>
            {this.rackList(gameRackGames)}
          </ul>
          <UserRecommendations
            gamesArray={gamesArray} 
            gameRackGames={gameRackGames} 
            selectedGame1={selectedGame1} 
            selectedGame2={selectedGame2} 
            selectedGenre={selectedGenre}
            selectedCategory={selectedCategory}/>
        </section>
      </section>

    )
  }
}

const msp = (state) => ({
  games: state.entities.games,
  user: state.entities.users[state.session.id]
});

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
})

export default connect(msp, mdp)(UserProfile)