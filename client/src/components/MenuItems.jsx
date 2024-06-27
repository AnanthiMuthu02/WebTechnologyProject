import React from 'react'
import { Link } from 'react-router-dom'


const MenuItems = ({postId ,img, RecipeName , Description}) => {
  
  return (
   
   <article className='recipebox'>
    <div className='recipeimg-container'>
        <img className="recipeimg"src={img} alt="recipeimage"></img>
   
      
        <h1>{RecipeName}</h1>
        <p>{Description}</p>
        <Link to={`/recipes/${postId}`}  className="recipebtn">Full Recipe</Link>
        <p>Preparation time : 30mins</p>
        
        
    </div>
   </article>
  
  )
}

export default MenuItems