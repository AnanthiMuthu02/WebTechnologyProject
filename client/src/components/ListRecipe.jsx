import React, { useEffect, useState } from 'react';
import MenuItems from './MenuItems';
import axios from 'axios';
import { API_CONSTANTS } from './API';
import { DUMMY_RECIPES } from '../data';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'; // Importing the loader

const ListRecipe = () => {
  const [recipesDummy, setRecipesDummy] = useState(DUMMY_RECIPES);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const response = await axios.get(`${API_CONSTANTS.BASEURL}api/recipes`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        setRecipes(response.data.recipes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        if (error.response && error.response.status === 403) {
          toast.error("Please login first.");
        } else {
          // Default error message handling
          toast.error(error.response ? error.response.data.message : 'Network error');
        }
        setIsLoading(false);
      }
    } else {
      console.error('No token available for authentication');
      setIsLoading(false);
    }
  };

  return (
    <div className='recipes'>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Oval color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        recipes && recipes.length > 0 ? (
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
        )
      )}
      <ToastContainer />
    </div>
  );
};

export default ListRecipe;
