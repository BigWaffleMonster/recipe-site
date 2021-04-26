import React, { useContext } from 'react'

export const CommentList = ({ commentList }) => {

  return (
    <>
      <ul>
        { commentList.map((comment, index) => {
          return (
            <li key={index}>{comment.commentText}</li>
          )
        }) }
      </ul>
    </>
  )
}