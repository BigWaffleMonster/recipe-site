import React, {useContext} from 'react'
import { AuthContext } from '../context/auth.context'


export const HomePage = () => {
  const auth = useContext(AuthContext)

  return (
    <div className="container">
      <div className="col s12">
        <h3 className="home_name">Food For You</h3>

        <h4 className="moto_text">You dreamed of learning how to cook, but the lack of knowledge always stopped you? Our recipe site will help you fix this.</h4>

        <h3 className="question">Why our site?</h3>

        <ul className="list">
          <li><h4>100% correct recipes</h4></li>
          <li><h4>Many recipes from famous chefs</h4></li>
          <li><h4>Only professionals in their field post recipes</h4></li>
        </ul>

        {!auth.isAuthenticated && <h3 className="todo">If you are interested in recipes just go sign in or register to watch them</h3>}
      </div>
    </div>
  )
}