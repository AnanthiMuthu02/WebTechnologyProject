import React, { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import axios from 'axios';
import { API_CONSTANTS } from './API';
import { DUMMY_RECIPES } from '../data';

const ListRecipe = () => {
  const [recipesDummy, setRecipesDummy] = useState(DUMMY_RECIPES);
  const [recipes, setRecipes] = useState(null);

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
        const response = await axios.get(`${API_CONSTANTS.BASEURL}api/recipes`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    } else {
      console.error('No token available for authentication');
    }
  };

  return (
    <div className='recipes'>
      {recipes && recipes.length > 0 ? (
        recipes.map((data) => (
          <MenuItems
            key={data._id}
            id={data._id}
            postId={data._id}
            img={data.thumbnail}
            RecipeName={data.title}
            Description={data.description}
          />
        ))
      ) : (
        recipesDummy.map((data) => (
          <MenuItems
            key={data.id}
            id={data.id}
            img={data.img}
            RecipeName={data.title}
            Description={data?.Description}
          />
        ))
      )}
    </div>
  );
};

export default ListRecipe;
