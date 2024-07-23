import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_CONSTANTS } from '../components/API';

const Login = () => {
  const navigate = useNavigate();

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
      axios.post(`${API_CONSTANTS.BASEURL}api/users/login`, values, {
        headers: API_CONSTANTS.headers(),
      })
        .then(response => {
          console.log('Form submitted successfully', response.data);
          // Store user data in local storage
          localStorage.setItem('user', JSON.stringify(response.data));
          // Redirect to home page
          navigate('/');
        })
        .catch(error => {
          console.error('Error submitting the form', error);
          // Handle error (e.g., show an error message)
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
          /><br />
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
          /><br />
          {formik.errors.password && formik.touched.password && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.password}</p>
          )}
          <button type="submit" className="regbtn">Login</button>
        </form>
        <small>Don't have an account? <Link to="/signup">Sign up</Link></small>
      </div>
    </section>
  );
};

export default Login;
