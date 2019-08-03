import React from 'react'
import { update } from '../../../util/helper_functions'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../../actions/ui_actions'
import { withRouter } from 'react-router-dom'

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchString: ''}
    this.dropDownSelect = this.dropDownSelect.bind(this)
  }

  search() {
    return (e) => {
      e.preventDefault()
      this.props.receiveUiGames(this.gameList())
    }
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
    debugger
    // const title = e.target.innerText
    // this.setState({searchString: title})
    this.setState({searchString: ''})
    this.props.history.push(`/games/show/${e.target.id}`)
  }

  render() {
    const gameList = this.gameList().map(game => {
      return <li key={`search-item-${game.id}`} id={game.id} onClick={this.dropDownSelect}>
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
        <button onClick={this.search(gameList)}>Search</button>
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
  receiveUiGames: games => dispatch(receiveUiGames(games))
})

export default withRouter(connect(msp, mdp)(NavSearch))