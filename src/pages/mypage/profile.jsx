import React, { useEffect, useState } from 'react'
import { Button, Grid, Slider, Modal } from '@mui/material';
import { Download, ArrowUpward, ArrowForward, RotateRight, Panorama, ZoomOutMap, ZoomIn, ArrowLeft, ArrowRight, Tune, ReportProblem } from '@mui/icons-material';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()

    useEffect(() => {
        console.log('user ===>', user)
    }, [])

    const editUserIdModal = () => {
        
    }
    const changeUserId = (editVal) => {
        const res = axios.post('/api/acc/changeUserId', { userId: user.admin.userId, editVal });
    }
    const changePassword = () => {
        
    }

    return (
        <div>
            <div className='edit_bar'>
                <div>Name</div>
                <div>
                    <span>{user.admin.userId}</span>
                    <Button size='large' onClick={editUserIdModal}>Edit</Button>
                </div>
            </div>
            <div className='edit_bar'>
                <div>Password</div>
                <div>
                    <Button size='large' onClick={changePassword}>Edit</Button>
                </div>
            </div>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Preview Style
                </AccordionSummary>
            </Accordion>
        </div>
    )
}

export default Profile