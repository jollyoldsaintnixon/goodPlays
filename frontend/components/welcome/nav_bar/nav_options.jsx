import React from 'react'
import { Link } from 'react-router-dom'

class NavOptions extends React.Component {

  render () {
    return (
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><a href="#">My Games</a></li>
        <li><a href="#">Browse</a></li>
        <li><a href="#">Communities</a></li>
      </ul>
    )
  }
}

export default NavOptions