import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class GameIndexItem extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { uiGamesIds, game } = this.props
    // debugger
    const display = (!uiGamesIds.length || uiGamesIds.includes(game.id)) ? 'inherit' : 'none'
    return (
      <li className={`game-index-item ${display}`} >
          <Link to={`/games/show/${game.id}`} >
            <img src={game.imageUrl} alt={game.title}/>
          </Link>
      </li>
    )
  }
}

const msp = ({ui: {games}}) => {
  return ({
    uiGamesIds: games,
  })
}

export default connect(msp)(GameIndexItem)