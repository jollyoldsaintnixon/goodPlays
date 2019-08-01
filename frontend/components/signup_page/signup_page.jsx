import React from 'react'
import { withRouter } from 'react-router-dom'
import SignupFormContainer from '../session_form/signup_form_container'

class SignupPage extends React.Component {

  render (){
    return (
      <section className='signup-page'>
        <SignupFormContainer id='signup-page-section'/>
      </section>
    )
  }   
}

export default SignupPage