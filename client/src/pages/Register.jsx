import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_CONSTANTS } from "../components/API";

const Register = () => {
  const navigate = useNavigate();

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
      axios.post(`${API_CONSTANTS.BASEURL}api/users/register`, values, {
        headers: API_CONSTANTS.headers(),
      })
        .then(response => {
          console.log('Form submitted successfully', response.data);
          // Handle successful registration (e.g., show a success message, redirect to login page, etc.)
          navigate('/login');
        })
        .catch(error => {
          console.error('Error submitting the form', error);
          // Handle error (e.g., show an error message)
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
          <br />
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
          <br />
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
          <br />
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
          <br />
          {formik.errors.password2 && formik.touched.password2 && (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.password2}</p>
          )}
          <button type="submit" className="regbtn">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
