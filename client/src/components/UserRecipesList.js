import React, { useState, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserRecipesList = ({ userRecipes }) => {
  const {token, userId} = useContext(AuthContext)
  const {loading, request} = useHttp()
  const history = useHistory()

  const deleteHandler = async (id) => {
    try {
      await request(`/api/recipe//delete_userRecipe/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      })
    } catch (e) {}
  }

  const updateHandler = async (id) => {
    history.push(`/user_recipe/${userId}/detail/${id}`)
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
                <td><button className="btn yellow darken-3" onClick={updateHandler.bind(null, recipe._id)} disabled={loading}>Update</button></td>
                <td><button className="btn red" disabled={loading} onClick={deleteHandler.bind(null, recipe._id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

