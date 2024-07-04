import React from 'react'
import { useState } from 'react'

const CreateRecipe = () => {
    const[RecipeName , setRecipeName] = useState('')
    const[Ingredients, setIngredients] = useState('')
    const[Directions , setDirections] = useState('')
    const[Thumbnail , setThumbnail] = useState('')
  return (
    <section className="create-recipe">
        <div className="recipe-container">
            <h2>Create Recipe</h2>
            <p className="error-msg">This is an error message</p>
            <form action="" className="main-createrecipe">
                <input type="text" className="rectitle" placeholder='Recipe Name' value={RecipeName} onChange={e => setRecipeName(e.target.value)} autoFocus></input><br/>
                <textarea type="text" placeholder='Ingredients' value={Ingredients} onChange={e => setIngredients(e.target.value)} autoFocus></textarea><br/>
                <textarea type="text" placeholder='Directions Name' value={Directions} onChange={e => setDirections(e.target.value)} autoFocus></textarea><br/>
                <input className="file" type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'></input><br/>
                <button type="submit" className='createrecipe'>Create Recipe</button><br/>
            </form>
        </div>
    </section>
  )
}

export default CreateRecipe