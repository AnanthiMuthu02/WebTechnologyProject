import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo2.jpg'



const header = () => {
  return (
   <nav className='main-nav'>
     <div className='nav-container1'>
      <img src={Logo} alt="logoimg"></img>
      <h1 className='title'>Pinch of Taste</h1>
      
      
     </div>
     <div className='nav-container2'>
      <ul className='flexlist'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/createrecipe">Create Recipe</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

     </div>
   </nav>
  )
}

export default header