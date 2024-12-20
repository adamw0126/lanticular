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

const EditPassword = ({ openEdit, onCloseEdit }) => {
    const isMobile = useMediaQuery({ maxWidth: 450 });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        onCloseEdit();
    };

    return (
        <Dialog
            open={open}
            onClose={openEdit}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "#222233", // Modal background color
                    color: "#ffffff", // Modal text color
                    width: 340,
                    borderRadius: '8px'
                },
            }}
            className="dialog-demention"
        >
            {/* <DialogTitle sx={{ color: "#ffffff" }}>Dimensions</DialogTitle> */}
            <DialogContent>
                <Box sx={{ fontWeight: 400, fontSize: '21px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Edit password</span>
                </Box>
                <Box sx={{ paddingTop: '20px', fontSize: 'medium' }}>
                    <div>Your account credentials are currently managed by Google.</div>
                    <div>You must create a password before disconnecting this account.</div>
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
                            flex: 1,
                            "&:hover": {
                                borderColor: "#bbbbbb",
                                background: "rgb(69, 69, 84)"
                            },
                        }}
                        onClick={onCloseEdit}
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
                            width: 'max-content',
                            "&:hover": {
                                backgroundColor: "#4444dd",
                                background: "rgb(65, 39, 195)"
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        create password
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
                        onClick={onCloseEdit}
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
                        // onClick={handleSubmit}
                    >
                        create password
                    </Button>
                </DialogActions>
            }
        </Dialog>

    );
};

export default EditPassword;
