import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route , Routes} from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import ErrorPage from './pages/errorPage';
import Home from './pages/home';
import RecipeDetail from './pages/RecipeDetail';
import CreateRecipe from './pages/createrecipe';
import Login from './pages/login';
import Signup from './pages/signup';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    errorElement:<ErrorPage />,
    children:[
      {index:true , element:<Home />},
      {path:"recipes/:id" , element:<RecipeDetail />},
      {path:"createrecipe" , element:<CreateRecipe />},
      {path:"login" , element:<Login />},
      
      {path:"signup" , element:<Signup />}
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

