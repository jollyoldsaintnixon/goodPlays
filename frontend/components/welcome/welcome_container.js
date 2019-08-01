// gems
import { connect } from 'react-redux';
// actions
import { logout } from '../../actions/session_actions'
// components
import Welcome from './welcome'

const msp = ({session: { id }, entities: { users }}) => ({
  currentUser: users[id]
});

// const mdp = dispatch => ({
//   logout: () => dispatch(logout())
// })

export default connect(msp)(Welcome)