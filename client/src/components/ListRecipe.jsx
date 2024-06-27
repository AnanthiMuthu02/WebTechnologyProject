import React, { useState }  from 'react'

import {DUMMY_RECIPES} from "../data"

import MenuItems from './MenuItems'






const ListRecipe = () => {
   
    
   const [recipes, setRecipes] = useState(DUMMY_RECIPES)

    return(
        <div className='recipes'>
            {
             recipes.map((data) => <MenuItems id={data.id} postId={data.id} img={data.img} RecipeName={data.RecipeName}  Description={data.Description}/>)
             }
        </div>

    )
}
export default ListRecipe

