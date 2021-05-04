import React from 'react'
import {NavLink} from 'react-router-dom'

export const UserRecipesList = ({ userRecipes }) => {

  return (
    <>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Last time updated</th>
              <th>See more</th>
            </tr>
          </thead>
          <tbody className="table">
          {userRecipes.map((recipe, id) => {
            return (
              <tr key={id}>
                <td>{recipe.title}</td>
                <td>{recipe.date.toString()}</td>
                <td><NavLink to="/"><button className="btn">...</button></NavLink></td>
              </tr>
            )
          })}
          </tbody>
        </table>
    </>
  )
}

