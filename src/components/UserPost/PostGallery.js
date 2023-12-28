import React from 'react';
import { Card, CardContent } from '@mui/material';

const PostGallery = ({ posts }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {posts.map((post) => (
        <Card key={post.id} style={{ width: '300px' }}>
          <CardContent>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostGallery;