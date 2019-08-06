import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    debugger
    this.state = {
      imageUrl: null,
      display: 'none'
    }
    this.displayImg = this.displayImg.bind(this)
    this.hideImg = this.hideImg.bind(this)
  }

  displayImg(game) {
    return e => {
      e.preventDefault()
      this.setState({
        imageUrl: game.imageUrl,
        display: 'inherit'
      })
    }
  }

  hideImg() {
    this.setState({display: 'none'})
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { user, games } = this.props
    
    let gameRackGames
    if (Object.keys(games).length) {
      gameRackGames = user.game_ids.map(game_id => {
          
          const game = this.props.games[game_id]
          return (
            <li 
              key={`user-${user.id}-game-${game_id}`}
              onMouseOver={this.displayImg(game)}
              onMouseLeave={this.hideImg}>
              <Link to={`/games/show/${game.id}`}>{game.title}</Link>
              </li>
            ) 
        }) 
      }  
    return (
      <section className='col-2-3 user-profile'>
        <h1>Whatup, {user.username}</h1>
        <h3>Your Rack has {user.game_ids.length} games:</h3>
        <div className='game-rack'>
          <ul >
            {gameRackGames}
          </ul>
          <img className={this.state.display} src={this.state.imageUrl} alt=""/>
        </div>
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