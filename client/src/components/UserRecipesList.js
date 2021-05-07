import React, { useState, useContext } from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserRecipesList = ({ userRecipes }) => {
  const {token, userId} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const deleteHandler = async (id) => {
    try {
      await request(`/api/recipe//delete_userRecipe/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      })
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
                <td><NavLink to={`/user_recipe/${userId}/detail/${recipe._id}`}><button className="btn yellow darken-3" disabled={loading}>Update</button></NavLink></td>
                <td><button className="btn red" disabled={loading} onClick={deleteHandler.bind(null, recipe._id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

