import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Contexts/ToastContext';
import { loginUser } from '../Service/ApiService';
function Login() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    // const apiUrl = process.env.REACT_APP_API_BASE_URL;
    // console.log(apiUrl);

    const formChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const userData = await loginUser(formData.email, formData.password);
            console.log('Login successful:', userData);

            if (userData.status == 'success') {
                localStorage.setItem('user', JSON.stringify(userData.user));
                navigate('/Posts');
                showToast(userData.message, userData.status);

            } else {
                showToast(userData.message, userData.status);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            showToast('An error occurred while logging in. Please try again.', 'Error');
            navigate('/');

        }
    };

    return (
        <div className='Container-data'>
            <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
                <div
                    className='p-4 p-md-5 text-center container-Register'
                    style={{ width: '100%', maxWidth: '500px', transition: 'transform 0.3s ease' }}
                >
                    <h3 className='mb-5'>LOGIN<span style={{ color: '#1f90f8' }}>..</span></h3>

                    <form onSubmit={submit}>
                        <div className='mb-3 w-100'>
                            <div className='form-floating'>
                                <input
                                    type='email'
                                    name='email'
                                    className='form-control'
                                    placeholder='Enter Email'
                                    id='email'
                                    value={formData.email}
                                    onChange={formChange}
                                    required
                                />
                                <label htmlFor='email' className='form-label'>Email</label>
                            </div>
                        </div>

                        <div className='mb-3 w-100'>
                            <div className='form-floating'>
                                <input
                                    type='password'
                                    name='password'
                                    className='form-control'
                                    placeholder='Enter Password'
                                    id='Password'
                                    value={formData.password}
                                    onChange={formChange}
                                    required
                                />
                                <label htmlFor='Password' className='form-label'>Password</label>
                            </div>
                        </div>

                        <div className='col-12 mt-4'>
                            <button type='submit' className='w-50 Register-Button'>Submit</button>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Don't have an account? </span>
                            <a onClick={() => navigate('/Register')} className='login-button'>Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
