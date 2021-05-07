import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserRecipeUpdateComponent = ({ recipe }) => {
  const {token, userId} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [title, setTitle] = useState(recipe.title)
  const [mainText, setMainText] = useState(recipe.mainText)

  const getPath = (recipe) => {
    const path = require(`./recipeImages/${recipe.image}`)
    return path.default
  }

  return (
    <>

      <img src={getPath(recipe)} alt="recipe image"/>

      <div className="input-field">
        <textarea name="q" id="q">{title}</textarea>
      </div>

      <div className="input-field">
        <textarea name="qq" id="qq" cols="30" rows="10">{mainText}</textarea>
      </div>
    </>
  )
}