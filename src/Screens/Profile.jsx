import React, { useState, useEffect } from 'react';
import '../Styles/Profile.css';
import { UpdateProfile } from '../Service/ApiService';
import { useToast } from '../Contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
function Profile() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        phone: '',
        email: '',

    });

    useEffect(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem('user'));
            if (storedData) {
                setProfile(storedData);
            }
        }
        catch {
            console.log("no Data found in Local Storage");
        }
    }, []);


    const SaveClick = async () => {
        setLoading(true);

        try {
            const response = await UpdateProfile(profile);

            if (response.status === 'success') {
                showToast(response.message, response.status);
                localStorage.setItem('user', JSON.stringify(profile));
                setIsEditing(false);
                navigate('/');
            } else {
                showToast(response.message, response.status);
                navigate('/');

            }
        } catch (error) {
            console.error('Error updating profile:', error);
            showToast('An error occurred while updating your profile', 'error');
            navigate('/');

        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='Body-common'>
            <div className='container card profile-container'>
                <div className='row'>
                    <div className='cover-image col-12'>
                        <img
                            src={profile.coverPic}
                            className='w-100 img-fluid'
                            alt="Cover"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                <div className='container profile-container mt-3'>
                    <div className='row'>
                        <div className='d-flex flex-row align-items-center '>
                            <div className='profile-image p-2'>
                                <img
                                    src={profile.profilePic}
                                    alt="Profile"
                                    className="img-fluid rounded-circle"
                                    style={{ height: '90px', objectFit: 'cover' }}

                                />
                            </div>
                            <div className='d-flex flex-column justify-content-center flex-grow-1 p-2 '>
                                <p className="mb-0" style={{ fontSize: '1.2rem' }}>{profile.firstName}</p>
                                <p className="mb-0 " style={{ fontSize: '0.9rem' }}>{profile.email}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='container profile-container mt-3 create-data-container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3 '>
                            <label htmlFor="FirstName" className="form-label" style={{ fontSize: '0.9rem' }}>First Name</label>
                            <input
                                type="text"
                                className='form-control'
                                value={profile.firstName}
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                disabled={!isEditing}
                                maxLength={30}
                                minLength={5}
                            />
                        </div>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="LastName" className="form-label" style={{ fontSize: '0.9rem' }}>Last Name</label>
                            <input
                                type="text"
                                className='form-control'
                                value={profile.lastName}
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                disabled={!isEditing}
                                maxLength={20}
                                minLength={5}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="blogTitle" className="form-label" style={{ fontSize: '0.9rem' }}>Blog Title</label>
                            <input
                                type="text"
                                className='form-control'
                                value={profile.blogTitle}
                                onChange={(e) => setProfile({ ...profile, blogTitle: e.target.value })}
                                disabled={!isEditing}
                                minLength={5}
                                maxLength={30}
                            />
                        </div>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="blogDescription" className="form-label" style={{ fontSize: '0.9rem' }}>Blog Description</label>
                            <input
                                type="text"
                                className='form-control'
                                value={profile.blogDescription}
                                onChange={(e) => setProfile({ ...profile, blogDescription: e.target.value })}
                                disabled={!isEditing}
                                minLength={10}
                                maxLength={100}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="blogUrl" className="form-label" style={{ fontSize: '0.9rem' }}>Blog URL</label>
                            <input
                                type="text"
                                className='form-control'
                                value={profile.blogUrl}
                                onChange={(e) => setProfile({ ...profile, blogURL: e.target.value })}
                                disabled={!isEditing}
                                maxLength={50}
                            />
                        </div>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="phone" className="form-label" style={{ fontSize: '0.9rem' }}>Phone</label>
                            <input
                                type="text"
                                className={`form-control ${profile.phone && profile.phone.length !== 10 ? 'is-invalid' : ''}`}
                                value={profile.phone}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    // Only update if it starts with a valid digit (7, 8, or 9) or is empty
                                    if (numericValue === '' || /^[789]/.test(numericValue)) {
                                        setProfile({ ...profile, phone: numericValue });
                                    }
                                }}
                                disabled={!isEditing}
                                minLength={10}
                                maxLength={10}
                            />
                            {/* Validation message */}
                            {profile.phone && profile.phone.length !== 10 && (
                                <div className="invalid-feedback">
                                    Please enter a valid mobile number (10 digits, starting with 7, 8, or 9).
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6 d-flex flex-column justify-content-center align-items-flex-start mb-3'>
                            <label htmlFor="email" className="form-label" style={{ fontSize: '0.9rem' }}>Gmail</label>
                            <input
                                type="text"
                                className={`form-control ${!isEditing ? 'disabled' : ''} ${!profile.email.endsWith('@gmail.com') && profile.email.length > 0 ? 'is-invalid' : ''}`}
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                disabled={!isEditing}
                            />
                            {!profile.email.endsWith('@gmail.com') && profile.email.length > 0 && (
                                <div className="invalid-feedback">
                                    Please enter a valid Gmail address (must end with @gmail.com).
                                </div>
                            )}
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-12 d-flex justify-content-end mb-3 Edit-button'>
                            {isEditing ? (
                                <button type="button" onClick={SaveClick}>
                                    Save
                                </button>
                            ) : (
                                <button type="button" onClick={() => { setIsEditing(true) }}>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
