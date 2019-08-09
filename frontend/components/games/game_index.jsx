// import React from 'react'
// import { connect } from 'react-redux'
// import { fetchGames, fetchPagesOfGames, fetchNGames } from '../../actions/games_actions'
// import { ProtectedRoute } from '../../util/route_util';
// import { Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
// import { idsToObjects } from '../../util/helper_functions'
// import GameShow from './game_show'
// import GameIndexItem from './game_index_item'
// import GameIndexSorter from './game_index_sorter'
// import { Waypoint } from 'react-waypoint';

// class GameIndex extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = { page: 1, }
//     // this.getPage = this.getPage.bind(this)
//     // this.getFirstPage = this.getFirstPage.bind(this)
//     this.fGames = this.fGames.bind(this)
//   }

//   getPage() {
//     debugger
//     let currentPage = this.state.page
//     this.props.fetchPagesOfGames(currentPage)
//     currentPage += 1
//     this.setState({page: currentPage})
//   }

//   // getFirstPage() {
//   //   debugger
//   //   return this.props.fetchPagesOfGames(this.state.page)
//   // }
//   fGames(page, total) {
//     const that = this
//     return () => {
//       that.props.fetchNGames(page)
//         .then(() => {
//           debugger
//           page += 1
//           if (total >= that.props.count) {
//             return
//           } else {
//             total += 25
//             that.fGames(page, total)()
//           }
//         })
//     }
//   }

//   componentDidMount() {
//     const { count, games } = this.props
//     // this.getPage()
//     // while (Object.keys(games).length < count) {
//     //   this.getPage()
//     // }
//     // setTimeout(this.fGames(0, 0), 0)
//     this.props.fetchGames()
//     // const that = this
//     // const promise = this.getFirstPage()
//     //   promise.then(() => that.setState({page: 2}))
//   }

//   render() {
//     const { games, uiGamesIds, count } = this.props
//     if (!count) {
//       return null
//     } 
//     let content = null
//     let matched = uiGamesIds.length
//     let indexItems
//     const gamesArray = Object.values(games)
//     const matchedGamesArray = uiGamesIds.length ? idsToObjects(uiGamesIds, games) : gamesArray

  
//     content = <div className='match-count'><h2>Showing entire library</h2></div>
//       if (matchedGamesArray.length) {
//         if (matched != 0 && matched < count) {
//           content = <div className='match-count'>
//             <h2>Search returned</h2>
//             <h1>{matched}</h1>
//             <h2>out of </h2>
//             <h1>{count}</h1>
//           </div> 
//         } 
    

    
//       indexItems = matchedGamesArray.map((game, idx) => {
//         return <GameIndexItem game={game} key={`game-${idx}`}>Game #{idx + 1}</GameIndexItem>
//       })
//     }
    
//     return (
      
//       <section className='games'>
//         <div className='sorter-wrapper'>
//           <GameIndexSorter 
//             uiGamesIds={uiGamesIds} 
//             allGames={games}
//             content={content}/>
//         </div>
//         <ul className='games-list '>
//           {indexItems}
//         </ul>
//         {/* <Waypoint onEnter={this.getPage} 
//                 onPositionChange={this.getPage}
//                 topOffset='20%'
//                 // bottomOffset='20%'
//         /> */}
//     </section>
//     )
//   }
// }

// const msp = (state) => {
//   return ({ 
//     games: state.entities.games,
//     user:  state.entities.users[state.session.id],
//     uiGamesIds: state.ui.games,
//     count: state.entities.count.count,
//   })
// }

// const mdp = dispatch => ({
//   fetchGames: () => dispatch(fetchGames()),
//   fetchPagesOfGames: page => dispatch(fetchPagesOfGames(page)),
//   fetchNGames: idx => dispatch(fetchNGames(idx))
// })

// export default withRouter(connect(msp, mdp)(GameIndex))
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

class GameIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  render() {
    const { games, uiGamesIds } = this.props
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
    uiGamesIds: state.ui.games
  })
}

const mdp = dispatch => ({
  fetchGames: () => dispatch(fetchGames())
})

export default withRouter(connect(msp, mdp)(GameIndex))
