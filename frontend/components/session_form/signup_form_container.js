// gems
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// components
import SessionForm from './session_form'
// actions
import { signup, receiveErrors } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => {
  return ({
    errors: session,
    formType: 'signup',
    path: '/login',
    header: 'Sign Up',
    blurb: 'Already a member?',
    lede: 'Create a free account'
  })
}

const mdp = dispatch => ({
  processForm: user => dispatch(signup(user)), 
  receiveErrors: errors => dispatch(receiveErrors(errors))
})

export default withRouter(connect(msp, mdp)(SessionForm))