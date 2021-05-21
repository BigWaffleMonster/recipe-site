import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserRecipeUpdateComponent = ({ recipe }) => {
  const history = useHistory()
  const {token, userId} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [recipeId, SetRecipeId] = useState(recipe._id)
  const [form, setForm] = useState({
    title: recipe.title, mainText: recipe.mainText
  })

  const getPath = (recipe) => {
    const path = require(`./recipeImages/${recipe.image}`)
    return path.default
  }

  const changeHandler = event => {
      setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateHandler = async () => {
    try {
      const data = await request(`/api/recipe/userRecipe/update/${recipeId}`, 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      })
      history.push(`/user_recipes/${userId}`)
    } catch (e) {}
  }

  return (
    <>
      <img src={getPath(recipe)} alt="recipe image"/>

      <div className="input-field">
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={form.title}
          value={form.title}
          onChange={changeHandler}
        />
      </div>

      <div className="input-field">
        <textarea
          name="mainText"
          id="mainText" cols="30"
          rows="10"
          defaultValue={form.mainText}
          value={form.mainText}
          onChange={changeHandler}
        />
      </div>

      <button
        className="btn"
        onClick={updateHandler}
        disabled={loading}
      >
        Update
      </button>

      <button
        className="btn"
        onClick={() => history.push(`/user_recipes/${userId}`)}
        disabled={loading}
      >
        Go back
      </button>
    </>
  )
}