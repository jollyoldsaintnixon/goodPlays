 // gems
import { connect } from 'react-redux';
import React from 'react'
// components
import GameIndex from '../games/game_index'
// import Welcome from './welcome'

class Content extends React.Component {

  display() {
    const { currentUser } = this.props
    if (currentUser) {
      return (
        <>
        Game Index:
          <GameIndex ></GameIndex>
        </>
      );
    } else {
      return (
        <>
        </>
      );
    }
  }

  render () {
    return (
      <section className='content'>
        {this.display()}
      </section>
    )
  }
}

const msp = ({ session: { id }, entities: { users } }) => ({
  currentUser: users[id]
});

export default connect(msp)(Content)