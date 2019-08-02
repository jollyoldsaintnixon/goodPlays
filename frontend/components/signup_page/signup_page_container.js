// gems
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// components
import SignupPage from '../signup_page/signup_page'
// actions
import { signup, receiveErrors, clearErrors } from '../../actions/session_actions'

const msp = ({ errors: { session } }) => {
  
  return ({
    errors: session,
    formType: 'signup',
    path: '/login',
    header: 'Sign up with goodPlays',
    blurb: 'Already a member?',
    buttonText: 'Sign up!',
    lede: "See what your friends are playing, get game recommendations, and join the world’s largest community of gamers."
  })
}

const mdp = dispatch => ({
  clearErrors: () => dispatch(clearErrors()),
  processForm: user => dispatch(signup(user)),
  receiveErrors: errors => dispatch(receiveErrors(errors))
})

export default withRouter(connect(msp, mdp)(SignupPage))