import React, { useState } from 'react';
import '../Styles/Register.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '../Contexts/ToastContext';
import { RegisterUser } from '../Service/ApiService';

function Register() {
    const { showToast } = useToast();

    const navigate = useNavigate();
    const [tab, setTab] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [formData, setFormData] = useState({
        blogTitle: '',
        blogDescription: '',
        blogURL: '',
        phone: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
    });
    const [error, setError] = useState('');

    const inputChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // const checkExistingUser = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/users");
    //         const userData = await response.json();

    //         const { email, phone, blogTitle } = formData;
    //         const isEmailExist = userData.some(user => user.email === email);
    //         const isPhoneExist = userData.some(user => user.phone === phone);
    //         const isBlogTitleExist = userData.some(user => user.blogTitle === blogTitle);

    //         if (isEmailExist || isPhoneExist || isBlogTitleExist) {
    //             let errorMessage = 'Error: ';
    //             if (isEmailExist) errorMessage += 'Email already exists. ';
    //             if (isPhoneExist) errorMessage += 'Phone number already exists. ';
    //             if (isBlogTitleExist) errorMessage += 'Blog title already exists. ';
    //             setError(errorMessage);
    //             return false;
    //         }
    //         setError('');
    //         return true;
    //     } catch (error) {
    //         console.error("Error checking existing user:", error);
    //         setError('Failed to validate user data. Please try again.');
    //         return false;
    //     }
    // };

    const validateFields = (fields) => {
        for (let field of fields) {
            const { value, minLength = 0, message } = field;
            if (!value.trim() || (minLength && value.length < minLength)) {
                setError(message);
                return false;
            }
        }
        setError('');
        return true;
    };

    const handleNext = () => {
        const fieldsToValidate = [
            { value: formData.firstName, message: "First Name is required." },
            { value: formData.lastName, message: "Last Name is required." },
            { value: formData.phone, minLength: 10, message: "Please enter a valid 10-digit phone number." },
            { value: formData.email, message: "Email is required." },
            { value: formData.password, minLength: 6, message: "Password must be at least 6 characters." }
        ];

        if (!validateFields(fieldsToValidate)) {
            return;
        }

        setRotation(-90);
        setTimeout(() => {
            setTab(prevStep => prevStep + 1);
            setRotation(0);
        }, 300);
    };

    const handlePrev = () => {
        setRotation(90);
        setTimeout(() => {
            setTab(prevStep => prevStep - 1);
            setRotation(0);
        }, 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = [
            { value: formData.blogTitle, message: "Blog Title is required." },
            { value: formData.blogDescription, message: "Blog Description is required." },
            { value: formData.blogURL, message: "Blog URL is required." }
        ];

        if (!validateFields(fieldsToValidate)) {
            return;
        }

        const userdata = {
            uid: uuidv4(),
            ...formData,
            isActive: true,
            status: true,
            profilePic: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
            coverPic: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg',
            followers: 0,
            following: 0,
            posts: 0,
            comments: 0,
            likes: 0,
            views: 0,
            createdDate: new Date().toISOString()
        };

        try {
            const response = await RegisterUser(userdata)

            if (response.status === 'success') {
                navigate('/Login');
                showToast(response.message, response.status);

            } else {
                showToast(response.message, response.status);

            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Failed to submit the data. Please try again.');
            showToast('Failed to submit the data. Please try again.', 'Error');
            navigate('/');

        }
    };
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
            <div
                className={`p-4 p-md-5     container-Register ${rotation ? (rotation < 0 ? 'rotate-left' : 'rotate-right') : ''}`}
                style={{ width: '100%', maxWidth: '500px', transition: 'transform 0.3s ease' }}
            >
                <form className='w-100' onSubmit={handleSubmit}>
                    {tab === 1 && (
                        <>
                            <div className='d-flex'>
                                <h2>Create your blog account<span style={{ color: '#1f90f8' }}>..</span></h2>
                            </div>
                            <div className='d-flex mb-3'>
                                <span>Already Have an account <span className='login-button' onClick={() => navigate('/Login')}>Sign In</span></span>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                                    <div className='form-floating'>
                                        <input
                                            type='text'
                                            name='firstName'
                                            className='form-control'
                                            placeholder='First Name'
                                            id='firstName'
                                            value={formData.firstName}
                                            onChange={inputChangeValue}
                                            required
                                        />
                                        <label htmlFor='firstName' className='form-label custom-label'>First Name</label>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 mb-md-0'>
                                    <div className='form-floating'>
                                        <input
                                            type='text'
                                            name='lastName'
                                            className='form-control'
                                            placeholder='Last Name'
                                            id='lastName'
                                            value={formData.lastName}
                                            onChange={inputChangeValue}
                                            required
                                        />
                                        <label htmlFor='lastName' className='form-label'>Last Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        type='text'
                                        name='phone'
                                        className='form-control'
                                        placeholder='Mobile Number'
                                        id='phone'
                                        value={formData.phone}
                                        onChange={inputChangeValue}
                                        maxLength={10}
                                        required
                                    />
                                    <label htmlFor='phone' className='form-label'>Mobile Number</label>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        placeholder='Email'
                                        id='email'
                                        value={formData.email}
                                        onChange={inputChangeValue}
                                        required
                                    />
                                    <label htmlFor='email' className='form-label'>Email</label>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        id='password'
                                        placeholder='Password'
                                        value={formData.password}
                                        onChange={inputChangeValue}
                                        required
                                    />
                                    <label htmlFor='password' className='form-label'>Password</label>
                                </div>
                            </div>
                            {error && <div className="text-danger mb-3">{error}</div>}

                            <div className='w-100 d-flex flex-column justify-content-end align-items-end'>
                                <button type='button' className='w-50 Register-Button' onClick={handleNext}>Next</button>

                            </div>
                        </>
                    )}
                    {tab === 2 && (
                        <>
                            <div className='d-flex mb-3'>
                                <h3>Choose your blog Detail<span style={{ color: '#1f90f8' }}>..</span></h3>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        type='text'
                                        name='blogTitle'
                                        className='form-control'
                                        placeholder='Blog Title'
                                        id='blogTitle'
                                        value={formData.blogTitle}
                                        onChange={inputChangeValue}
                                        maxLength={50}
                                        required
                                    />
                                    <label htmlFor='blogTitle' className='form-label'>Blog Title</label>
                                    <span style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '14px', color: '#aaa' }}>
                                        {formData.blogTitle.length}/{50}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        className='form-control'
                                        placeholder='Blog Description'
                                        id='blogDescription'
                                        value={formData.blogDescription}
                                        name='blogDescription'

                                        maxLength={100}
                                        onChange={inputChangeValue}

                                        required
                                    />
                                    <label htmlFor='blogDescription' className='form-label'>Blog Description</label>
                                    <span style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '14px', color: '#aaa' }}>
                                        {formData.blogDescription.length}/{100}
                                    </span>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className='form-floating'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Blog URL'
                                        id='BlogURL'
                                        name='blogURL'

                                        value={formData.blogURL}

                                        onChange={inputChangeValue}

                                        required
                                    />
                                    <label htmlFor='BlogURL' className='form-label'>Blog URL</label>
                                </div>
                            </div>
                            {error && <div className="text-danger mb-3">{error}</div>}
                            <div className='row'>
                                <div className='col-6'>
                                    <button type='button' className=' w-100 Register-Button-prev' onClick={handlePrev}>Prev</button>

                                </div>
                                <div className='col-6'>
                                    <button type='submit' className=' w-100  Register-Button' onClick={handleSubmit}>Submit</button>

                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Register;
