// gems
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// components
import SessionForm from './session_form'
// actions
import { login } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => ({
  errors: session,
  formType: 'login',
  path: '/signup',
  header: 'Log In',
  blurb: 'Click here to join'
})

const mdp = dispatch => ({
  processForm: user => dispatch(login(user))
})

export default withRouter(connect(msp, mdp)(SessionForm))