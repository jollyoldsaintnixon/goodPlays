import React from 'react'
import { connect } from 'react-redux'
import { 
  Route, 
  Redirect, 
  withRouter 
} from 'react-router-dom'

// restrict what routes signed in users can view
export const Auth = ({component: Component, path, loggedIn, exact}) => { //component must be aliased with a capital letter
  return (
    <Route path={ path } exact={ exact } render={props => {
      if (!loggedIn) {  // must use render function due to this conditional
        return <Component {...props} /> //restructuring props
      } else {
        <Redirect to='/' />
      }
    }}
    />
  )
}

// restrict what routes signed out users can view
export const Protected = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route path={path} exact={exact} render={props => {
      if (loggedIn) {
        return <Component {...props} />
      } else {
        return <Redirect to='/login' />
      }
    }}
    />
  )
}

const msp = ({ session: { id }, entities: { users }}) => ({
  loggedIn: users[id]
})

// export the routes with access to route params and the state
export const AuthRoute = withRouter(connect(msp)(Auth))
export const ProtectedRoute = withRouter(connect(msp)(Protected))