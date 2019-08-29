import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';

export default function UserAnchorLinks(props) {
    return (
        <div className='user-anchor-wrapper'>
            <div className='user-anchor-links'>
                <Link to='/profile#game-rack'>My Games</Link>
                <Link to='/profile#user-game-comments'>My Comments</Link>
            </div>
        </div>
    )
}