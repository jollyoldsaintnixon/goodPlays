import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { categoryFilter, genreFilter, randomElement } from '../../util/helper_functions'
import { addGameToUser } from '../../actions/session_actions'
import { addGame } from '../../util/game_show_helper'

class UserRecommendations extends React.Component {

  recommendByGenre() {
    const { gameRackGames, selectedGenre, gamesArray } = this.props
    if (Object.keys(gameRackGames).length && selectedGenre) {
      let genreArray = []
      genreArray.push(selectedGenre)
      let filtered = genreFilter(gamesArray, genreArray)
      let list = this.selectSample(filtered)
      return list.length ? list : null
    } else {
      return <li><Link to='/index'>Add games to your rack for recommendations!</Link></li>
    }
  }

  recommendByCategory() {
    const { gameRackGames, selectedCategory, gamesArray } = this.props
    if (Object.keys(gameRackGames).length && selectedCategory) {
      let categoryArray = []
      categoryArray.push(selectedCategory)
      //  
      let filtered = categoryFilter(gamesArray, categoryArray)
      return this.selectSample(filtered)
    } else {
      return <li><Link to='/index'>Add games to your rack for recommendations!</Link></li>
    }
  }

  selectSample(filtered) { 
     
    const ids = this.props.gameRackGames.map(game => {
      return game.id
    })
    let selection = []
    let i = 0
    filtered = _.shuffle(filtered)
    while (i < 3 && filtered.length > 0) {
      let selected = filtered.pop()
      if (ids.includes(selected.id)) {
        continue
      }
      selection.push(selected)
      i++
    }
    const list = selection.map((selected, idx) => {
      if (selected) {
        return (
        <li key={`recommended-${idx}`}>
          <Link key={`recommended-${idx}-link`}
            to={`/games/show/${selected.id}`}>
            <div>
              <section>
                <h5>{selected.title}</h5>
                <span></span>
                <p>Price: ${selected.price}</p>
              </section>
              <button onClick={addGame(selected.id, this)}>Add Game</button>
            </div>
            <img src={selected.imageUrl} alt={`image for ${selected.title}`} />
          </Link>
          </li>)
        }
      })
    return list
  }

  render() {
    const { selectedGame1, selectedGame2, selectedGenre, selectedCategory } = this.props
    if (!selectedGame1) {
      return null
    }
    const genres = this.recommendByGenre()
    const categories = this.recommendByCategory()
    const genreContent = genres ? 
      <h3>More {selectedGenre} games like {selectedGame1.title}</h3> :
      <h3></h3>
    const categoryContent = categories ?
      <h3>More {selectedCategory} games like {selectedGame2.title}</h3> :
      <h3></h3>
    return (
      <ul className='recommended '>
        {genreContent}
        {genres}
        {categoryContent}
        {categories}
      </ul> 
    )
  }
}

const mdp = dispatch => ({
  addGameToUser: gameId => dispatch(addGameToUser(gameId)),
})

export default connect(null, mdp)(UserRecommendations)