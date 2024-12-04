import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Stack, Grid, Container } from '@mui/material';
import VideoThumbnails from './videoThumb'; // Placeholder component for thumbnails
import Dropdown from './dropdown';

const user = JSON.parse(localStorage.getItem('userInfo'));

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [frameCount, setFrameCount] = useState(12);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFrameCountChange = (event) => {
    setFrameCount(parseInt(event.target.value, 10) || 12); // Default to 12 if invalid
  };

  return (
    <div>
      <nav className="navbar" style={{position: 'unset', paddingRight:10, padding:'5px 0'}}>
        <div className="nav-wrapper">
            <div className="nav-container">
                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                    <img src="./logo.png" 
                        loading="eager" alt="" className="nav-brand" style={{height:'2.2rem'}} />
                </a>
                <div className="nav-container-right" style={{paddingRight:10}}>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        <img
                            src="./userlogo.png"
                            width={40}
                            style={{
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <Dropdown isOpenDrop={isOpen} setIsOpenDrop={setIsOpen} />
                </div>
            </div>
        </div>
      </nav>

      <div className="app-container">
        <div className="left-section">
          <div>
            <video controls muted playsInline="" data-wf-ignore="true" data-object-fit="cover" style={{maxWidth:800}}>
                <source src="./anim_1.mp4" data-wf-ignore="true"/>
                <source src="./anim_1.mp4" data-wf-ignore="true"/>
            </video>
            <VideoThumbnails />
          </div>
        </div>
        <div className="right-sidebar">
          <Box sx={{ p: 2, height: 300, overflowY: 'auto' }}>
            <Box>
              <Button variant="contained" component="label">
                Choose File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              {selectedFile && <Typography variant="body2">{selectedFile.name}</Typography>}
            </Box>
            <Stack direction="row" spacing={2} mb={2} mt={3}>
              <TextField
                label="Number of Frames"
                type="number"
                value={frameCount}
                onChange={handleFrameCountChange}
                inputProps={{ min: 1 }}
                sx={{
                  input: { color: "white" }, // Text color
                  label: { color: "white" }, // Label color
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused
                    },
                  },
                }}
              />
            </Stack>
            <Button variant="contained" >Export Frames</Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default App;
