import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const CreateRecipePage = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [title, setTile] = useState('')
  const [mainText, setMainText] = useState('')

  const pressHandler = async () => {
    try {
      const data = await request('/api/recipe/create', 'POST', {title, mainText}, {
        Authorization: `Bearer ${auth.token}`
      })
      console.log(data)
    } catch (e) {}
  }


  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Create recipe</h1>
    
          <div className="input-field">
            <input
              id="title"
              type="text"
              name="title"  
              value={title}
              onChange={(e => setTile(e.target.value))}
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-field">
            <textarea 
              placeholder="Input your text here"
              className="textarea-margin"
              id="mainText"
              type="text"
              name="mainText"  
              value={mainText}
              onChange={(e => setMainText(e.target.value))}
            >
            </textarea>
          </div>

          <button onClick={pressHandler} disabled={loading} className="btn black">Create</button>
      
      </div>
    </div>
  )
}