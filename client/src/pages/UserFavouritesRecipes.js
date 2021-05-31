import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UserFavouritesRecipes = () => {
  const {token} = useContext(AuthContext)
  const {loading, request} = useHttp()

  const userId = useParams().id

  return (
    <h1>Hello</h1>
  )
}