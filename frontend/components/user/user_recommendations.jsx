import React from 'react'
import { Link } from 'react-router-dom'
import { categoryFilter, genreFilter, randomElement } from '../../util/helper_functions'

class UserRecommendations extends React.Component {

  recommendByGenre() {
    const { gameRackGames, selectedGenre, gamesArray } = this.props
    if (Object.keys(gameRackGames).length && selectedGenre) {
      let genreArray = []
      genreArray.push(selectedGenre)
      let filtered = genreFilter(gamesArray, genreArray)
      return this.selectSample(filtered)
    } else {
      return <li><Link to='/index'>Add games to your rack for recommendations!</Link></li>
    }
  }

  recommendByCategory() {
    const { gameRackGames, selectedCategory, gamesArray } = this.props
    if (Object.keys(gameRackGames).length && selectedCategory) {
      let categoryArray = []
      categoryArray.push(selectedCategory)
      // debugger
      let filtered = categoryFilter(gamesArray, categoryArray)
      return this.selectSample(filtered)
    } else {
      return <li><Link to='/index'>Add games to your rack for recommendations!</Link></li>
    }
  }

  selectSample(filtered) {
    let selection = []
    for (let i = 0; i < 3; i++) {
      let selected = randomElement(filtered)
      selection.push(selected)
    }
    const list = selection.map((selected, idx) => {
      if (selected) {
        return (<li key={`recommended-${idx}`}>
          <Link key={`recommended-${idx}-link`}
            to={`/games/show/${selected.id}`}>
            <span>{selected.title}</span>
            <img src={selected.imageUrl} alt={`image for ${selected.title}`} />
          </Link></li>)
        }
      })
    return list
  }

  render() {
    const { selectedGame1, selectedGame2, selectedGenre, selectedCategory } = this.props
    if (!selectedGame1) {
      return null
    }
    return (
      <ul className='recommended '>
        <h3>More {selectedGenre} games like {selectedGame1.title}</h3>
        {this.recommendByGenre()}
        <h3>More {selectedCategory} games like {selectedGame2.title}</h3>
        {this.recommendByCategory()}
      </ul> 
    )
  }
}

export default UserRecommendations