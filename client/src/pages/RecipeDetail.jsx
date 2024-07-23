import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_CONSTANTS } from '../components/API';

const RecipeDetail = () => {
  const param = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const user = localStorage.getItem('user');
    let token;

    if (user) {
      try {
        token = JSON.parse(user).token;
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        return; // Exit the function if parsing fails
      }
    } else {
      console.error('No user data found in localStorage');
      return; // Exit the function if user data is not found
    }

    if (token) {
      try {
        const response = await axios.get(`${API_CONSTANTS.BASEURL}api/recipes/${param.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    } else {
      console.error('No token available for authentication');
    }
  };

  return (
    <div className="main-recipe">
      <div className="sub-recipe">
        <h1>How to Make {recipe?.title}</h1>
        <div>
          {/* <img className="main-image" src={recipe?.image} alt="recipe" /> */}
        </div>

        <p><span className="span-head">Description:</span> {recipe?.description}</p><br />
        <p><span className="span-head">Ingredients:</span> {recipe?.ingredients || recipe?.Ingredients}</p><br />
        <p><span className="span-head">Method to Cook:</span> {recipe?.directions}</p><br />
      </div>
    </div>
  )
}

export default RecipeDetail;
