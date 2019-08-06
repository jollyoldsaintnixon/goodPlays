import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { Link } from 'react-router-dom'
import { categoryFilter, genreFilter } from '../../util/helper_functions'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: window.banner,
      // display: 'none'
    }
    // this.displayImg = this.displayImg.bind(this)
    // this.hideImg = this.hideImg.bind(this)
    this.gameRackGames = this.gameRackGames.bind(this)
    this.recommendByGenre = this.recommendByGenre.bind(this)
    this.getGenres = this.getGenres.bind(this)
  }

  // displayImg(game) {
  //   return e => {
  //     e.preventDefault()
  //     this.setState({
  //       imageUrl: game.imageUrl,
  //       // display: 'inherit'
  //     })
  //   }
  // }

  // hideImg() {
  //   // this.setState({display: 'none'})
  //   this.setState({imageUrl: window.banner})
  // }

  recommendByGenre() {
    const { games } = this.props
    if (Object.keys(games).length) {
      let gameGenres = this.getGenres()
      let genre = []
      genre.push(gameGenres[Math.floor(Math.random() * gameGenres.length)]) 
      let filtered = genreFilter(Object.values(games), genre)
      
      return <ul>{this.selectSample(filtered)}</ul>
    }
  }

  selectSample(filtered) {
    let selection = []
    for (let i = 0; i < 3; i++) {
      let selected = filtered[Math.floor(Math.random() * filtered.length)]
      selection.push(selected)
    }
    const list = selection.map((selected, idx) => {
      return (<Link key={`recommended-${idx}`} 
              to={`/index/games/show/${selection.id}`}
              >
              {selected.title}</Link>)
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
      <section className='col-2-3 user-profile'>
        <h1>Whatup, {user.username}</h1>
        <h3>Your Rack has {user.game_ids.length} games:</h3>
        <h2><Link to='/index'>add more!</Link></h2>
        <ul className='game-rack'>
          {this.gameRackGames()}
        </ul>
          {/* <img className={this.state.display} src={this.state.imageUrl} alt=""/> */}
        {this.recommendByGenre()}
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