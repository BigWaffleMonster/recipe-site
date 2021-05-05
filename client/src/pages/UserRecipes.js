import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import {UserRecipesList} from '../components/UserRecipesList'

export const UserRecipes = () => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const [userRecipes, setUserRecipes] = useState(null)
  const userId = useParams().id

  const getUserRecipes = useCallback( async () => {
    try {
        const data = await request(`/api/recipe/getUserRecipes/${userId}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setUserRecipes(data)
    } catch (e) {}
  }, [token, userId, request])

  useEffect(() => {
    getUserRecipes()
  }, [getUserRecipes])

  return (
    <div className="row">
      <div className="col s6 offset-s3">

        { !loading && userRecipes && <UserRecipesList userRecipes={userRecipes}/> }

      </div>
    </div>
  )
}
