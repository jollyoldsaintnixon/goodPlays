import React from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../../actions/games_actions'
import { ProtectedRoute } from '../../util/route_util';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { idsToObjects } from '../../util/helper_functions'
import GameShow from './game_show'
import GameIndexItem from './game_index_item'
import GameIndexSorter from './game_index_sorter'
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

class GameIndex extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.fetchGames()
    this.setState({ loading: false })
  }

  render() {
    const { games, uiGamesIds, count } = this.props
    const gamesArray = uiGamesIds.length ? idsToObjects(uiGamesIds, games) : Object.values(games)
    let matched = uiGamesIds.length
    let total = Object.values(games).length
    let indexItems
    let content = <div className='match-count'><h2>Showing entire library</h2></div>

    if (gamesArray.length) {
      if (matched != 0 && matched < total) {
        content = <div className='match-count'>
          <h2>Search returned</h2>
          <h1>{matched}</h1>
          <h2>out of </h2>
          <h1>{total}</h1>
        </div>
      }
      indexItems = gamesArray.map((game, idx) => {
        return <GameIndexItem game={game} key={`game-${idx}`}>Game #{idx + 1}</GameIndexItem>
      })
    }

    if (Object.values(games).length < 90) {
    // if (Object.values(games).length < count) {
    // if (setTimeout(() => false, 3000) || Object.values(games).length < 400) {
      
      return <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={80}
        color={'purple'}
        // position={'absolute'}
        // loading={this.state.loading}
        border={'5px solid purple'}
      />
    }

    return (

      <section className='games'>
        <div className='sorter-wrapper'>
          <GameIndexSorter
            uiGamesIds={uiGamesIds}
            allGames={games}
            content={content} />
        </div>
        <ul className='games-list '>
          {indexItems}
        </ul>
      </section>
    )
  }
}

const msp = (state) => {
  return ({
    games: state.entities.games,
    user: state.entities.users[state.session.id],
    uiGamesIds: state.ui.games,
    count: state.entities.count,
  })
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
})

export default withRouter(connect(msp, mdp)(GameIndex))
