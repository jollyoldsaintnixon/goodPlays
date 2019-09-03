import React from 'react'
import { update, stringFilter } from '../../util/helper_functions'
import { connect } from 'react-redux'
import { receiveUiErrors, clearUiErrors } from '../../actions/ui_actions'
import { receiveUiGames } from '../../actions/ui_actions'
import { withRouter, NavLink, Route } from 'react-router-dom'
import AdvancedSearch from './advanced-search'
import { openModal } from '../../actions/modal_actions'
import { NavSearchList } from './nav-search-list';

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {searchString: ''}
    this.dropDownSelect = this.dropDownSelect.bind(this)
    this.enterSearch = this.enterSearch.bind(this)
  }

  search() {
    return (e) => {
      e.preventDefault()
      //  

      const list = this.gameList()
      if (this.state.searchString === '' || !list.length) {
        this.props.receiveUiErrors()
      } else {
        this.props.clearUiErrors()
      }
      this.props.receiveUiGames(list)
      this.setState({searchString: ''})
      this.props.history.push(`/index`)
    }
  }

  enterSearch(e) {
    let list
    switch (e.key) {
      case 'Enter':
        e.preventDefault()
        list = this.gameList()
        if (this.state.searchString === '' || !list.length) {
          this.props.receiveUiErrors()
        } else {
          this.props.clearUiErrors()
        }
        this.props.receiveUiGames(list)
        this.setState({ searchString: '' })
        this.props.history.push(`/index`)
        break;
      case "ArrowDown":
        
        break;
      case "ArrowUp":

        break;
      default:
        break;
    }
    // if (e.key === 'Enter') {
    //   e.preventDefault()
    //   const list = this.gameList()
    //   this.props.receiveUiGames(list)
    //   this.setState({ searchString: '' })
    //   this.props.history.push(`/index`)
    // }
  }

  gameList() {
    // destructure
    const { games } = this.props
    const { searchString } = this.state
    // initialize
    let list = []
    
    if (searchString === '') {
      console.log('empty search string')
      return games
    }
    console.log('search string not empty')
    list = stringFilter(games, searchString)
    
    return list
  }

  dropDownSelect(e) {
    //  
    e.preventDefault()
    // this.setState({searchString: e.target.textContent})
    // this.setState({searchString: ''})
    this.setState({ searchString: '' })
      // .then(this.props.receiveUiGames(this.gameList()))
    this.props.receiveUiGames(this.props.games)
    this.props.history.push(`/games/show/${e.currentTarget.id}`)
  }

  advancedSearch() {
    return (e) => {
      this.props.openModal('advanced_search')
    }
  }

  render() {
    const gameList = this.gameList().map(game => {
      return (
      <li key={`search-item-${game.id}`} 
        id={game.id} 
        onClick={this.dropDownSelect.bind(this)}>
            <img src={game.imageUrl} alt=""/>
            <p>{game.title.length > 45 ? game.title.slice(0, 42).concat('...') : game.title}</p>
      </li>
      )
    })

    // if (this.props.history.location.pathname === '/advanced-search') {
    //   this.props.openModal('advanced_search')
    // }      

    return (
      <div className='search'>
        <input
          type="text"
          className='search-bar'
          onChange={update('searchString', this)}
          placeholder='Search...'
          value={this.state.searchString}
          onKeyDown={this.enterSearch}
          />
        <button onClick={this.search()}>
          <img  className="icon-magnifying-glass" src={window.search}/>
          </button>
        <NavLink to='/index/advanced-search' onClick={this.advancedSearch()}>Advanced </NavLink>
        <ul className={`search-list ${
          this.state.searchString === "" ? 'none' : '' }`} >
          {/* {gameList.slice(0, 4)} */}
          {gameList}
          {/* <NavSearchList gameList={this.gameList()} /> */}
        </ul>
        <Route path='/index/advanced-search' render={props => <AdvancedSearch {...props} 
          games={this.props.games} 
          openModal={this.props.openModal}
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
  openModal: modal => dispatch(openModal(modal)),
  receiveUiErrors: () => dispatch(receiveUiErrors()),
  clearUiErrors: () => dispatch(clearUiErrors()),
})

export default withRouter(connect(msp, mdp)(NavSearch))