import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
// import { Link } from 'react-router-dom'
import { randomElement } from '../../util/helper_functions'
import UserRecommendations from './user_recommendations'
import UserGameRack from './user_game_rack'
import UserGameCommentsContainer from '../comments/user_game_comments_container'
import UserAnchorLinks from './user_anchor_links'
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

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
    window.scrollTo(0, 0)
    this.props.fetchGames()
  }

  render() {
    const { user, games, count } = this.props
    const gamesArray = Object.values(games)
    const gameRackGames = this.gameRackGames()
    let selectedGame1, selectedGame2, selectedGenre, selectedCategory
    if (gameRackGames && gameRackGames.length) {  // will be undefined before component mounts
      selectedGame1 = randomElement(gameRackGames)
      selectedGame2 = randomElement(gameRackGames)
      if (selectedGame1) {
        selectedGenre = randomElement(selectedGame1.genres) || 'indie'
      } 
      if (selectedGame2) {
        selectedCategory = randomElement(selectedGame2.categories) || 'single-player'
      }
    }

    if (gamesArray.length < 400) {
    // if (gamesArray.length < count) {
      return <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={80}
        color={'purple'}
        border={'5px solid purple'}
      />
    }
    return (
      // <section className='overprofile-container'>
      <>
        {/* <section className='user-link-container'> */}
        {/* </section> */}
        <div className='space-filler'><span>Hello, {user.username}</span></div>
        <section className='profile-container'>
          <UserAnchorLinks />
            {/* <h1>Hello, {user.username}</h1> */}
          <section className='except-user-anchor'>
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
          </section>
        </section>
    </>
    )
  }
}

const msp = (state) => ({
  games: state.entities.games,
  user: state.entities.users[state.session.id],
  count: state.entities.count
});

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames()),
})

export default connect(msp, mdp)(UserProfile)