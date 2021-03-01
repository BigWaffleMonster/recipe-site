import React, {useState} from 'react'

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Auth</h1>
        
        <div className="card blue-grey darken-2">
          <div className="card-content white-text">
            <span className="card-title">Sing up/in</span>  {/* mb devide into 2 diff pages */}
            <div>
  
              <div className="input-field">
                <input
                  placeholder="Enter your Email"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">First Name</label>
              </div>
  
              <div className="input-field">
                <input
                  placeholder="Enter your password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">First Name</label>
              </div>
              
            </div>
          </div>
          
          <div className="card-action">
            <button className="btn red auth-button-margin">Sing up</button>
            <button className="btn blue">Sing in</button>
          </div>
          
        </div>
      
      </div>
    </div>
  )
}