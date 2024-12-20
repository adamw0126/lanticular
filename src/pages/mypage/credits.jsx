import React, { useState, useEffect, useRef } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails, Modal, Box, Typography, IconButton, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TollIcon from '@mui/icons-material/Toll';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BuyCreditsModal from './BuyCreditsModal';
import useMediaQuery from 'react-responsive';

function Credits() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const isMobile = useMediaQuery({maxWidth:600});

    const [editName, setEditName] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [currentCredits, SetCurrentCredits] = useState(0);

    useEffect(() => {
        setEditName(user.admin.name);
        SetCurrentCredits(user.admin.credits);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEditName(false);
            }
        };

        if (isEditName) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditName]);
    

    const changeName = async () => {
        try {
            const res = await axios.post('/api/acc/changeName', { userId: user.admin.userId, editName });
            console.log('res.data ===>', res.data)
            if(res.data.message == 'success'){
                localStorage.setItem('userInfo', JSON.stringify(res.data));
            }
            setIsEditName(false);
        } catch (error) {
            console.error("Error updating user ID", error);
        }
    };

    const openCreditsModal = () => setOpen(true);

    return (
        <div>
            <BuyCreditsModal open={open} setOpen={setOpen} SetCurrentCredits={SetCurrentCredits} />
            <div style={{padding: '20px 5px 0', fontWeight:'normal'}}>Balance</div>
            <div className="edit_bar">
                <div style={{display:'flex'}}>
                    <TollIcon />
                    <h4>&nbsp;{`${currentCredits} Credits`}</h4>
                </div>
                <div>
                    <div>
                        <Button className='buy-credits' onClick={openCreditsModal}>
                            Buy Credits
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{padding: '20px 5px 0', fontWeight:'normal'}}>Documentation</div>
            <div className="edit_bar launch">
                <div onClick={() => {
                    navigate('/pricing');
                }}>How Lenticular Credits Work</div>
                <div>
                    <span style={{paddingRight:'5px'}}><LaunchIcon /></span>
                </div>
            </div>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                <div style={{padding: '10px 0', fontWeight:'normal'}}>Transactions</div>
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <div>No Transaction History</div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Credits;
