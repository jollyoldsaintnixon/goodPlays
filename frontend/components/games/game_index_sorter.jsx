import React from 'react'
import { connect } from 'react-redux'
import { receiveUiGames, clearUiErrors } from '../../actions/ui_actions'
import { idsToObjects } from '../../util/helper_functions'
import Footer from '../footer/footer'

const msp = ({ errors: { ui }}) => ({
  errors: ui,
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  clearUiErrors: () => dispatch(clearUiErrors()),
})

class GameIndexSorter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      errors: null,
      // price_display: 'none',
      // rating_display: 'none',
    }
  }

  sortBy(type) {

    return (e) => {
      e.preventDefault()
      const { allGames, uiGamesIds } = this.props
      const matched = uiGamesIds.length ? idsToObjects(uiGamesIds, allGames) : Object.values(allGames)
      let sorted = []
      
      switch (type) {
        case 'title':
          sorted = matched.sort((el1, el2) => {
            if (el1.title < el2.title) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'release_date':
          sorted = matched.sort((el1, el2) => {
            if (el1.release_date < el2.release_date) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'price-low':
          sorted = matched.sort((el1, el2) => {
            if (el1.price < el2.price) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'price-high':
          sorted = matched.sort((el1, el2) => {
            if (el1.price >= el2.price) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'rating-high': 
          sorted = matched.sort((el1, el2) => {
            // if (el1.title === 'Multiwinia' || el2.title === 'Multiwinia') {
            //   debugger
            // }
            if (!el1.rating) {
              return 1
            } else if (!el2.rating || el1.rating > el2.rating) {
              return -1
            } else {
              return 0
            }
          })
          break
        case 'rating-low': 
          sorted = matched.sort((el1, el2) => {
            if (!el1.rating) { // still returns unrated last
              return 1
            } else if (!el2.rating || el1.rating <= el2.rating) {
              return -1
            } else {
              return 0
            }
          })
          break
        default:
          sorted = matched
  
        }
      this.props.receiveUiGames(sorted)
    }
  }

  componentWillUnmount() {
    this.props.clearUiErrors()
  }

  highLowSearch(type) {
    const by_high = type.concat('-high')
    const by_low = type.concat('-low')
    return (
      <ul className='none high-low-search' id={type}>
        <li onClick={this.sortBy(by_high)}>High to Low</li>
        <li onClick={this.sortBy(by_low)}>Low to High</li>
      </ul>
    )
  }

  toggle(display) {
    return e => {
      debugger
      const cash_list = $(`#${display}`)
      cash_list.toggleClass('none')
    }
  }

  render() {
    //  debugger
    const { price_display, rating_display } = this.state
    return (
      <form className='game-index-sorter sticky'>
        <h4>{this.props.errors}</h4>
        {this.props.content}
        <h3></h3>
        <button onClick={this.sortBy('title')}><span>Sort by title</span></button>
        <button onClick={this.sortBy('release_date')}><span>Sort by release date</span></button>
        <button onClick={this.toggle('price')}><span>Sort by price
            <p className="iconify" data-icon="ic:baseline-arrow-drop-down" data-inline="false"></p>
            </span>
            {this.highLowSearch('price')}</button>
            {/* {this.highLowSearch(price_display, 'price')} */}
            
        <button onClick={this.toggle('rating')}><span>Sort by rating
            <p className="iconify" data-icon="ic:baseline-arrow-drop-down" data-inline="false"></p>
            </span>
            {this.highLowSearch('rating')}</button>
            {/* {this.highLowSearch(rating_display, 'rating')} */}
            
        <h3></h3>
        <Footer />
      </form>
    )
  }
}

export default connect(msp, mdp)(GameIndexSorter)