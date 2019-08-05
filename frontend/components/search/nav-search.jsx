import React from 'react'
import { update, stringFilter } from '../../util/helper_functions'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../actions/ui_actions'
import { withRouter, NavLink, Route } from 'react-router-dom'
import AdvancedSearch from './advanced-search'
import { openModal } from '../../actions/modal_actions'

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
      this.setState({searchString: ''})
    }
  }

  gameList() {
    // destructure
    const { games } = this.props
    const { searchString } = this.state
    // initialize
    let list = []
    debugger
    if (searchString === '') {
      return games
    }

    list = stringFilter(games, searchString)
    
    return list
  }

  dropDownSelect(e) {
    debugger
    this.setState({searchString: e.target.textContent})
    // this.setState({searchString: ''})
    debugger
    this.props.receiveUiGames(this.gameList())
    this.props.history.push(`/games/show/${e.target.id}`)
  }

  advancedSearch() {
    return (e) => {
      this.props.openModal('advanced_search')
    }
  }

  render() {
    const gameList = this.gameList().map(game => {
      return <li key={`search-item-${game.id}`} id={game.id} onClick={this.dropDownSelect.bind(this)}>
      {game.title}</li>
    })

    if (this.props.history.location.pathname === '/advanced-search') {
      this.props.openModal('advanced_search')
    }      

    return (
      <div className='search'>
        <input
          className='search-bar' 
          type="text"
          onChange={update('searchString', this)}
          placeholder='Search...'
          value={this.state.searchString}
          />
        <button onClick={this.search()}>***</button>
        <NavLink to='/advanced-search' onClick={this.advancedSearch()}>Advanced Search </NavLink>
        <ul className={`search-list ${
          this.state.searchString === "" ? 'none' : '' }`} >
          {gameList.slice(0, 4)}
        </ul>
        <Route path='/advanced-search' render={props => <AdvancedSearch {...props} 
          games={this.props.games} 
          searchVal={this.state.searchString}/>} 
            />
        {/* <Route path='/advanced-search' render={props => <AdvancedSearch {...props} searchVal={'hello'}/>} /> */}
      </div>
    )
  }
}

const msp = state => ({
  games: Object.values(state.entities.games)
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  openModal: modal => dispatch(openModal(modal))
})

export default withRouter(connect(msp, mdp)(NavSearch))