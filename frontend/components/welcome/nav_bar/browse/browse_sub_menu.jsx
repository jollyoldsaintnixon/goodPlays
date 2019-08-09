import React from 'react' 
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { receiveUiGames, clearUiErrors, receiveUiErrors } from '../../../../actions/ui_actions'
import { genreFilter, categoryFilter } from '../../../../util/helper_functions'

const msp = ({ entities: { games }}) => ({
  games: Object.values(games)
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
  receiveUiErrors: () => dispatch(receiveUiErrors()),
  clearUiErrors: () => dispatch(clearUiErrors()),
})

class BrowseSubMenu extends React.Component {
  constructor(props) {
    super(props)
  }

capitalizeFirstLetter(string) {  // taken from Stack Overflow, posted by user Steve Harrison
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  render() {
  const { type, sections, receiveUiGames, games } = this.props
    const list = sections.map((section, idx) => {
      const sectionArray = []
      sectionArray.push(section)
      return (<li key={`browse-sub-menu-${idx}`}
                    onClick={type === 'genre' ? 
                   () => {
                     const list = genreFilter(games, sectionArray)
                     list.length ? this.props.clearUiErrors() : this.props.receiveUiErrors()
                     receiveUiGames(list)
                     this.props.history.push('/index')
                    } :
                   () => {
                     const list = categoryFilter(games, sectionArray)
                     list.length ? this.props.clearUiErrors() : this.props.receiveUiErrors()
                     receiveUiGames(list)
                     this.props.history.push('/index')
                    }}>
                    {this.capitalizeFirstLetter(section)}
              </li>)
    })
    return (
      <ul className='browse-sub-menu' onMouseLeave={this.props.closeParent}>
        {list}
      </ul>
    )
  }
}

export default withRouter(connect(msp, mdp)(BrowseSubMenu))