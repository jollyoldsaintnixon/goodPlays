import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';

export default function UserAnchorLinks(props) {
    return (
        // <div className='user-anchor-wrapper'>
            <div className='user-anchor-links'>
                Jump to:
            <Link to='/profile#game-rack'>Games   </Link>
                <Link to='/profile#user-game-comments'>Comments</Link>
            </div>
        // {/* </div> */}
    )
}