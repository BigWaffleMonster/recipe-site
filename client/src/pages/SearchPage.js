import React, { useState, useContext, useCallback } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import {RecipeCard} from '../components/RecipeCard'


export const SearchPage = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()

  const [recipeName, setRecipeName] = useState('')
  const [recipes, setRecipes] = useState([])


  const searchHandler = useCallback(async (recipeName) => {
    try {
      const data = await request(`/api/recipe/${recipeName}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setRecipes(data)
    } catch (e) {}
  }, [request, auth])

  return (
    <div className="row">
      <div className="col s6 offset-s3">

        <div className="input-field">
          <input
            id="recipeName"
            type="text"
            name="recipeName"
            value={recipeName}
            onChange={(e => setRecipeName(e.target.value))}
          />
        </div>

        <button
          onClick={() => searchHandler(recipeName)}
          disabled={loading}
          className="btn"
        >
          Search
        </button>

        <button
          onClick={() => setRecipeName('')}
          disabled={loading}
          className="btn btn-clear"
        >
          <i className="material-icons">clear</i>
        </button>

        {recipes && <RecipeCard recipes={recipes}/>}

      </div>
    </div>
  )
}