import React, { useState, useEffect } from 'react';
import '../Styles/BlogPost.css';
import { useNavigate } from 'react-router-dom';
import { GetBlogPosts } from '../Service/ApiService';
import Spinner from '../Components/Spinner';
import { useToast } from '../Contexts/ToastContext';

const BlogPosts = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const user = JSON.parse(localStorage.getItem("user")) || '';
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userId = user?.uid || '';
                const response = await GetBlogPosts(userId, currentPage, postsPerPage);

                if (response.status === 'success') {
                    setPosts(response.data);
                    setTotalPages(response.totalPages || 1);
                } else {
                    showToast(response.message, response.status);
                    navigate('/');
                }
            } catch (error) {
                showToast('Failed to fetch posts', 'Error');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const NavigatePost = (id) => {
        navigate('/BlogPostView', { state: { id } });
    };

    const ContentWrap = (content, length = 50) => {
        if (content.length <= length) return content;
        return content.slice(0, length) + '...';
    };

    const pagePagination = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className='Body-common'>
            <div className="container">
                <div className='Blog-post-container'>
                    <h3 className="p-2 mb-3">Recent blog posts</h3>
                    <div className="row">
                        {posts.length > 0 ? (
                            <>
                                <div className="col-lg-8">
                                    <div className="card Blog-post-card border-0" onClick={() => NavigatePost(posts[0].id)}>
                                        <img src={posts[0].image} className="card-img-Large" alt="Blog Image" />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className='d-flex align-items-center'>
                                                    <span className="badge me-2 bg-warning">{posts[0].category}</span>
                                                    <small>{new Date(posts[0].publishedDate).toLocaleDateString()}</small>
                                                </div>
                                                <div className='d-flex like-comment-button justify-content-end'>
                                                <button className="btn bi bi-chat-heart"></button>
                                                <button className="btn bi bi-heart"></button>
                                                </div>
                                            </div>
                                            <h5 className="card-title mt-2 fw-bold">{posts[0].title}</h5>
                                            <p className="card-text">{ContentWrap(posts[0].content, 30)}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="row">
                                        {posts.slice(1, 3).map((post, index) => (
                                            <div className="col-12 mb-4" key={index} >
                                                <div className="card Blog-post-card border-0" onClick={() => NavigatePost(post.id)}>
                                                    <img src={post.image} className="card-img-top" alt="Blog Image" />
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                                            <div>
                                                                <span className="badge bg-info me-2">{post.category}</span>
                                                                <small>{new Date(post.publishedDate).toLocaleDateString()}</small>
                                                            </div>
                                                            <div className="d-flex like-comment-button justify-content-end">
                                                                <button className="btn bi bi-chat-heart"></button>
                                                                <button className="btn bi bi-heart"></button>
                                                            </div>
                                                        </div>
                                                        <h6 className="card-title mt-2 fw-bold">{post.title}</h6>
                                                        <p className="card-text">{ContentWrap(post.content, 30)}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="col-12">
                                <div className="alert alert-info text-center">No posts found.</div>
                            </div>
                        )}
                    </div>

                    <div className="row mt-2">
                        {posts.slice(3).map((post, index) => (
                            <div className="col-12 mb-4" key={index}>
                                <div className="card Blog-post-card border-0" onClick={() => NavigatePost(post.id)}>
                                    <img src={post.image} className="card-img-Large" alt="Blog Image" />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <span className="badge bg-danger me-2">{post.category}</span>
                                                <small>{new Date(post.publishedDate).toLocaleDateString()}</small>
                                            </div>
                                            <div className='d-flex like-comment-button justify-content-end'>
                                                <button className="btn bi bi-chat-heart"></button>
                                                <button className="btn bi bi-heart"></button>

                                            </div>
                                        </div>

                                        <h5 className="card-title mt-2">{post.title}</h5>
                                        <p className="card-text">{ContentWrap(post.content, 30)}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => pagePagination(currentPage - 1)}>Previous</button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => pagePagination(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => pagePagination(currentPage + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPosts;
