import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
// import { Link } from 'react-router-dom'
import { randomElement } from '../../util/helper_functions'
import UserRecommendations from './user_recommendations'
import UserGameRack from './user_game_rack'
import UserGameCommentsContainer from '../comments/user_game_comments_container'
import UserAnchorLinks from './user_anchor_links'

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
      // <section className='overprofile-container'>
        <section className='profile-container'>
          <UserAnchorLinks />
          <h1>Hello, {user.username}</h1>
          {/* <Link to='/profile#game-rack' className='link-game-comments'>My Games</Link>
          <Link to='/profile#user-game-comments' className='link-game-comments'>My Comments</Link> */}
          <section className='user-profile'>
            {/* <a className='jump-link' id='game-rack'></a> */}
            <UserGameRack 
              gameRackGames={gameRackGames} 
              count={user.game_ids.length}
              user={user}/>
            <UserRecommendations
              gamesArray={gamesArray} 
              gameRackGames={gameRackGames} 
              selectedGame1={selectedGame1} 
              selectedGame2={selectedGame2} 
              selectedGenre={selectedGenre}
              selectedCategory={selectedCategory}/>
          </section>
          {/* <section className='user-comments'>
            <a id='user-game-comments'></a>
            <UserGameCommentsContainer user={user}/>
          </section> */}
        </section>
      // </section>
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