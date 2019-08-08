import React from 'react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { receiveUiGames } from '../../../../actions/ui_actions'
import { genreFilter, categoryFilter } from '../../../../util/helper_functions'

const msp = ({ entities: { games }}) => ({
  games: Object.values(games)
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
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
      return (<li key={`browse-sub-menu-${idx}`}>
                <Link to='/index'
                    onClick={type === 'genre' ? 
                   () => receiveUiGames(genreFilter(games, sectionArray)) :
                   () => receiveUiGames(categoryFilter(games, sectionArray))
                   
                }
                >{this.capitalizeFirstLetter(section)}</Link></li>)
    })
    return (
      <ul className='browse-sub-menu'>
        {list}
      </ul>
    )
  }
}

export default connect(msp, mdp)(BrowseSubMenu)