import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, List, ListItemButton, ListItemText, Menu, MenuItem, Typography, Button } from "@mui/material";
const steps = ["Settings", "Upload", "Conversion", "Your 3D Video"];
const videoDetails = {
  uploadedFileName: "18.09.2024_03_32.mp4",
  resolution: "3840x938",
  duration: "00:00:27",
  conversionTime: "00:00:32",
  fps: 30,
  costPerMinute: "200 Credits",
  costFullConversion: "200 Credits",
};
// Reusable Dropdown Component
const Dropdown = ({ label, options, selectedIndex, setSelectedIndex }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <Box>
      <span>{label}</span>
      <List component="nav" sx={{ bgcolor: "#121224" }}>
        <ListItemButton
          aria-haspopup="listbox"
          aria-controls={`${label}-menu`}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ListItemText secondary={options[selectedIndex]} sx={{ color: 'white' }} />
        </ListItemButton>
      </List>
      <Menu
        id={`${label}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": `${label}-button`, role: "listbox" }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Video = () => {
  // Unique options for each dropdown
  const outputFormatOptions = ["MP4 SBS Full", "MP4 SBS Full(Cross-Eyed)", "MP4 SBS Half", "MKV SBS Full", "MOV MV-HEVC (Apple Vision Pro)", "MP4 Top-Bottom", "MP4 Anaglyph", "MP4 Depth Map"];
  const depthOptions = ["Soft (1.1)", "Regular (1.2)", "Strong (1.3)"];
  const convergenceOptions = ["OFF", "ON"];
  const fieldOfViewOptions = ["Regular", "360"];

  // State for each dropdown
  const [selectedOutputFormat, setSelectedOutputFormat] = useState(0);
  const [selectedDepth, setSelectedDepth] = useState(0);
  const [selectedConvergence, setSelectedConvergence] = useState(0);
  const [selectedFieldOfView, setSelectedFieldOfView] = useState(0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", marginTop: "120px" }}>
        <h2>Convert 2D Video to 3D</h2>
        <h4>Power your XR experience using our state-of-the-art Neural Depth Engine</h4>
      </Box>

      {/* Stepper */}
      <Stepper
        activeStep={0}
        alternativeLabel
        sx={{
          marginTop: "50px",
          "& .MuiStepIcon-root": { fontSize: "2.5rem" },
          "& .MuiStepIcon-text": { fontSize: "1.2rem" },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Dropdown Grid */}
      <Box sx={{ width: "100%", maxWidth: "640px", marginTop: "50px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: "32px",
            bgcolor: "#181833",
            padding: "32px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <Dropdown
            label="Output Format"
            options={outputFormatOptions}
            selectedIndex={selectedOutputFormat}
            setSelectedIndex={setSelectedOutputFormat}
          />
          <Dropdown
            label="Depth"
            options={depthOptions}
            selectedIndex={selectedDepth}
            setSelectedIndex={setSelectedDepth}
          />
          <Dropdown
            label="Convergence"
            options={convergenceOptions}
            selectedIndex={selectedConvergence}
            setSelectedIndex={setSelectedConvergence}
          />
          <Dropdown
            label="Field of View"
            options={fieldOfViewOptions}
            selectedIndex={selectedFieldOfView}
            setSelectedIndex={setSelectedFieldOfView}
          />
        </Box>
        <Box sx={{ padding: '32px', borderRadius: '0px 0px 8px 8px', display: 'flex', gap: '10px', flexDirection: 'column', justifyContent: 'space-between', bgcolor: '#232338' }}>
            {/* Render each detail */}
            <Typography variant="body2">
              <strong>Video Uploaded:</strong> {videoDetails.uploadedFileName}
            </Typography>
            <Typography variant="body2">
              <strong>Output Resolution:</strong> {videoDetails.resolution}
            </Typography>
            <Typography variant="body2">
              <strong>Total video duration:</strong> {videoDetails.duration}
            </Typography>
            <Typography variant="body2">
              <strong>Estimated Conversion Time:</strong> {videoDetails.conversionTime}
            </Typography>
            <Typography variant="body2">
              <strong>FPS:</strong> {videoDetails.fps}
            </Typography>
            <Typography variant="body2">
              <strong>Cost per minute:</strong> {videoDetails.costPerMinute}
            </Typography>
            <Typography variant="body2" sx={{ color: "#E94084" }}>
              <strong>Cost full conversion:</strong> {videoDetails.costFullConversion}
            </Typography>
        </Box>
      </Box>
          <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginTop: '32px'}}>
            <Button variant="contained">Download Sample</Button>
            <Button variant="contained" color="secondary">Full Conversion</Button>
          </Box>
    </Box>
  );
};

export default Video;
