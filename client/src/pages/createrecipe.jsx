import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { API_CONSTANTS } from '../components/API'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner'; // Importing the loader

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      Ingredients: '',
      directions: '',
      thumbnail: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      Ingredients: Yup.string().required('Ingredients are required'),
      directions: Yup.string().required('Directions are required'),
      thumbnail: Yup.mixed().required('A thumbnail image is required')
    }),
    onSubmit: (values) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('Ingredients', values.Ingredients)
      formData.append('directions', values.directions)
      formData.append('thumbnail', values.thumbnail)

      const token = JSON.parse(localStorage.getItem('user')).token;
      axios.post(`${API_CONSTANTS.BASEURL}api/recipes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          console.log('Recipe created successfully', response.data)
          // Handle success (e.g., show a success message, redirect to another page, etc.)
          navigate('/');
          toast.success(response.data.message);
        })
        .catch(error => {
          console.error('Error creating recipe', error)
          if (error.response && error.response.status === 403) {
            toast.error("Please login first.");
          } else {
            // Default error message handling
            toast.error(error.response.data.message);
          }
          // Handle error (e.g., show an error message)
        })
    }
  })

  return (
    <section className="create-recipe">
      <div className="recipe-container">
        <h2>Create Recipe</h2>
        <form className="main-createrecipe" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            className="rectitle"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.title}</p>
          ) : null}
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.description}</p>
          ) : null}
          <textarea
            type="text"
            placeholder="Ingredients"
            name="Ingredients"
            value={formik.values.Ingredients}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.touched.Ingredients && formik.errors.Ingredients ? (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.Ingredients}</p>
          ) : null}
          <textarea
            type="text"
            placeholder="Directions"
            name="directions"
            value={formik.values.directions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px' }}
          />
          {formik.touched.directions && formik.errors.directions ? (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.directions}</p>
          ) : null}
          <input
            className="file"
            type="file"
            onChange={(e) => formik.setFieldValue('thumbnail', e.currentTarget.files[0])}
            accept="image/png, image/jpg, image/jpeg"
            style={{ padding: '10px' }}
          />
          {formik.touched.thumbnail && formik.errors.thumbnail ? (
            <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.thumbnail}</p>
          ) : null}
          <br />
          <button type="submit" className="createrecipe">Create Recipe</button><br />
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}

export default CreateRecipe
