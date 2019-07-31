import React from 'react'
import { Link } from 'react-router-dom'
import { update } from '../../util/helper_functions'

class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '', 
      password: '',
      confirm_password: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = (this.props.formType === 'signup')
    // [this.formType, this.header] = [this.props.formType, this.props.header]
  }

  extraInput() {
    // deconstruct
    const { email, confirm_password } = this.state

    if (this.signup) {
      return (
        <>
          {/* <label>Confirm Password:
                <input type="password" placeholder='username' value={confirm_password} onChange={update('confirm_password', this)} />
          </label> */}
          <label>
            <input type="text" placeholder='Email Address' value={email} onChange={update('email', this)} />
          </label>
        </>
      )
    }
  }

  handleSubmit(event) {
    // stop form submission
    event.preventDefault()
    // destructure
    const { password, confirm_password } = this.state

    if (this.signup && password != confirm_password) {
        return this.props.receiveErrors(["Password must match"])
    } else {
      const user = this.state
      this.props.processForm(user)
    }
  }

  render() {
    // deconstruct
    const { errors, header, path, blurb} = this.props
    const { password, username } = this.state
    // set errors
    
    const errorsList = errors.map((error, idx) => {
      return <li key={`error-${idx}`}>{error}</li>
    })
    // initialize alternative options
      return (
        <section className='session flex-col '>
          <form className='session-form col-1-4' onSubmit={this.handleSubmit}>
            <h3>{header}</h3>
            <label>
              <input type="text" placeholder='Username' value={username} onChange={update('username', this)}/>
            </label>
            <label>
              <input type="password" placeholder='Password' value={password} onChange={update('password', this)}/>
            </label>
            {this.extraInput()}
            <div>
              <input type="submit" value={`${header}!`}/>
              <Link to={path} >{blurb}</Link>
            </div>
            <ul>
              {errorsList}
            </ul>
          </form>
        </section>
      )

  }
}

export default SessionForm