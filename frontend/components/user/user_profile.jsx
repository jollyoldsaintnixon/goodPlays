import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { Link } from 'react-router-dom'
import { categoryFilter, genreFilter } from '../../util/helper_functions'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: null,
    }

    this.gameRackGames = this.gameRackGames.bind(this)
    this.recommendByGenre = this.recommendByGenre.bind(this)
    this.getGenres = this.getGenres.bind(this)
  }


  recommendByGenre() {
    const { games } = this.props
    if (Object.keys(games).length) {
      let gameGenres = this.getGenres()
      if (gameGenres.length) {
        let genre = []
        genre.push(gameGenres[Math.floor(Math.random() * gameGenres.length)]) 
        let filtered = genreFilter(Object.values(games), genre)
        return this.selectSample(filtered)
      } else {
        return <li><Link to='/index'>Add games to your rack for recommendations!</Link></li>
      }
    }
  }

  selectSample(filtered) {
    let selection = []
    for (let i = 0; i < 3; i++) {
      let selected = filtered[Math.floor(Math.random() * filtered.length)]
      selection.push(selected)
    }
    const list = selection.map((selected, idx) => {
      return (<li>
                <Link key={`recommended-${idx}`} 
                to={`/index/games/show/${selected.id}`}>
                  <span>{selected.title}</span>
                  <img src={selected.imageUrl} alt={`image for ${selected.title}`}/>
                </Link></li>)
    })
    return list
  }

  getGenres() {
    let gameGenres = []
    const { user, games } = this.props

    if (Object.keys(games).length) {
      user.game_ids.forEach(game_id => {
        const game = this.props.games[game_id]
        game.genres.forEach(genre => {
          gameGenres.push(genre)
        })
      })
    }
    return gameGenres
  }

  splitArray(array, className) {
    const split = array.map((ele, idx)=> {
      return (
        <li key={`${className}-${idx}`}>{ele}</li>
      )
    })
    return <ul className={className}>{split}</ul>
  }

  gameRackGames() {
    const { user, games } = this.props
    let gameRackGames
    if (Object.keys(games).length) {
      gameRackGames = user.game_ids.map(game_id => {

        const game = this.props.games[game_id]
        return (
          <li className='game-box'
            key={`user-${user.id}-game-${game_id}`}
          // onMouseOver={this.displayImg(game)}
          // onMouseLeave={this.hideImg}
          >
            <ul className='game-rack-info'>
              <Link to={`/index/games/show/${game.id}`}>{game.title}</Link>
              <li>Price: ${game.price}</li>
                {this.splitArray(game.genres, 'game-genres')}
                {this.splitArray(game.categories, 'game-categories')}
            </ul>
            <img className='thumb-nail-img' src={game.imageUrl} alt={`image for ${game.title}`} />
          </li>
        )
      })
    } 
    return gameRackGames 
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { user } = this.props
    // debugger
    
    return (
      <section className='profile-container'>
        <h1>Whatup, {user.username}</h1>
        <section className='user-profile'>
          <ul className='game-rack col-2-3' >
            <h3>Your Rack has {user.game_ids.length} games</h3>
            <h2><Link to='/index'>add more!</Link></h2>
            {this.gameRackGames()}
          </ul>
          <ul className='recommended col-1-3'>
            <h3>Here are some {this.state.genre} games you may like</h3>
            {this.recommendByGenre()}
          </ul> 
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