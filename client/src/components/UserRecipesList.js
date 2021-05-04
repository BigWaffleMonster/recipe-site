import React, { useState, useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserRecipesList = ({ userRecipes }) => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [recipeId, setRecipeId] = useState('')

  const deleteHandler = async () => {
    try {
      console.log()
      // await request(`/api/recipe//delete_userRecipe/${}`)
    } catch (e) {}
  }

  return (
    <>
      <h1>Your recipes</h1>

      <table>
        <tbody className="table">
          {userRecipes.map((recipe, id) => {
            return (
              <tr key={id}>
                <td>{recipe.title}</td>
                <td>{recipe.date.toString()}</td>
                <td><NavLink to="/"><button className="btn yellow darken-3">Update</button></NavLink></td>
                <td><button className="btn red" onClick={deleteHandler}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

