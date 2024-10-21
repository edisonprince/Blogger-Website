import React, { useEffect, useState } from 'react';
import '../Styles/BlogPostView.css';
import Spinner from '../Components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommentPost, GetBlogPostView } from '../Service/ApiService';
import { useToast } from '../Contexts/ToastContext';

function BlogPostView() {
    const { showToast } = useToast();
    const user = JSON.parse(localStorage.getItem('user')) || '';
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id || null;
    console.log("id from view blog", id);

    const [post, setPost] = useState('');
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        if (!id) {
            navigate('/404');
            return;
        }
        const fetchPost = async () => {
            try {
                const userid = user.uid || '';
                const body = {
                    id: id,
                    userid: userid,
                };

                const response = await GetBlogPostView(body);
                console.log(response);

                if (response.status === 'success') {
                    const data = response;
                    console.log(data.categoryData);
                    console.log(data.postData);
                    console.log(data.postData.comments);

                    setRelatedPosts(data.categoryData.slice(0, 2));
                    setPost(data.postData);
                    setFirstName(data.firstName);
                    
                    setComments(data.postData.comments || []);
                }
            } catch (error) {
                console.error('Error fetching the post:', error);
                navigate('/');
                setLoading(false);
                showToast('An error occurred while fetching the post', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, []);

    const commentSubmit = async (e) => {
        e.preventDefault();
    
        if (newComment.trim()) {
            const commentData = {
                postId: post.id,
                uid: user.uid || 'Anonymous', 
                commentText: newComment,
            };
    
            try {
                const response = await CommentPost(commentData.postId, commentData.uid, commentData.commentText);
    
                if (response.status === "success") {
  
                    setComments([...comments, {
                        id: response.commentId, 
                        userName: user.firstName || 'Anonymous',
                        content: newComment,
                        createdDate: new Date().toLocaleString(),
                    }]);
                    setNewComment('');
                    showToast(response.message, 'success');
                } else {
                    showToast(response.message || 'Failed to add comment', 'error');
                }
            } catch (error) {
                console.error("Error submitting comment:", error);
                showToast('Failed to add comment', 'error');
            }
        } else {
            showToast('Comment cannot be empty', 'error');
        }
    };
    

    const ImageModal = (image) => {
        setImageUrl(image);
        setShowModal(true);
    };

    const CardClick = (relatedPost) => {
        setPost(relatedPost);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const ContentWrap = (content, length = 50) => {
        if (content.length <= length) return content;
        return content.slice(0, length) + '...';
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='Body-common'>
            <div className="container blog-post-container p-2">
                <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary me-2">{post.category}</span>
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                </div>
                <h1 className="fw-bold">{post.title}</h1>

                <div className="blog-image-2">
                    <img
                        src={post.image}
                        alt="Blog post"
                        className="img-fluid w-100"
                        onClick={() => ImageModal(post.image)}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <div className="container  mt-3">
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="mb-1">Created by</p>
                                    <h5 className='responsive-text'>{firstName || 'Unknown Author'}</h5>
                                </div>
                                <div>
                                    <p className="mb-1">Published on</p>
                                    <h5 className='responsive-text'>{post.publishedDate}</h5>
                                </div>
                            </div>

                            <h3 className="fw-bold">Content :</h3>
                            <p>{post.content}</p>
                            <div className="comments-section mt-5">
                                <h4>Comments</h4>
                                {comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <div key={comment.uid} className="comment mt-3">
                                            <p><strong>{comment.userName}</strong> <span className="text-muted">on {comment.createdAt}</span></p>
                                            <p>{comment.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No comments yet. Be the first to comment!</p>
                                )}

                                <form onSubmit={commentSubmit} className="mt-3">
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                    </div>
                                    <div className='travel-landing-page-button-create-post'>
                                        <button type="submit" className=" mt-2">Post Comment</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4 blog-post-related mb-4">
                            <div className="mt-4 blog-post-related-post">
                                <h5 className="fw-bold">Related Posts</h5>
                                {relatedPosts.length > 0 ? (
                                    relatedPosts.map((relatedPost) => (
                                        <div
                                            className="post-item mt-3 p-3"
                                            style={{ cursor: 'pointer' }}
                                            key={relatedPost.id}
                                            onClick={() => CardClick(relatedPost)}
                                        >
                                            <img src={relatedPost.image} className='img-fluid post-item-image mb-3' alt="" />
                                            <h6 className="mb-1">{relatedPost.title}</h6>
                                            <p>{ContentWrap(relatedPost.content, 50)}</p>
                                            <a className="text-primary">Read More</a>
                                        </div>
                                    ))
                                ) : (
                                    <p>No related posts found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay mt-3" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={imageUrl} alt="Full View" className="full-image" />
                        <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogPostView;
