import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import GameIndexItemDisplay from './game-index-item-display'


class GameIndexItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {className: 'none'}
    this.swapClass = this.swapClass.bind(this)
  }

  swapClass(className) {
    return (e) => {
      e.preventDefault()
      this.setState({ className: className })
    }
  }
  
  render() {
    const { uiGamesIds, game } = this.props
    //  
    const display = (!uiGamesIds.length || uiGamesIds.includes(game.id)) ? 'inherit' : 'none'
    return (
      <li className={`game-index-item ${display}`} 
        onMouseOver={this.swapClass('inherit')} 
        onMouseOut={this.swapClass('none')}>
          <Link to={`/games/show/${game.id}`} >
            <img src={game.imageUrl} alt={game.title}/>
          </Link>
          <GameIndexItemDisplay game={game} 
            className={this.state.className}
            uiGamesIds={uiGamesIds}/>
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