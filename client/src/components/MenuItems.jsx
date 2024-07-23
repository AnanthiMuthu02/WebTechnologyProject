import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItems = ({ postId, img, RecipeName, Description }) => {
  const handleLinkClick = (e) => {
    if (!postId) {
      e.preventDefault();
      toast.info('This is dummy data. To get original data, please login.', {
        position: "top-center",
        autoClose: 2000, // Duration of the toast
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect after 3 seconds to match the toast duration
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    }
  };

  return (
    <article className='recipebox'>
      <div className='recipeimg-container'>
        <img className="recipeimg" src={img} alt="recipeimage" />
        <h1>{RecipeName}</h1>
        <p>{Description}</p>
        <Link
          to={postId ? `/recipes/${postId}` : '#'}
          className="recipebtn"
          onClick={handleLinkClick}
        >
          Full Recipe
        </Link>
        <p>Preparation time : 30mins</p>
      </div>
      <ToastContainer />
    </article>
  );
};

export default MenuItems;
