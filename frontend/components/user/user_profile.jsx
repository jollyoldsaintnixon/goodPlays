import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { Link } from 'react-router-dom'
import { randomElement } from '../../util/helper_functions'
import UserRecommendations from './user_recommendations'
import UserGameRack from './user_game_rack'
import { addGameToUser, deleteGameFromUser } from '../../actions/session_actions'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)

    this.gameRackGames = this.gameRackGames.bind(this)
  }

  gameRackGames() {
    const { user, games } = this.props
    let gameRackGames
    if (Object.keys(games).length) {
      gameRackGames = user.game_ids.map(game_id => {
        return this.props.games[game_id]
      })
    } 
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
    if (gameRackGames && gameRackGames.length) {  // will be undefined before component mounts
      selectedGame1 = randomElement(gameRackGames)
      selectedGame2 = randomElement(gameRackGames)
      selectedGenre = randomElement(selectedGame1.genres) || 'indie'
      selectedCategory = randomElement(selectedGame2.categories) || 'single-player'
    }
    return (
      <section className='profile-container'>
        <h1>Whatup, {user.username}</h1>
        <section className='user-profile'>
          <UserGameRack 
            gameRackGames={gameRackGames} 
            count={user.game_ids.length}
            userId={user.id}/>
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
  fetchGames: () => dispatch(fetchGames()),
})

export default connect(msp, mdp)(UserProfile)