import React from 'react'

export const RecipeDetail = ({ recipe }) => {
  return (
    <>
      <h1>{recipe.title}</h1>
      <h2>{recipe.mainText}</h2>
    </>
  )
}