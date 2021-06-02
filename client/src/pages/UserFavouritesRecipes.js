import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import {UserRecipesList} from '../components/UserRecipesList'

export const UserFavouritesRecipes = () => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [userFavouritesRecipes, setUserFavouritesRecipes] = useState(null)
  const userId = useParams().id

  const getUserFavouritesRecipes = useCallback( async () => {
    try {
      const data = await request(`/api/recipe/getUserFavouritesRecipes`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log(data)
      setUserFavouritesRecipes(data)
    } catch (e) {}
  }, [token, userId, request])

  useEffect(() => {
    getUserFavouritesRecipes()
  }, [getUserFavouritesRecipes])

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        { !loading && userFavouritesRecipes }
      </div>
    </div>
  )
}