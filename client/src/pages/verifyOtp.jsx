import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_CONSTANTS } from '../components/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('verificationEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            // If email is not found, redirect to registration
            navigate('/register');
        }
        
        // Show toast message when component mounts
        toast.info('Please check your email to verify your account.');
    }, [navigate]);

    const validationSchema = Yup.object({
        otp: Yup.string().required('OTP is required')
    });

    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            axios.post(`${API_CONSTANTS.BASEURL}api/users/verifyotp`, { email, otp: values.otp }, {
                headers: API_CONSTANTS.headers(),
            })
                .then(response => {
                    console.log('OTP verified successfully', response.data);
                    setIsLoading(false);
                    toast.success('Email verified successfully.');
                    localStorage.removeItem('verificationEmail');
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Error verifying OTP', error);
                    toast.error(error.response?.data?.message || 'OTP verification failed. Please try again.');
                    setIsLoading(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    });

    return (
        <section className="log-main">
            <div className="log-sub">
                <h2>Verify OTP</h2>
                <p>An OTP has been sent to: {email}</p>
                <form className="log-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        placeholder="OTP"
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ padding: '10px' }}
                    />
                    {formik.errors.otp && formik.touched.otp && (
                        <p className="error-msg" style={{ color: 'red', fontSize: '12px', lineHeight: '20px' }}>{formik.errors.otp}</p>
                    )}
                    <button type="submit" className="regbtn" disabled={isLoading}>
                        {isLoading ? <Oval height={20} width={20} color="#fff" ariaLabel="loading" /> : "Verify"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </section>
    );
};

export default VerifyOtp;