import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

export const NavBar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><NavLink to="/search">Search</NavLink></li>
          <li><NavLink to="/create">Create</NavLink></li>
          {auth.isAuthenticated && <li><a href="/" onClick={logoutHandler}>Log out</a></li>}
          {!auth.isAuthenticated && <li><NavLink to="/auth">Sign in</NavLink></li>}
        </ul>
      </div>
    </nav>
  )
}