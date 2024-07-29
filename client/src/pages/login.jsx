import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_CONSTANTS } from '../components/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios.post(`${API_CONSTANTS.BASEURL}api/users/login`, values, {
        headers: API_CONSTANTS.headers(),
      })
        .then(response => {
          console.log('Form submitted successfully', response.data);
          // Store user data in local storage
          localStorage.setItem('user', JSON.stringify(response.data));
          // Dispatch custom login event
          window.dispatchEvent(new Event('login'));
          setIsLoading(false);
          // Redirect to home page
          navigate('/');
        })
        .catch(error => {
          console.error('Error submitting the form', error);
          // Show error toast message
          toast.error(error.response.data.message);
          setIsLoading(false);
        });
    }
  });

  return (
    <section className="log-main">
      <div className="log-sub">
        <h2>Login</h2>
        <form className="log-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.password}</p>
          )}
          <button type="submit" className="regbtn">
            {isLoading ? <Oval height={20} width={20} color="#fff" ariaLabel="loading" /> : "Login"}
          </button>
        </form>
        <small>Don't have an account? <Link to="/signup">Sign up</Link></small>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
