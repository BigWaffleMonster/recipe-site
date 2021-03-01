import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () => {
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log(data)
    } catch (e) {}
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
            <button onClick={registerHandler} disabled={loading} className="btn red auth-button-margin">Sing up</button>
            <button disabled={loading} className="btn blue">Sing in</button>
          </div>
          
        </div>
      
      </div>
    </div>
  )
}