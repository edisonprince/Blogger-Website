import React, { useEffect, useState } from 'react';
import '../Styles/ViewBlog.css';
import Spinner from '../Components/Spinner';
import { Pagination } from 'react-bootstrap';
import NoPostFound from '../Components/NoPostFound';
import { useNavigate } from 'react-router-dom';

function ViewBlog() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredPosts = user ? data.filter(post => post.created.createdBy === user.uid) : data;
      const initializedPosts = filteredPosts.map((post) => ({
        ...post,
        likes: post.likes || 0,
        views: post.views || 0,
      }));

      setPosts(initializedPosts);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };
  const updateData = async (postId, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likeButton = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newLikeCount = post.likes > 0 ? post.likes - 1 : post.likes + 1;
          const updatedPost = { ...post, likes: newLikeCount };
          updateData(postId, updatedPost);
          return updatedPost;
        }
        return post;
      })
    );
  };

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = posts.slice(firstPageIndex, lastPageIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='Body-common'>

      <div className='view-blog container'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-9'>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div className='card blog-card mb-3' key={post.id} onClick={() => navigate('/BlogPostView', { state: { id: post.id } })}>
                  <div className='image-container'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='blog-image'
                    />
                    <div className='responsive-button-container p-2 '>
                      <span className='bi bi-chat comment-button'></span>
                      <span
                        className={`bi ${post.likes > 0 ? 'bi-heart-fill' : 'bi-heart'} like-button`}
                        onClick={() => likeButton(post.id)}
                      ></span>
                    </div>
                    <div className='top-left-wrapper'>
                      <div className='category-container'>
                        <span className='category-name  fw-bold'>
                          Category: {post.category}
                        </span>
                      </div>

                      {/* {post.isPublished && ( */}
                      <div className='date-container'>
                        <span className='post-date'>
                          Publish on: {new Date(post.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                      {/* )} */}
                    </div>

                    <div className='top-right-wrapper'>
                      <div className='top-right-content'>
                        <h3 className='card-title fw-bold'>{post.title}</h3>
                        <p className='card-text'>{post.content}</p>
                      </div>
                    </div>
                    <div className='bottom-left-content'>
                      <button
                        className='bi bi-info-circle-fill info-button'
                        data-toggle='tooltip'
                        data-placement='top'
                        title={post.views}
                      ></button>
                    </div>
                    <div className='bottom-right-content'>
                      <span
                        className={`bi ${post.likes > 0 ? 'bi-heart-fill' : 'bi-heart'} like-button`}
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Like'
                        onClick={() => likeButton(post.id)}
                      ></span>
                      <span
                        className='bi bi-chat comment-button'
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Comment'
                      ></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <NoPostFound />
            )}

            {posts.length > postsPerPage && (
              <div className='d-flex justify-content-center mt-4'>
                <Pagination>
                  <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
