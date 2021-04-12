import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RecipeDetailPage } from '../components/RecipeDetail'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const DetailRecipePage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()

  const [recipe, setRecipe] = useState(null)

  const recipeId = useParams().id

  const getRecipe = useCallback( async () => {
    try {
      const data = await request(`/api/recipe/detail/${recipeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setRecipe(data)
    } catch (e) {}
  }, [token, recipeId, request])

  useEffect(() => {
    getRecipe()
  }, [getRecipe])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        {!loading && recipe && <RecipeDetailPage recipe={recipe}/> }
      </div>
    </div>
  )
}