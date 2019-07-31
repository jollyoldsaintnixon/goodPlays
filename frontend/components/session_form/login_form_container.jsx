// gems
import { connect } from 'react-redux'
// components
import SessionForm from './session_form'
// actions
import { login } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => ({
  errors: session,
  formType: 'login'
})

const mdp = dispatch => ({
  processForm: user => dispatch(login(user))
})

export default connect(msp, mdp)(SessionForm)