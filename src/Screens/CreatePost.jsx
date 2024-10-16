import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import '../Styles/CreatePost.css';
import { useToast } from '../Contexts/ToastContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreatePost as CreatePostApi } from '../Service/ApiService';
function CreatePost() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: "",
    uid: user ? user.uid : 0,
    publishDate: ""
  });
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    if (location.state && location.state.post) {
      const { post: editPost } = location.state;
      setPost({
        title: editPost.title,
        content: editPost.content,
        category: editPost.category,
        imageUrl: editPost.image,
        uid: editPost.created.createdBy,
        publishDate: editPost.publishedDate ? new Date(editPost.publishedDate).toISOString().split('T')[0] : "",
      });
    }
  }, [location.state]);

  const inputOnChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // Form validations
    if (post.title.length < 5) {
      showToast('The title should have a minimum of 5 characters.', 'Error');
      return;
    }
    if (post.content.length < 5) {
      showToast('The content should have a minimum of 5 characters.', 'Error');
      return;
    }

    const newPost = {
      id: location.state && location.state.post ? location.state.post.id : uuidv4(),
      title: post.title,
      content: post.content,
      image: post.imageUrl,
      category: post.category,
      publishedDate: post.publishDate || null,
      created: location.state && location.state.post ? location.state.post.created : {
        Date: new Date().toISOString(),
        createdBy: user.uid,
      },
      updated: {
        Date: new Date().toISOString(),
        updatedBy: user.uid,
      },
      status: true,
      publishedBy: null,
      isPublished: false,
      comments: location.state && location.state.post ? location.state.post.comments : 0,
      likes: location.state && location.state.post ? location.state.post.likes : 0,
      views: location.state && location.state.post ? location.state.post.views : 0,
      deleted: {
        Date: null,
        deletedBy: null,
      },
    };

    try {
      console.log(newPost);

      const response = await CreatePostApi(newPost)
      console.log(response);

      if (response.status === 'success') {
        showToast(response.message, 'success');
        setPost({
          title: "",
          content: "",
          category: "",
          imageUrl: "",
          uid: user.uid,
          publishDate: ""
        });
        navigate('/ViewBlog');
      } else {
        showToast(response.message, 'error');
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to create/update post.", 'error');
    }
  };


  return (
    <div className="container Body-common">
      <div className="row justify-content-center create-data">
        <div className="col-md-8 col-lg-6 col-12 p-4 create-data-container">
          <h3 className="text-left mb-4"><b>{location.state && location.state.post ? "Edit Post" : "Create a New Post"}</b></h3>
          <form onSubmit={submit} className="Form-Data">
            <div className="mb-3">
              <label className="form-label">Title<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Post Title"
                name="title"
                value={post.title}
                onChange={inputOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content<span style={{ color: 'red' }}>*</span></label>
              <textarea
                className="form-control"
                placeholder="Enter Your Post Content"
                name="content"
                value={post.content}
                onChange={inputOnChange}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Category<span style={{ color: 'red' }}>*</span></label>
              <select
                className="form-select"
                name="category"
                value={post.category}
                onChange={inputOnChange}
                required
              >
                <option value="" disabled>Select a Post Category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL<span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Image URL"
                name="imageUrl"
                value={post.imageUrl}
                onChange={inputOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Publish Date<span style={{ color: 'red' }}>*</span></label>
              <input
                type="date"
                className="form-control"
                name="publishDate"
                value={post.publishDate}
                onChange={inputOnChange}
                min={today}
                required
              />
            </div>
            <div className="text-end">
              <button type="submit" className="create-data-container-button">
                {location.state && location.state.post ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
