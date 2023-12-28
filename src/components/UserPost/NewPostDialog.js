import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';

const NewDialogPost = ({ open, handleClose, handleCreatePost, newPostTitle, setNewPostTitle, newPostBody, setNewPostBody, validationError }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Create New Post</DialogTitle>
    <DialogContent>
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {validationError && (
        <div style={{ color: 'red', marginBottom: '10px', textAlign: 'left' }}>{validationError.message}</div>
      )}
      <TextField
        label="Post Body"
        variant="outlined"
        multiline
        fullWidth
        rows={4}
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCreatePost} style={{ marginRight: '10px' }}>
        Create
      </Button>
    </DialogContent>
  </Dialog>
);

export default NewDialogPost;