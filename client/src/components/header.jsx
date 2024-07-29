import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../images/logo2.jpg';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is in localStorage
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // Listen for custom login/logout events
    const handleAuthChange = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('login', handleAuthChange);
    window.addEventListener('logout', handleAuthChange);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('login', handleAuthChange);
      window.removeEventListener('logout', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Dispatch custom logout event
    window.dispatchEvent(new Event('logout'));
    // Display a toast notification
    toast.info('Logged out successfully');
    // Update state
    setIsLoggedIn(false);
    // Redirect to home page
    navigate('/');
    // Force refresh the page
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <nav className='main-nav'>
        <div className='nav-container1'>
          <img src={Logo} alt="logoimg" />
          <h1 className='title'>Pinch of Taste</h1>
        </div>
        <div className='nav-container2'>
          <ul className='flexlist'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/createrecipe">Create Recipe</Link></li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer' }}>Logout</button>
              </li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
