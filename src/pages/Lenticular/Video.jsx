import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import VideoThumbnails from './videoThumb';
import axios from 'axios';
import { VideoToFrames } from './VideoToFrame';
import Dropdown from './dropdown';
import JSZip from "jszip";
import { useMediaQuery } from 'react-responsive';

const user = JSON.parse(localStorage.getItem('userInfo'));

const App = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [frameCount, setFrameCount] = useState(12);
  const [videoURL, setVideoURL] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false); // New state for controlling video loading
  const isMobile = useMediaQuery({ maxWidth: 700 });

  useEffect(() => {
    if (!selectedFile) {
      getFile();
    }
  }, [selectedFile]);

  const getFile = async () => {
    const response = await axios.post('/api/getVideoUrl', { who: user.admin._id });
    setVideoURL(response.data.filePath);
    console.log("url ===>", response.data.filePath);
    await generateFrames(response.data.filePath);
  };

  useEffect(() => {
    getFile();
  }, []);

  // const getFile = async () => {
  //   const response = await axios.post('/api/getVideoUrl', { who: user.admin._id });
  //   console.log('response.data ==>', response.data)
  // }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const videoUrl = URL.createObjectURL(file);
    setVideoURL(videoUrl);
    generateFrames(videoUrl);
  };

  const handleFrameCountChange = (event) => {
    setFrameCount(parseInt(event.target.value) || 24);
  };

  const generateFrames = async (videoUrl) => {
    setIsLoading(true);
    setIsVideoReady(false); // Reset video readiness before frame generation
    try {
      const frames = await VideoToFrames.extractFrames(videoUrl, frameCount);
      setThumbnails(frames);
      setIsVideoReady(true);  // Set video as ready after frames are generated
    } catch (error) {
      console.error("Error generating frames:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportFramesAsZip = async () => {
    setIsLoading(true);
    const zip = new JSZip();
    try {
      const folder = zip.folder("frames");
      thumbnails.forEach((frame, index) => {
        const filename = `frame_${index + 1}.png`;
        const base64Data = frame.split(",")[1]; // Remove the "data:image/png;base64," prefix
        folder.file(filename, base64Data, { base64: true });
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "frames.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting frames as ZIP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="video-container">
      <nav className="navbar in-navbar" style={{ padding: '0.5rem' }}>
        <div className="nav-wrapper">
          <div className="nav-container">
            <a href="/" aria-current="page" style={{ paddingLeft: isMobile && '0px' }} className="nav-brand-wrapper w-inline-block w--current">
              <img src="./logo.png" loading="eager" alt="" className="nav-brand" style={{ height: '1.8rem' }} />
            </a>
            <div className="nav-container-right">
              {/* <div
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                <img
                  src="./userlogo.png"
                  width={40}
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                />
              </div> */}
              <Dropdown isOpenDrop={isOpen} setIsOpenDrop={setIsOpen} />
            </div>
          </div>
        </div>
      </nav>
      <>
        {!isMobile ?
          <div className="app-container" style={{ display: 'flex', marginTop: 'calc(56px)', height: 'calc(100vh - 56px)', padding:'10px', gap:'8px' }}>
            <div className="left-section" style={{ backgroundColor: '#22222d', borderRadius: '8px', flex: 1, flexDirection: 'column', padding: 0 }}>
              <div style={{ width: '100%', height: '70vh', backgroundColor: 'rgb(23 23 38)', borderRadius: '8px', overflow: 'hidden', padding: '5px' }}>
                {isVideoReady && ( // Load the video only after frames are generated
                  <video controls muted playsInline style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
                    <source src={videoURL} type="video/mp4" />
                  </video>
                )}
              </div>
              {isLoading ? (
                <Box sx={{
                  display: 'flex',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#22222d',
                  zIndex: 9999,
                }}>
                  <CircularProgress />
                  <Typography variant="h6" sx={{ marginLeft: 2, color: 'white' }}>Processing Frames...</Typography>
                </Box>
              ) : (
                <div style={{ width: '100%', height: '150px', backgroundColor: 'rgb(23 23 38)', borderRadius: '8px', paddingTop: '10px', overflowX: 'auto', marginTop: '1vh' }}>
                  <VideoThumbnails thumbnails={thumbnails} />
                </div>
              )}
            </div>

            <div className="right-sidebar" style={{ width: '300px', backgroundColor: 'rgb(23, 23, 38)', padding: '20px', borderRadius:'8px' }}>
              <Box sx={{ p: 2, height: 300, overflowY: 'auto' }}>
                <Box>
                  <Button variant="contained" component="label" sx={{ backgroundColor: '#482bd9', color: 'white', borderRadius:'50px', textAlign:'center', fontFamily: 'Campton Webfont,Arial,sans-serif', textTransform: 'none' }}>
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {selectedFile && <Typography variant="body2" sx={{ color: 'white' }}>{selectedFile.name}</Typography>}
                </Box>
                <Stack direction="row" spacing={2} mb={2} mt={3}>
                  <TextField
                    size="small"
                    label="Number of Frames"
                    type="number"
                    value={frameCount}
                    onChange={handleFrameCountChange}
                    inputProps={{ min: 1, max: 48 }}
                    sx={{
                      width: '100%',
                      input: { color: "white" },
                      label: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                </Stack>
                <Button variant="contained" sx={{ backgroundColor: '#482bd9', color: 'white', borderRadius:'50px', textAlign:'center', fontFamily: 'Campton Webfont,Arial,sans-serif', textTransform: 'none' }} onClick={exportFramesAsZip}>Export Frames</Button>
              </Box>
            </div>
          </div>
          : <div className="app-container" style={{ display: 'flex', marginTop: 'calc(56px)', height: 'calc(100vh - 56px)' }}>
            <div className="right-sidebar" style={{ width: '100%', backgroundColor: 'rgb(23, 23, 38)' }}>
              <Box sx={{ overflowY: 'auto', display:'flex', alignItems:'center', gap:'10px', justifyContent:'space-around' }}>
                <Box sx={{ textAlign:'center' }}>
                  <Button variant="contained" component="label" sx={{ backgroundColor: '#482bd9', color: 'white', fontFamily: 'Campton Webfont,Arial,sans-serif', textTransform: 'none', borderRadius:'50px', lineHeight:1.3 }}>
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {selectedFile && <Typography variant="body2" sx={{ color: 'white' }}>{selectedFile.name}</Typography>}
                </Box>
                <Stack direction="row" spacing={2} mb={2} mt={3}>
                  <TextField
                    size="small"
                    label="Number of Frames"
                    type="number"
                    value={frameCount}
                    onChange={handleFrameCountChange}
                    inputProps={{ min: 1, max: 48 }}
                    sx={{
                      width: '100%',
                      input: { color: "white" },
                      label: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                </Stack>
                <Button variant="contained" sx={{ borderRadius:'50px', textAlign:'center', backgroundColor: '#482bd9', color: 'white', fontFamily: 'Campton Webfont,Arial,sans-serif', textTransform: 'none', lineHeight:1.3 }} onClick={exportFramesAsZip}>Export Frames</Button>
              </Box>
            </div>
            <div className="left-section" style={{ backgroundColor: '#22222d', padding: '10px', borderRadius: '8px', marginRight: '5px', flex: 1, flexDirection: 'column', paddingTop: '0px', paddingBottom: '5px' }}>
              <div style={{ width: '100%', height: '70vh', backgroundColor: 'rgb(23 23 38)', borderRadius: '8px', overflow: 'hidden', padding: '5px' }}>
                {isVideoReady && ( // Load the video only after frames are generated
                  <video controls muted playsInline style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
                    <source src={videoURL} type="video/mp4" />
                  </video>
                )}
              </div>
              {isLoading ? (
                <Box sx={{
                  display: 'flex',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#22222d',
                  zIndex: 9999,
                }}>
                  <CircularProgress />
                  <Typography variant="h6" sx={{ marginLeft: 2, color: 'white', fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Processing Frames...</Typography>
                </Box>
              ) : (
                <div style={{ width: '100%', height: '150px', backgroundColor: 'rgb(23 23 38)', borderRadius: '8px', paddingTop: '10px', overflowX: 'auto', marginTop: '1vh' }}>
                  <VideoThumbnails thumbnails={thumbnails} />
                </div>
              )}
            </div>
          </div>
        }
      </>
    </div>
  );
};

export default App;
