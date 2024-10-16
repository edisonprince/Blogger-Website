import React, { useContext } from 'react';
import '../Styles/Home.css';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Contexts/ThemeContext';
function Home() {
    const user = JSON.parse(localStorage.getItem('user'));;
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '60px' }}>

            <div className="travel-landing-page">
                <div className="container-fluid main-section d-flex align-items-center">
                    <div className="container text-white">
                        <div className="row container-data">
                            <div className="travel-landing-page-data col-lg-6">
                                <p className="lead mb-1">EXPLORE YOU IN THE WORLD</p>
                                <h1 className="display-3 fw-bold">
                                    Where your <br />
                                    <span className="highlight-text">JOURNEY</span> <br />
                                    Started.
                                </h1>
                                <p className="lead mt-4">
                                    Ready to explore more? Subscribe and follow our vlog for weekly updates, travel tips, and epic
                                    adventures that will make you want to pack your bags!
                                </p>

                                {user ? (
                                    <div className='travel-landing-page-button-create-post mt-4 mb-4'>

                                        <button type="button" onClick={() => navigate('/NewPost')}>Create your Post</button>
                                        <button type="button" onClick={() => navigate('/ViewBlog')}>View Own Blog's</button>

                                    </div>
                                ) : (

                                    <div className='travel-landing-page-button mt-4 mb-4'>

                                        <button type="button" onClick={() => navigate('/Login')}>Sign In</button>
                                        <button type="button" onClick={() => navigate('/Register')}>Sign Up</button>
                                        <button type="button" onClick={() => navigate('/ViewBlog')}>Explore Blog's</button>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6 d-flex justify-content-center align-items-center travel-landing-page-image">
                                {isDarkMode ? (
                                    <img
                                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjn-83T8GNz1osgnAXkxm4VqIghPsFyi7xSV9DkpFk9W4vuBBtLfBKw-QkeWGt2D9IQu6ABWtT_hddpOoeEDRFxGj-8nb3RGcyxY9ILLDdewPqeXiNPfuXUO5UWTiCg1XnYWcB-G-GgnGed3EhyphenhyphenhReldYPHc5XJcssvGzBsX_kgeKm8UGsrrwkXdH2Yj3i/s500/Blogging%20%281%29.gif"
                                        alt="content-cuate"
                                        className="img-fluid travel-landing-page-image"
                                    />
                                ) : (
                                    <img
                                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyZM0OEkLcGXB_7uBLr7jF7XOtSinUxq9W-OHPCn_I1_3UnmzYTru9fNhyNuJ9S8IdNG2LMUvwGqB7Jj_FrUNGIV3tQ_0Vz5Xwq7toL1y-0N_B0qhU_MswFj5e7Y1DWxZS8h09FrZBfSRSeOhrgPyUNWqBzPa8Qrokc_zsn6V6f7CgjtiJzjUO19qWAXBC/s500/Content%20%281%29.gif"
                                        alt="content-cuate"
                                        className="img-fluid"
                                    />
                                )}
                            </div>
                        </div>
                        <div id="carousalCaptions" className="carousel slide carousal-slider-image" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carousalCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carousalCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carousalCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://www.blogger.com/about/img/social/facebook-1200x630.jpg" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Explore the World of Blogging</h5>
                                        <p>Unlock your potential as a blogger and share your unique voice with the world. Whether you're a seasoned writer or just starting, explore tips and insights to create compelling content that captivates your audience.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-1280x720.png" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Build Your Online Presence</h5>
                                        <p>Learn the secrets to growing your blog's reach and building a loyal readership. Discover the best practices for SEO, social media engagement, and creating posts that resonate with your community.</p>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/How_To_Start_A_Blog_-_article_image.jpg" className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Join a Thriving Community</h5>
                                        <p>Connect with like-minded bloggers and become a part of a vibrant community. Share your stories, exchange ideas, and gain inspiration from other creative voices, all while building your personal brand.</p>
                                    </div>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carousalCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carousalCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className=" py-5 travel-landing-page">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-6 order-lg-2 text-container">
                                    <h2 className="text-uppercase mb-3 highlight-text">Explore Beyond Boundaries</h2>
                                    <h1 className="display-4 mb-4 fw-bold">
                                        Experience the World’s <span className="highlight-text">Hidden Wonders</span>
                                    </h1>
                                    <p className="lead mb-4">
                                        Join a community of passionate travelers who seek more than just destinations—they seek life-changing experiences.
                                        Share your journey, inspire others, and discover stories that will move you.
                                    </p>

                                    {user ? (
                                        <div className="travel-landing-page-button-create-post mt-4 mb-3">
                                            <button className=" me-3 px-4" onClick={() => navigate('/NewPost')}>
                                                Share Your Story
                                            </button>
                                            <button className=" px-4" onClick={() => navigate('/ViewBlog')}>
                                                Explore Stories
                                            </button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                                <div className="col-lg-6 order-lg-1 d-flex justify-content-center position-relative image-container">
                                    <div className="image-frame p-3">
                                        <img
                                            src={isDarkMode ? "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIeSvAP-r7PejDH8JXHX0uxFYIc8OO7pzCc26c7I4PhgAGYsqgdpLjdzeDzuN-3OChwOO7ZcZX8pZUCqEkQmD0QnjLTvmYOSD3_pczVbA3dtPG-SLOOaMnxDV2GAW0xUXvo-1NQOzSgc8mkRKXVT7qif5imVdR1aDKFtqW0gyta2PCV4ffqQC0pHuQNrZ-/s800/Gen%20Z.gif"
                                                : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2i1x7XDekizCllJl6V7L0y_jc-eq-4blCq3MgQKyk0Ke54GsiDYhhZHqGo_UxAXnO63_8pouJl78YhwxSbOWbXuyDdG370lMwfFvwwYua4UqJaFD5ZfBwPIDFv4aI-Ru7TRAhkZ-gNb4Cwwuq7taMhXmhRr3ijhS0hhTKRlC0s6PhAylz2PraBdHmBPVC/s800/Image%20post.gif"}
                                            alt="travel-explore"
                                            className="img-fluid rounded shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default Home