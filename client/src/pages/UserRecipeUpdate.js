import React, {useCallback, useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useParams } from 'react-router-dom'
import {UserRecipeUpdateComponent} from '../components/UserRecipeUpdateComponent'

export const UserRecipeUpdate = () => {
  const {token, userId} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [recipe, setRecipe] = useState(null)
  const recipeId = useParams().article_id

  const getRecipe = useCallback( async () => {
    try {
      const data = await request(`/api/recipe/detail/${recipeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setRecipe(data)
      console.log(data)
    } catch (e) {}
  }, [token, recipeId, request])

  useEffect(() => {
    getRecipe()
  }, [getRecipe])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Update your recipe</h1>
        { !loading && <UserRecipeUpdateComponent recipe={recipe}/> }
      </div>
    </div>
  )
}