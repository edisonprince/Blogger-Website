import React, { useEffect, useState } from 'react';
import '../Styles/Posts.css';
import Spinner from '../Components/Spinner';
import { useNavigate } from 'react-router-dom';
import NoPostFound from '../Components/NoPostFound';
import { useToast } from '../Contexts/ToastContext';
import { DeletePost, GetPosts } from '../Service/ApiService';
const Posts = ({ isSliderOpen }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [manageMode, setManageMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fetchPosts();
  }, []);

  const FilterData = (event) => {
    setFilterType(event.target.value);
  };

  const MapCardData = (post) => {
    navigate('/NewPost', { state: { post } });
  };

  const manageButton = () => {
    setManageMode(!manageMode);
    setSelectedPosts([]);
  };

  const selectedPost = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const fetchPosts = async () => {
    try {
      const response = await GetPosts(user.uid);
      console.log(response);
      if (response?.status === 'success') {
        const filteredPosts = response.data;
        setPostsData(filteredPosts);
      }
      else {
        showToast(response.message, response.status);
        navigate('/');
      }

    } catch (error) {
      console.error('Failed to fetch posts:', error);
      navigate('/');
      showToast('Failed to get Posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const comment = {
  //   userid: "1",
  //   comment: "sample"
  // }
  const deletePost = async () => {
    setLoading(true);

    if (selectedPosts.length === 0)
      return showToast("No Post Selected", 'Error');
    console.log(selectedPosts);

    try {
      const response = await DeletePost(selectedPosts);

      if (response.status === 'success') {
        showToast(response.message || 'Post Deleted Successfully', 'success');
        setSelectedPosts([]);
        fetchPosts();
        setLoading(false);
        setManageMode(false);

      }
      else {
        showToast(response.message || 'Failed to delete posts', 'error');
        setLoading(false);

      }
    } catch (error) {
      console.error('Failed to update post status:', error);
      showToast("Error while Deleting Post", 'Error')
      setLoading(false);
    }
  };


  if (loading) {
    return <Spinner />;
  }

  const filteredPosts = filterType === 'All' ? postsData : postsData.filter(post => post.category === filterType);

  return (
    <div className='Body-common'>
      <div className={`Posts container ${isSliderOpen ? 'shifted' : ''}`}>
        <h1>Posts</h1>
        <div className="row">
          <div className="col-6 d-flex justify-content-start">
            <div className="Dropdown-container">
              <select name="FilterType" id="FilterType" value={filterType} onChange={FilterData}>
                <option className="Dropdown-container-option" value="All">ALL</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
          </div>
          {filteredPosts.length > 0 ? (
            <div className='col-6 d-flex  justify-content-end Manage-Button'>
              {manageMode ? (
                <>
                  <button onClick={deletePost}>Delete</button>
                  <button onClick={manageButton}>Cancel</button>
                </>
              ) : <button onClick={manageButton}>Delete</button>
              }
            </div>
          ) : (
            <div className='col-6 d-flex  justify-content-end Manage-Button'>
              <button onClick={() => navigate('/NewPost')}>Create Post</button>
            </div>
          )}

        </div>
        <div className="row">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="col-12 mb-2" key={post.id}>
                <div
                  className="card card-data"
                  onClick={() => !manageMode && MapCardData(post)}
                >
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid me-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">Last Updated: {new Date(post.updated.Date).toLocaleDateString()}</p>
                      <div className="metrics mt-3">
                        <span>
                          <i className="bi bi-eye me-1"></i> {post.views}
                        </span>
                        <span>
                          <i className="bi bi-chat-left-text me-1"></i> {post.comments.length}
                        </span>
                        <span>
                          <i className="bi bi-hand-thumbs-up"></i> {post.likes.length}
                        </span>
                      </div>
                    </div>

                    {manageMode && (
                      <div className="checkbox-container">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedPosts.includes(post.id)}
                            onChange={(event) => {
                              event.stopPropagation();
                              selectedPost(post.id);
                            }}
                          />
                          <span></span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoPostFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
