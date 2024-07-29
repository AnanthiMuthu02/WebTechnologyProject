import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { API_CONSTANTS } from '../components/API';
import { Oval } from 'react-loader-spinner'; // Importing the loader
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeDetail = () => {
  const param = useParams();
  const [recipe, setRecipe] = useState(null);
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
        const response = await axios.get(`${API_CONSTANTS.BASEURL}api/recipes/${param.id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        setRecipe(response?.data?.recipe);
        toast.success(response?.response?.data?.message);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setIsLoading(false);
        setIsLoading(false);
        if (error.response && error.response.status === 403) {
          toast.error("Please login first.");
        } else {
          // Default error message handling
          toast.error(error.response.data.message);
        }
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
          <img className="main-image" src={recipe?.thumbnail} alt="recipe" />
        </div>

        <p><span className="span-head">Description:</span> {recipe?.description}</p><br />
        <p><span className="span-head">Ingredients:</span> {recipe?.ingredients || recipe?.Ingredients}</p><br />
        <p><span className="span-head">Method to Cook:</span> {recipe?.directions}</p><br />
      </div>
      <ToastContainer />
    </div>
  )
}

export default RecipeDetail;
