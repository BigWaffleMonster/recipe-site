import React, {useContext, useState} from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const RecipeDetail = ({ recipe }) => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [commentText, setCommentText] = useState('')

  const likeHandler = async () => {
    try {
      const data = await request(`/api/recipe/detail/like/${recipe._id}`, 'POST', null, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {}
  }

  const commentHandler = async () => {
    try {
      const data = await request(`/api/recipe/detail/comment/${recipe._id}`, 'POST', {commentText}, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {}
  }

  return (
    <>
      <h1>{recipe.title}</h1>
      <h2>{recipe.mainText}</h2>

      <button
        className="btn"
        disabled={loading}
        onClick={likeHandler}
      >
        <i className="material-icons">insert_emoticon</i>
      </button>

      <h5>{recipe.likes}</h5>

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

    </>
  )
}