import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const SearchPage = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()

  const [recipeName, setRecipeName] = useState('')
  const [recipes, setRecipes] = useState([])

  const searchHandler = async () => {
    try {
      const data = await request(`/api/recipe/search/${recipeName}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      console.log(data)
      setRecipes(data)
    } catch (e) {}
  }

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

        <button onClick={searchHandler} className="btn">Search</button>

      </div>
    </div>
  )
}