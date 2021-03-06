// gems
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// components
import WelcomeForm from './welcome_form';
// actions
import { login, receiveErrors } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => ({
  errors: session
})

const mdp = dispatch => ({
  signup: user => dispatch(login(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
})

export default withRouter(connect(msp, mdp)(WelcomeForm))