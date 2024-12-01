import React, { useState, useEffect, useRef } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    const [editUserId, setEditUserId] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setEditUserId(user.admin.userId);
    }, []);

    // Handles clicks outside of the input field
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    const changeUserId = async () => {
        try {
            await axios.post('/api/acc/changeUserId', { userId: user.admin.userId, editUserId });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user ID", error);
        }
    };

    return (
        <div>
            <div className="edit_bar">
                <div>Name</div>
                <div>
                    {isEditing ? (
                        <div ref={inputRef}>
                            <input
                                type="text"
                                value={editUserId}
                                onChange={(e) => setEditUserId(e.target.value)}
                                onBlur={changeUserId}
                                autoFocus
                            />
                        </div>
                    ) : (
                        <div>
                            <span>{editUserId}</span>
                            <Button size="large" onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="edit_bar">
                <div>Password</div>
                <div>
                    <Button size="large">Edit</Button>
                </div>
            </div>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }}>
                    Preview Style
                </AccordionSummary>
            </Accordion>
        </div>
    );
}

export default Profile;
