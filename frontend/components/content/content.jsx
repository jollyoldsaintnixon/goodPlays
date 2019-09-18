 // gems
import { connect } from 'react-redux';
import React from 'react'
import { Route } from 'react-router-dom'
// components
import GameIndex from '../games/game_index'
// import Welcome from './welcome'

class Content extends React.Component {

  display() {
    const { currentUser } = this.props
    if (currentUser) {
      return (
        <Route path='/profile' render={props => <UserProfile {...props}
          currentUser={currentUser}
        />}/>
          );
      }
  }

  render () {
    return (
      <>
        <div className='space-filler'><span>Come see what we have in store</span></div>
        <section className='content'>
          <GameIndex></GameIndex>
        </section>
      </>
    )
  }
}

const msp = ({ session: { id }, entities: { users } }) => {
  return {currentUser: users[id]}
};

export default connect(msp)(Content)