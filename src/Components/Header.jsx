import React, { useContext, useEffect, useState, useRef } from 'react';
import '../Styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRightCircleFill, Newspaper, Sun, Moon, Plus, FileText, BarChart, Chat, HouseDoor } from 'react-bootstrap-icons';
import { ThemeContext } from '../Contexts/ThemeContext';

function Header() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [slider, setSlider] = useState({ isOpen: false, isRotated: false });
    const [data, setData] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            setData(userData);
            if (userData) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Failed to retrieve user data from localStorage:", error);
        }

        const handleClickOutside = (event) => {
            if (sliderRef.current && !sliderRef.current.contains(event.target) && !event.target.closest('.Header-menu')) {
                setSlider({ isOpen: false, isRotated: false });
            }
        };

        const handleScroll = () => {
            if (slider.isOpen) {
                setSlider({ isOpen: false, isRotated: false });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [slider.isOpen]);

    const toggleSlider = () => {
        setSlider((prevState) => ({
            isOpen: !prevState.isOpen,
            isRotated: !prevState.isRotated,
        }));
    };

    const navigateTo = (path) => {
        try {
            navigate(path);
            setSlider({ isOpen: false, isRotated: false });
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    const SignOut = () => {
        try {
            setIsLoggedIn(false);
            localStorage.removeItem('user');
            navigateTo('/');
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

    return (
        <>
            <div className='Header'>
                <div className='Header-container-left'>
                    <div className='Header-contaier-left-company'>
                        {isLoggedIn ? (
                            <div
                                className={`Header-menu bi bi-list ${slider.isRotated ? 'rotated' : ''}`}
                                onClick={toggleSlider}
                            />
                        ) : null}
                        <h1 onClick={()=>navigate('/')}>BLOG</h1>
                    </div>
                </div>
                {/* {location.pathname !== '/' && location.pathname !== '/NewPost' && (
                    <div className="Header-container-center">
                        <div className="input-with-icon">
                            <i className="btn bi bi-search search-icon"></i>
                            <input
                                className="form-control rounded-0 py-2 searchbar"
                                type="search"
                                placeholder="Search Posts"
                                id="search-input"
                            />
                        </div>
                    </div>
                )} */}
                <div className='Header-container-right'>
                    <button onClick={toggleTheme}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className='Header-container'>
                        <div className='Header-container-right-button'>
                            {!isLoggedIn ? (
                                <div className="dropdown Dropdown-Profile">
                                    <a
                                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                        id="dropdownAuth"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <span>Account</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownAuth">
                                        <li>
                                            <a className="dropdown-item" onClick={() => navigateTo('/Login')}>SIGN IN</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={() => navigateTo('/Register')}>SIGN UP</a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className='Header-container-right-button-profile '>
                                    <div className="dropdown Dropdown-Profile">
                                        <a
                                            className="d-flex align-items-center  text-white text-decoration-none dropdown-toggle"
                                            id="ProfileUser"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img src={data.profilePic} alt="User Avatar" width="30" height="30" className="rounded-circle" />
                                            <span className="d-none d-sm-inline mx-1">{data.firstName + " " + data.lastName}</span>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="ProfileUser">
                                            <li><a className="dropdown-item" onClick={()=>navigate('/Profile')}>Profile</a></li>
                                            <li><a className="dropdown-item" onClick={SignOut}>Sign out</a></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isLoggedIn ? (
                <>
                    {slider.isOpen && <div className="slider-overlay" onClick={toggleSlider}></div>}
                    <div className={`slider`} ref={sliderRef}>
                        <div className={`slider-content ${slider.isOpen ? 'open' : ''}`}>
                            <button
                                className={`slider-btn-new-post ${location.pathname === '/NewPost' ? 'active' : ''}`}
                                onClick={() => navigateTo('/NewPost')}
                            >
                                <Plus /> NEW POST
                            </button>
                            <hr className="divider" />
                            <button
                                className={`slider-btn ${location.pathname === '/' ? 'active' : ''}`}
                                onClick={() => navigateTo('/')}
                            >
                                <HouseDoor /> Home
                            </button>
                            <button
                                className={`slider-btn ${location.pathname === '/Posts' ? 'active' : ''}`}
                                onClick={() => navigateTo('/Posts')}
                            >
                                <FileText /> Post
                            </button>
                            <button
                                className={`slider-btn ${location.pathname === '/Statistics' ? 'active' : ''}`}
                                onClick={() => navigateTo('/Statistics')}
                            >
                                <BarChart /> Stats
                            </button>
                            {/*<button
                                className={slider-btn ${location.pathname === '/Comments' ? 'active' : ''}}
                                onClick={() => navigateTo('/Comments')}
                            >
                                <Chat /> Comments
                            </button> */}
                            <button
                                className={`slider-btn ${location.pathname === '/ViewBlog' ? 'active' : ''}`}
                                onClick={() => navigateTo('/ViewBlog')}
                            >
                                <Newspaper /> View Blog
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default Header;
