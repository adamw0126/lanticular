import * as React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const VideoThumbnails = ({ thumbnails }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  const handleThumbnailClick = (thumb) => {
    setSelectedImage(thumb);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          padding: '10px 0',
          height: '100%',
          '&::-webkit-scrollbar': {
            height: '6px', // Make the horizontal scrollbar thin
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', // Scrollbar thumb color
            borderRadius: '10px', // Rounded corners for the thumb
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Darker thumb color on hover
          },
        }}
      >
        {thumbnails.length > 0 ? (
          thumbnails.map((thumb, i) => (
            <Box 
              key={i} 
              sx={{ 
                flexShrink: 0, 
                width: 120, 
                height: 80, 
                marginLeft: 1, 
                cursor: 'pointer', // Change cursor to pointer for better UX
              }} 
              onClick={() => handleThumbnailClick(thumb)}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5%' }}
              />
              <Typography variant="body2" align="center">Thumbnail {i + 1}</Typography>
            </Box>
          ))
        ) : (
          <Box sx={{ flexShrink: 0, width: 120, height: 80, marginLeft: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            <Typography variant="body2" align="center">No Thumbnails Available</Typography>
          </Box>
        )}
      </Box>

      {/* Modal for displaying the selected image */}
      <Modal open={openModal} onClose={handleCloseModal} sx={{zIndex:'9999', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{ 
          maxWidth: '90%', 
          maxHeight: '90%', 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          borderRadius: 2, 
          overflow: 'hidden',
          outline:'none' 
        }}>
          <img src={selectedImage} alt="Selected Thumbnail" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </Box>
      </Modal>
    </>
  );
};

export default VideoThumbnails;