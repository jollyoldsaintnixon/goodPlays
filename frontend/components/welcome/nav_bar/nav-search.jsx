import React from 'react'
import { update } from '../../../util/helper_functions'
import { connect } from 'react-redux'
import { receiveGames } from '../../../actions/games_actions'

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchString: ''}

  }

  gameList() {
    // destructure
    const { games } = this.props
    const { searchString } = this.state
    // initialize
    const list = []

    if (searchString === '') {
      return games
    }
    
    games.forEach(game => {
      if (game.title.toLowerCase().includes(searchString.toLowerCase())) {
        list.push(game)
      }
    })
    
    return list
  }

  dropDownSelect(e) {
    const title = e.target.innerText
    this.setState({searchString: title})
  }

  render() {
    const gameList = this.gameList().map(game => {
    const   
      return <li key={`search-item-${game.id}`} onClick={this.dropDownSelect}>
      {game.title}</li>
    })
    // debugger
    return (
      <div className='search'>
        <input
          className='search-bar' 
          type="text"
          onChange={update('searchString', this)}
          value={this.state.searchString}
          />
        <button onClick={}>Search</button>
        <ul className='search-list'>
          {gameList.slice(0, 2)}
        </ul>
      </div>
    )
  }
}

const msp = state => ({
  games: Object.values(state.entities.games)
})

const mdp = dispatch => ({
  receiveGames = games => dispatch(receiveGames(games))
})

export default connect(msp, mdp)(NavSearch)