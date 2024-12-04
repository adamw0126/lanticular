import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const VideoThumbnails = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(5)].map((_, i) => (
        <Grid item xs={2} key={i}>
          <Box sx={{ width: '100%', height: 100, bgcolor: 'grey', }}>
            <Typography variant="body2" align="center">Thumbnail {i+1}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoThumbnails;
