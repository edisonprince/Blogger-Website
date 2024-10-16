import React, { useState, useEffect } from 'react';
import '../Styles/RegisterForm.css';
import { useNavigate, useLocation } from 'react-router-dom';

function RegisterForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};
    const [activeTab, setActiveTab] = useState('personal');
    const today = new Date().toISOString().split('T')[0];
    const [formErrorMgs, setFormErrorMsg] = useState('');

    const tabFun = (tab, event) => {
        try {
            event.preventDefault();
            setActiveTab(tab);
        } catch (error) {
            console.error('Error changing tab:', error);
            setFormErrorMsg('An error occurred while changing the tab.');
        }
    };

    return (
        // <div className="RegisterForm  ">
        //     <h1>REGISTRATION FORM</h1>
        //     <form className='registration-form row bg-dark' onSubmit={submitFun}>
        //         <div className="col-6 ">
        //             <div className=''>
        //                 <div className='d-flex'>
        //                     <h2>Create your blog account<span style={{ color: '#1f90f8' }}>..</span></h2>
        //                 </div>
        //                 <div className='d-flex mb-3'>
        //                     <span>Already Have an account <span style={{ color: '#1f90f8', textDecoration: 'underline', cursor: 'pointer' }}>Sign In</span></span>
        //                 </div>
        //                 <div className='row mb-3'>
        //                     <div className='col-12 col-md-6 mb-3 mb-md-0'>
        //                         <div className='form-floating'>
        //                             <input
        //                                 type='text'
        //                                 name='firstName'
        //                                 className='form-control'
        //                                 placeholder='First Name'
        //                                 id='firstName'
        //                                 required
        //                             />
        //                             <label htmlFor='firstName' className='form-label'>First Name</label>
        //                         </div>
        //                     </div>
        //                     <div className='col-12 col-md-6 mb-md-0'>
        //                         <div className='form-floating'>
        //                             <input
        //                                 type='text'
        //                                 name='lastName'
        //                                 className='form-control'
        //                                 placeholder='Last Name'
        //                                 id='lastName'
        //                                 required
        //                             />
        //                             <label htmlFor='lastName' className='form-label'>Last Name</label>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className='mb-3'>
        //                     <div className='form-floating'>
        //                         <input
        //                             type='text'
        //                             name='phone'
        //                             className='form-control'
        //                             placeholder='Mobile Number'
        //                             id='phone'
        //                             maxLength={10}
        //                             required
        //                         />
        //                         <label htmlFor='phone' className='form-label'>Mobile Number</label>
        //                     </div>
        //                 </div>
        //                 <div className='mb-3'>
        //                     <div className='form-floating'>
        //                         <input
        //                             type='email'
        //                             name='email'
        //                             className='form-control'
        //                             placeholder='Email'
        //                             id='email'
        //                             required
        //                         />
        //                         <label htmlFor='email' className='form-label'>Email</label>
        //                     </div>
        //                 </div>
        //                 <div className='mb-3'>
        //                     <div className='form-floating'>
        //                         <input
        //                             type='password'
        //                             name='password'
        //                             className='form-control'
        //                             id='password'
        //                             placeholder='Password'
        //                             required
        //                         />
        //                         <label htmlFor='password' className='form-label'>Password</label>
        //                     </div>
        //                 </div>

        //                 <div className='w-100 d-flex flex-column justify-content-end align-items-end'>
        //                     <button type='button' className='w-50 Register-Button'>Next</button>

        //                 </div>
        //             </div>
        //         </div>
        //         <div className="RegisterForm-Input-Container-2 col-6 ">
        //             <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Form background" />
        //         </div>
        //     </form>
        // </div>

        // <div className="container-fluid register-page  d-flex align-items-center justify-content-center min-vh-100">
        //     <div className="row register-container shadow-lg rounded">
        //         {/* Form Section */}
        //         <div className="col-md-6 p-5 register-form">
        //             <div className="form-header text-center mb-4">
        //                 <h1 className="h3 mb-3">REGISTRATION FORM</h1>
        //             </div>
        //             <form>
        //                 <div className="form-group mb-3">
        //                     <input type="text" className="form-control" placeholder="Name" required />
        //                 </div>
        //                 <div className="form-group mb-3">
        //                     <input type="email" className="form-control" placeholder="Email" required />
        //                 </div>
        //                 <div className="form-group mb-3">
        //                     <input type="password" className="form-control" placeholder="Password" required />
        //                 </div>
        //                 <div className="form-check mb-3">
        //                     <input type="checkbox" className="form-check-input" id="remember" />
        //                     <label className="form-check-label" htmlFor="remember">Remember Me</label>
        //                 </div>
        //                 <button type="submit" className="btn btn-primary btn-block">Register</button>
        //             </form>
        //             <div className="footer text-center mt-4">
        //                 <span>Already have an account? <a href="#login">Log in</a></span>
        //             </div>
        //         </div>

        //         {/* Image Section */}
        //         <div className="RegisterForm-Input-Container-2 col-6 ">
        //              <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Form background" />
        //       </div>
        //     </div>
        // </div>






        <div className='RegisterForm'>
            <h1>REGISTRATION FORM</h1>

            <div className=' RegisterForm-Container'>
                <form action="">
                    <div className='RegisterForm-Input-Container'>
                        <div className='RegisterForm-Input-Container-1 d-flex justify-content-center align-items-center flex-column p-4 mb-3'>
                            <div className='row mb-3 '>
                                <div className="tabs ">
                                    <button
                                        className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
                                        onClick={(event) => tabFun('personal', event)}
                                    >
                                        Personal Details
                                    </button>
                                    <button
                                        className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
                                        onClick={(event) => tabFun('other', event)}
                                    >
                                        Other Info
                                    </button>

                                </div>
                            </div>

                            <div className='row mb-3 '>
                                <div className='col-12 col-md-6 mb-3 mb-md-0'>
                                    <div className='form-floating'>
                                        <input
                                            type='text'
                                            name='firstName'
                                            className='form-control'
                                            placeholder='First Name'
                                            id='firstName'
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
                                            required
                                        />
                                        <label htmlFor='lastName' className='form-label'>Last Name</label>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3 w-100'>
                                <div className='form-floating'>
                                    <input
                                        type='text'
                                        name='phone'
                                        className='form-control'
                                        placeholder='Mobile Number'
                                        id='phone'
                                        maxLength={10}
                                        required
                                    />
                                    <label htmlFor='phone' className='form-label'>Mobile Number</label>
                                </div>
                            </div>
                            <div className='mb-3 w-100'>
                                <div className='form-floating'>
                                    <input
                                        type='email'
                                        name='email'
                                        className='form-control'
                                        placeholder='Email'
                                        id='email'
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
                                        id='password'
                                        placeholder='Password'
                                        required
                                    />
                                    <label htmlFor='password' className='form-label'>Password</label>
                                </div>
                            </div>
                        </div>
                        <div className='RegisterForm-Input-Container-2'>
                            <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Form background" />

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
