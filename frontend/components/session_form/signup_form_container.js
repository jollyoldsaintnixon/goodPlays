// gems
import { connect } from 'react-redux'
// components
import SessionForm from './session_form'
// actions
import { signup } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => ({
  errors: session,
  formType: 'signup',
  path: '/login',
  header: 'Sign Up',
  blurb: 'Already a member?'
})

const mdp = dispatch => ({
  processForm: user => dispatch(signup(user))
})

export default connect(msp, mdp)(SessionForm)