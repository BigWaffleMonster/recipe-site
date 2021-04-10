import React from 'react'

export const RecipeCard = ({ recipes }) => {
  return (
    <div>
      <ul>
        { recipes.map((recipe, index) => {
          return (
            <li key={index}>{ recipe.title }</li>
          )
        })}
      </ul>
    </div>
  )
}