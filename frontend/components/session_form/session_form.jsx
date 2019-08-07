import React from 'react'
import { Link } from 'react-router-dom'
import { update } from '../../util/helper_functions'

class SessionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '', 
      password: '',
      // confirm_password: '',
      email: '',
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
    // const { password, confirm_password } = this.state

    // if (this.signup && password != confirm_password) {
    //   this.props.receiveErrors(["Password must match"])
    //   this.props.history.push('/signup')
    // } else {
      
      const user = this.state
      const that = this
      const promise = this.props.processForm(user)
      promise.then(success => {
          that.props.history.push('/profile')
        } , error => {
          that.props.history.push('/signup')
        })
    // }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.id != this.props.match.params.id)
  //   if (this.props.errors.length > 0) {
  //     this.props.history.push('/signup-page')
  //   }
  // }

  render() {
    // deconstruct
    const { errors, header, path, blurb, lede } = this.props
    const { password, username } = this.state
    // set errors
    
    const errorsList = errors.map((error, idx) => {
      return <li key={`error-${idx}`}>{error}</li>
    })
    
    // const id = errors.length > 0 ? 'error-page' : ''
    // initialize alternative options
      return (
        <section className='session flex-col' >
          <form className='session-form col-1-4' onSubmit={this.handleSubmit}>
            <h3>{header}</h3>
            <div className='.inline-block'>
              <p>{lede}</p>
            </div>
            <ul className='session-inputs'>
              <label>
                <input type="text" placeholder='Username' value={username} onChange={update('username', this)}/>
              </label>
              <label>
                <input type="password" placeholder='Password' value={password} onChange={update('password', this)}/>
              </label>
              {this.extraInput()}
            </ul>
            <div className='session-links'>
              <input type="submit" value={`${header}!`}/>
              <Link to={path} >{blurb}</Link>
            </div>
            <ul className='error-list'>
              {errorsList}
            </ul>
          </form>
        </section>
      )

  }
}

export default SessionForm