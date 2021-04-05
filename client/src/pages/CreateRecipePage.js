import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const CreateRecipePage = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [title, setTile] = useState('')
  const [mainText, setMainText] = useState('')
  const [image, setImage] = useState('')


  const formHandler = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('mainText', mainText)
    formData.append('image', image)

    try {
      const data = await request('/api/recipe/create', 'POST', formData, {
        Authorization: `Bearer ${auth.token}`
      })
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Create recipe</h1>

        <form onSubmit={formHandler} encType="multipart/form-data">
            <div className="input-field">
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e => setTile(e.target.value))}
              />
            </div>

            <div className="input-field">
              <textarea
                placeholder="Input your text here"
                className="textarea-margin"
                id="mainText"
                name="mainText"
                value={mainText}
                onChange={(e => setMainText(e.target.value))}
              >
              </textarea>
            </div>

          <div className="input-field">
            <input
              id="image"
              type="file"
              name="image"
              onChange={(e => setImage(e.target.files[0]))}
            />
          </div>

          <div className="input-field">
            <input type="submit"/>
          </div>
        </form>
      
      </div>
    </div>
  )
}