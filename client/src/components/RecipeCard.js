import React from 'react'
import {NavLink} from 'react-router-dom'

export const RecipeCard = ({ recipes }) => {
  
  const getPath = (recipe) => {
    const path = require(`./recipeImages/${recipe.image}`)
    return path.default
  }

  return (
    <div className="row">
     <div className="col s12">
        {recipes.map((recipe, index) => {
          return (
            <div className="card" key={index}>
              <div className="card-image">
                <img src={getPath(recipe)} alt="recipe image"/>
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <NavLink to={`/detail/${recipe._id}`}>{recipe.title}</NavLink>
              </div>
            </div>
          )
        })} 
        
     </div>
   </div>
  )
}

