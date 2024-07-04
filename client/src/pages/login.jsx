import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [userData , setUserData] = useState({
   
    email:'',
    password:''
   
  })
  const changeInputValue = (e) =>{
    setUserData(prevState => {
        return {...prevState, [e.target.name] : e.target.value}
    })
  }

  return (
    <section className="log-main">
    <div className="log-sub">
      <h2>
            Login
      </h2>
      <form classNaame="log-form">
        <p className="error-msg">This is an error message</p>
        
        <input type="text" placeholder='Email' name='email' value={userData.email} onchange={changeInputValue}></input><br/>
        <input type="password" placeholder='Password' name='password' value={userData.password} onchange={changeInputValue}></input><br/>
        
        <button type='submit' className='regbtn'>Login</button>
      </form>
      <small>Don't have an account? <Link to='/signup'>Sign up</Link></small>
    </div>
</section>
    
   
  )
}

export default Login