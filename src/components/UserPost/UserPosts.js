import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  IconButton,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import validation from '../utils/validation';
import PostGallery from './PostGallery';
import NewDialogPost from './NewPostDialog';
import LoadingIndicator from '../common/LoadingIndicator';

const UserPosts = () => {
  const { userId } = useParams();

  // State variables
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Fetch user info and posts when userId changes
  useEffect(() => {
    fetchUserInfo();
    fetchPosts();
  }, [userId]);

 // Fetch user info from the API
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user info. Please try again later.');
      }

      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error('Error fetching user info:', error.message);
    }
  };

  // Fetch posts for the user from the API
  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts. Please try again later.');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Open the dialog for creating a new post
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setNewPostTitle('');
    setNewPostBody('');
    setValidationError('');
  };

 // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Create a new post
  const handleCreatePost = () => {
    const isEnglishTitle = validation.isEnglishText(newPostTitle);
    const isEnglishBody = validation.isEnglishText(newPostBody);

    // Validation checks for new post
    if (!newPostTitle.trim() && !newPostBody.trim()) {
      setValidationError({ field: 'both', message: 'Post title and body are required.' });
    } else if (!newPostTitle.trim()) {
      setValidationError({ field: 'title', message: 'Post title is required.' });
    } else if (!isEnglishTitle) {
      setValidationError({ field: 'title', message: 'Please enter a post title containing only English characters.' });
    } else if (!newPostBody.trim()) {
      setValidationError({ field: 'body', message: 'Post body is required.' });
    } else if (!isEnglishBody) {
      setValidationError({ field: 'body', message: 'Please enter a post body containing only English characters.' });
    } else {
      setPosts([...posts, { userId: parseInt(userId), title: newPostTitle, body: newPostBody }]);
      handleCloseDialog();
      setValidationError('');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <IconButton
        component={Link}
        to="/"
        style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', padding: '8px', backgroundColor: '#f0f0f0' }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', textAlign: 'center' }}>
        {`User Posts - ${userName}`}
      </Typography>
      <div>
        <IconButton
          onClick={handleOpenDialog}
          style={{ marginBottom: '20px', borderRadius: '50%', padding: '8px' }}
        >
          <AddCircleIcon color="primary" fontSize="large" />
        </IconButton>

        {loadingPosts && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
           <LoadingIndicator />

          </div>
        )}

        {!loadingPosts && (
          <>
            <PostGallery posts={posts} />
            <NewDialogPost
              open={openDialog}
              handleClose={handleCloseDialog}
              handleCreatePost={handleCreatePost}
              newPostTitle={newPostTitle}
              setNewPostTitle={setNewPostTitle}
              newPostBody={newPostBody}
              setNewPostBody={setNewPostBody}
              validationError={validationError}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserPosts;