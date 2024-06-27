import React from 'react'
import { useParams } from 'react-router-dom'
import {DUMMY_RECIPES} from "../data"

const RecipeDetail = () => {
  const param = useParams();
 console.log(param)
  
  return (
    <div className="main-recipe"> 
       <h1>How to Make {DUMMY_RECIPES[param.id]["RecipeName"]}</h1>
      <div>
      <img className="main-image"src={DUMMY_RECIPES[param.id]["img"]} alt="recipe" />
      </div>
       
      <p>Description: {DUMMY_RECIPES[param.id]["Description"]}</p><br />
      <p>Ingredients: {DUMMY_RECIPES[param.id]["Ingredients"]}</p><br />
      <p>Method to Cook: {DUMMY_RECIPES[param.id]["Directions"]}</p><br />
      
    </div>
    
   
  )
}

export default RecipeDetail