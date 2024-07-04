import React from 'react'
import { useParams } from 'react-router-dom'
import {DUMMY_RECIPES} from "../data"

const RecipeDetail = () => {
  const param = useParams();
 console.log(param)
  
  return (
    <div className="main-recipe"> 
      <div className="sub-recipe">
       <h1>How to Make {DUMMY_RECIPES[param.id]["RecipeName"]}</h1>
      <div>
      <img className="main-image"src={DUMMY_RECIPES[param.id]["img"]} alt="recipe" />
      </div>
       
      <p><span className="span-head">Description:</span> {DUMMY_RECIPES[param.id]["Description"]}</p><br />
      <p><span className="span-head">Ingredients:</span>I {DUMMY_RECIPES[param.id]["Ingredients"]}</p><br />
      <p><span className="span-head">Method to Cook:</span> {DUMMY_RECIPES[param.id]["Directions"]}</p><br />
      </div>
    </div>
    
   
  )
}

export default RecipeDetail