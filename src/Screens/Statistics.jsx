import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Statistics.css';
import Spinner from '../Components/Spinner';
import { useNavigate } from 'react-router-dom';
const Statistics = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  const [weeklyViews, setWeeklyViews] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/StatisticsData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "api-key": "656469736f6e7072696e6365626c6f67676572776562736974656973746f637265617465736f6d65626c6f677061676573", },
          body: JSON.stringify({ uid: user.uid })
        });

        const data = await response.json();
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          const sortedPosts = data.posts.sort((a, b) => new Date(b.created.Date) - new Date(a.created.Date));
          setPosts(sortedPosts);
          setLatestPost(sortedPosts[0]);
          console.log(latestPost);

        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user.uid]);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
    }
    return days;
  };

  return (
    <div className='Body-common'>
      <div className="container statistics-container my-5">
        <div className="row mb-2 text-center ">
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm  statistics-card mb-3">
              <div className="card-body">
                <h6>Total Followers</h6>
                <h4 className="stat-value">0</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm  statistics-card mb-3">
              <div className="card-body">
                <h6>Total Posts</h6>
                <h4 className="stat-value">{posts.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm  statistics-card mb-3">
              <div className="card-body">
                <h6>Total Comments</h6>
                <h4 className="stat-value">{posts.reduce((total, post) => total + post.comments, 0)}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm  statistics-card mb-3">
              <div className="card-body">
                <h6>All-Time Views</h6>
                <h4 className="stat-value">{posts.reduce((total, post) => total + post.views, 0)}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm  mb-4 latest-post-card">
          <div className="card-body">
            <h5 className="card-title">Latest Post</h5>
            {latestPost ? (
              <div className="row align-items-center">
                <div className="col-md-2  text-center">
                  <img
                    src={latestPost.image}
                    alt="Post Thumbnail"
                    className="-circle rounded post-thumbnail"
                  />
                </div>
                <div className="col-md-10 travel-landing-page-button p-3">
                  <h6>{latestPost.title}</h6>
                  <p>Published Date: {new Date(latestPost.publishedDate).toLocaleDateString()}</p>
                  <button onClick={() => navigate('/BlogPostView', { state: { id: latestPost.id } })}
                  >View Post</button>
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>

        <div className="card shadow-sm mb-4 weekly-views-card">
          <div className="card-body">
            <h5 className="card-title">Weekly Views</h5>
            <div className="table-responsive">
              <table className="table table-striped table-data  text-center">
                <thead>
                  <tr className='table-row'>
                    {getLast7Days().map((date, index) => (
                      <th key={index}>{date}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    {getLast7Days().map((date, index) => (
                      <td key={index}>{weeklyViews[date] || 0} Views</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
