import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import Footer from '../footer/footer'

export default function GameJumpLinks(props) {
    // const { game_id } = props
    return (
        // <div className='game-jump-wrapper'>
            <div className='game-jump-links sticky'>
                Jump links
                <h3></h3>
                <Link to={`/games/show/${props.game_id}#game-show`}>Game Description   </Link>
                <Link to={`/games/show/${props.game_id}#game-comments`}>Comments</Link>
                <h3></h3>
                <Footer />
            </div>
        // </div>
    )
}