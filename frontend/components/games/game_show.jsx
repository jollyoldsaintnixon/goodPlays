
import React from 'react'
import { genreFilter, categoryFilter } from '../../util/helper_functions'
import { Link } from 'react-router-dom'
import GameCommentSection from '../comments/game_comment_section'

class GameShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rest: null,
      className: 'show',
    }
    this.expand = this.expand.bind(this)
  }

  displayButtons() {
    if (this.props.user) {
      let buttonText = 'Add to Rack'
      let buttonSubmit = this.addGame.bind(this)
      const gameId = parseInt(this.props.match.params.gameId)
  
      if (this.props.game_ids.includes(gameId)) {
        buttonText = 'Remove from Rack'
        buttonSubmit = this.removeGame.bind(this)
      }
      return (
        <>
          <button className='button' onClick={buttonSubmit}>{buttonText}</button>
          <button className='button' ><Link to='/profile' >My Rack</Link></button>
        </>
      )
    } else {
      return null
    }
  }
  

  addGame(e) {
    e.preventDefault()
    this.props.addGameToUser(this.props.match.params.gameId)
  }

  removeGame(e) {
    e.preventDefault()
    this.props.deleteGameFromUser(this.props.match.params.gameId)
  }

  typeSearch(filtered) {
    return (e) => {
      this.props.receiveUiGames(filtered)
    }
  }

  genreLinks(game) {
    const { allGames } = this.props
    if (game.genres.length) {
      let list = game.genres.map((genre, idx) => {
        let genreArray = []
        genreArray.push(genre)
        return <Link
          to='/index'
          key={`${game}-${genre}-${idx}`}
          onClick={this.typeSearch(genreFilter(allGames, genreArray))}>
          {genre}</Link>
      })
      list.unshift('Genres: ')
      return list
    } else {
      return null
    }
  }

  categoryLinks(game) {
    const { allGames } = this.props
        
    if (game.categories.length) {
      let list = game.categories.map((category, idx) => {
        let categoryArray = []
        categoryArray.push(category)           
        return <Link
          to='/index'      
          key={`${game}-${category}-${idx}`}
          onClick={this.typeSearch(categoryFilter(allGames, categoryArray))}>
          {category}</Link>
      })
      list.unshift('Catagories: ')
      return list
    } else {
      return null
    }
  }

  expand(e) {
    e.preventDefault()
    const { game } = this.props
    const rest = game.description.slice(1000, game.description.length)
    this.setState({
      rest: rest,
      className: 'none'
    })
  }


  componentDidMount() {
     
    this.props.fetchGame(this.props.match.params.gameId)
    this.props.fetchGames()
  }

  componentDidUpdate(prevProps) {
     
    if (!prevProps.game || prevProps.game.id != this.props.match.params.gameId) {
      this.props.fetchGame(this.props.match.params.gameId)
      this.props.fetchGames()
    }
  }

  render () {
    let { game } = this.props
    const { className, rest } = this.state

    if (game === undefined) {
      game = { title: '', release_date: '', description: '', imageUrl: '', image_url: '', genres: [], categories: [] }
    }
    let content = ''
    let first = game.description.slice(0, 1000)
    if (game.description.length > 1000) {
      content = '...more'
    }
    //  
    return (
      <ul className='game-show col-2-3'>
        <li><img src={game.imageUrl} alt={`${game.title} image`} /></li>  
        <li className='game-title'>{game.title}</li>
        <li className='game-price'>${game.price}</li>
        <li className='game-release-date'>Released {game.release_date}</li>
        <li className='game-description'>
          {first}<span className={className} onClick={this.expand}>{content}</span>{rest}
        </li>
          
        <li className='game-genres links'>{this.genreLinks(game)}</li>
        <li className='game-categories links'>{this.categoryLinks(game)}</li>
        <div className='button-container'>
          {this.displayButtons()}
        </div>
        <GameCommentSection game_id={game ? game.id : null}></GameCommentSection>
      </ul>
    )
  }
}

export default GameShow