// gems
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// components
import SignupPage from './signup_page'
// actions
import { login, clearErrors } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => ({
  errors: session,
  formType: 'login',
  path: '/signup',
  header: 'Sign in to goodPlays',
  blurb: 'Click here to join',
  buttonText: 'Sign in!'
})

const mdp = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  processForm: user => dispatch(login(user))
})

export default withRouter(connect(msp, mdp)(SignupPage))