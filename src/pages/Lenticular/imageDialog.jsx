import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from 'react-responsive';

const ImageDialog = ({ open, onClose }) => {
    const isMobile = useMediaQuery({ maxWidth: 450 });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // navigate('/upload');
        window.location.href = "/upload";
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "#22222e", // Modal background color
                    color: "#ffffff", // Modal text color
                    width: 'max-content',
                    borderRadius: '8px'
                },
            }}
            className="dialog-demention"
        >
            {/* <DialogTitle sx={{ color: "#ffffff" }}>Dimensions</DialogTitle> */}
            <DialogContent>
                <Box sx={{ fontWeight: 400, fontSize: '21px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Upload New File</span>
                    <CloseIcon onClick={onClose} />
                </Box>
                <Box sx={{ paddingTop: '20px', fontSize: 'medium' }}>
                    <div>Are you sure you want to upload a new file?</div>
                    <div>Your current work will be discarded.</div>
                </Box>
            </DialogContent>
            { !isMobile
                ? 
                <DialogActions sx={{ padding: '0 20px 15px' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#ffffff",
                            borderColor: "#ffffff",
                            borderRadius: "25px",
                            background: 'rgb(50, 50, 67)',
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            width: 100,
                            "&:hover": {
                                borderColor: "#bbbbbb",
                                background: "rgb(69, 69, 84)"
                            },
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9",
                            borderRadius: "25px",
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            width: 100,
                            "&:hover": {
                                backgroundColor: "#4444dd",
                                background: "rgb(65, 39, 195)"
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Upload
                    </Button>
                </DialogActions>
                : <DialogActions sx={{ padding: '0 20px 15px', flexDirection:'column', gap: '8px' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#ffffff",
                            borderColor: "#ffffff",
                            borderRadius: "25px",
                            background: 'rgb(50, 50, 67)',
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            width: '100%',
                            "&:hover": {
                                borderColor: "#bbbbbb",
                                background: "rgb(69, 69, 84)"
                            },
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9", // Bright button color
                            borderRadius: "25px",
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            width: '100%',
                            marginLeft: '0 !important',
                            "&:hover": {
                                backgroundColor: "#4444dd",
                                background: "rgb(65, 39, 195)"
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Upload
                    </Button>
                </DialogActions>
            }
        </Dialog>

    );
};

export default ImageDialog;
