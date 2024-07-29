import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_CONSTANTS } from "../components/API";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      axios.post(`${API_CONSTANTS.BASEURL}api/users/register`, values, {
        headers: API_CONSTANTS.headers(),
      })
        .then(response => {
          console.log('Form submitted successfully', response.data);
          setIsLoading(false);
          // Store email in localStorage
          localStorage.setItem('verificationEmail', values.email);
          // Show success toast
          toast.success('Registration successful. Please check your email to verify your account.');
          navigate('/verify-otp');
        })
        .catch(error => {
          console.error('Error submitting the form', error);
          toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  return (
    <section className="register-main">
      <div className="reg-sub">
        <h2>Sign up</h2>
        <form className="reg-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.name}</p>
          )}
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.errors.password2 && formik.touched.password2 && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.password2}</p>
          )}
          <button type="submit" className="regbtn" disabled={isLoading}>
            {isLoading ? <Oval height={20} width={20} color="#fff" ariaLabel="loading" /> : 'Register'}
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;