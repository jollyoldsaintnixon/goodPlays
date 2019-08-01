import React from 'react'
import { Link } from 'react-router-dom'
import { update } from '../../util/helper_functions'

class SignupPage extends React.Component {
  constructor(props) {
    
    super(props)
    this.state = {
      username: '',
      password: '',
      // confirm_password: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = (this.props.formType === 'signup')
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

    // if (this.signup && password != confirm_password) {
    //   this.props.receiveErrors(["Password must match"])
    //   this.props.history.push('/signup')
    // } else {
      const user = this.state
      this.props.processForm(user)
    }
  }

  handleClick(e) {
    this.props.clearErrors()
  }

  render() {
    // deconstruct
    const { errors, header, path, blurb, buttonText } = this.props
    const { password, username, email } = this.state
    // set errors

    const errorsList = errors.map((error, idx) => {
        return <li key={`error-${idx}`}>{error}</li>
      })
    

    // const id = errors.length > 0 ? 'error-page' : ''
    // initialize alternative options
    
    return (
      <section className='flex-col signup-page'>
        <form className='signup-page-form .content col-1-2' onSubmit={this.handleSubmit}>
          <h3>{header}</h3>
          <ul className='signup-page-inputs'>
            <ul className='signup-page-errors'>
              {errorsList}
            </ul>
            <label>
              <input type="text" placeholder='Username' value={username} onChange={update('username', this)} />
            </label>
            <label>
              <input type="password" placeholder='Password' value={password} onChange={update('password', this)} />
            </label>
            {this.extraInput()}
          </ul>
          <div className='signup-page-links'>
            <input type="submit" value={buttonText} />
            <Link to={path} onClick={e => this.handleClick(e)}>{blurb}</Link>
          </div>
          <ul className='error-list'>
          </ul>
        </form>
      </section>
    )

  }
}

export default SignupPage