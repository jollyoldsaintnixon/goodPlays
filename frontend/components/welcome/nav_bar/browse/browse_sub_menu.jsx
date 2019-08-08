import React from 'react' 
import { connect } from 'react-redux'
import { receiveUiGames } from '../../../../actions/ui_actions'
import { genreFilter, categoryFilter } from '../../../../util/helper_functions'

const msp = ({ entities: { games }}) => ({
  games: Object.values(games)
})

const mdp = dispatch => ({
  receiveUiGames: games => dispatch(receiveUiGames(games)),
})

function BrowseSubMenu({ type, sections, receiveUiGames, games }) {

  const list = sections.map((section, idx) => {
    const sectionArray = []
    sectionArray.push(section)
    return <li key={`browse-sub-menu-${idx}`}
              onClick={type === 'genre' ? 
                 () => receiveUiGames(genreFilter(games, sectionArray)) :
                 () => receiveUiGames(categoryFilter(games, sectionArray))
              }
              >{section}</li>
  })

  return (
    <ul className='browse-sub-menu'>
      {list}
    </ul>
  )
}

export default connect(msp, mdp)(BrowseSubMenu)