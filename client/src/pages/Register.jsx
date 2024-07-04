import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [userData , setUserData] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',
      })
      const changeInputValue = (e) =>{
        setUserData(prevState => {
            return {...prevState, [e.target.name] : e.target.value}
        })

      }
  return (
    <section className="register-main">
    <div className="reg-sub">
      <h2>
            Sign up
      </h2>
      <form classNaame="reg-form">
        <p className="error-msg">This is an error message</p>
        <input type="text" placeholder='Full Name' name='name' value={userData.name} onchange={changeInputValue}></input><br/>
        <input type="text" placeholder='Email' name='email' value={userData.email} onchange={changeInputValue}></input><br/>
        <input type="password" placeholder='Password' name='password' value={userData.password} onchange={changeInputValue}></input><br/>
        <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onchange={changeInputValue}></input><br/>
        <button type='submit' className='regbtn'>Register</button>
      </form>
      <small>Already have an account? <Link to='/login'>Login</Link></small>
    </div>
</section>
  )
}

export default Register