import React, {useContext, useState, useCallback, useEffect} from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import {CommentList} from './CommentList'

export const RecipeDetail = ({ recipe }) => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [commentText, setCommentText] = useState('')
  const [commentList, setCommentList] = useState(null)
  const [recipeId, setRecipeId] = useState(recipe._id)
  const [isClicked, setIsClicked] = useState(false)

  const getPath = (recipe) => {
    const path = require(`./recipeImages/${recipe.image}`)
    return path.default
  }

  const favoritesHandler = async () => {
    try {
      const data = await request(`/api/recipe/detail/like/${recipeId}`, 'POST', null, {
        Authorization: `Bearer ${token}`
      })
    } catch (e) {}
  }

  const commentHandler = async () => {
    try {
      setIsClicked(true)
      const data = await request(`/api/comment/setComment/${recipeId}`, 'POST', {commentText}, {
        Authorization: `Bearer ${token}`
      })
      setIsClicked(false)
      setCommentText('')
    } catch (e) {}
  }

  const commentListHandler = useCallback( async () => {
    try {
      const data = await request(`/api/comment/commentList/${recipeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCommentList(data)
    } catch (e) {}
  }, [recipeId, request, token])

  useEffect(() => {
    commentListHandler()
  }, [commentListHandler, isClicked])

  return (
    <>

      <img src={getPath(recipe)} alt="recipe image"/>
      <h1>{recipe.title}</h1>
      <h2>{recipe.mainText}</h2>

      <button
        className="btn"
        disabled={loading}
        onClick={""}
      >
        <i className="material-icons">insert_emoticon</i>
      </button>

      <textarea
        placeholder="Input your text here"
        className="textarea-margin"
        id="mainText"
        name="mainText"
        value={commentText}
        onChange={(e => setCommentText(e.target.value))}
      >
      </textarea>

      <button
        onClick={commentHandler}
        disabled={loading}
        className="btn"
      >
        Leave comment
      </button>

      {commentList && <CommentList commentList={commentList}/>}

    </>
  )
}