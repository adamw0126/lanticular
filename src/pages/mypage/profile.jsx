import React, { useState, useEffect, useRef } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails, Input } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    const [editName, setEditName] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setEditName(user.admin.name);
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
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEditPassword(false);
            }
        };

        if (isEditPassword) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditPassword]);

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
    const changePassword = async () => {
        try {
            const res = await axios.post('/api/acc/changePassword', { userId: user.admin.userId, editPassword });
            console.log('res.data ===>', res.data)
            if(res.data.message == 'success'){
                setIsEditPassword(false);
            }
        } catch (error) {
            console.error("Error updating user ID", error);
        }
    };

    return (
        <div>
            <div className="edit_bar">
                <div>Name</div>
                <div>
                    {isEditName ? (
                        <div ref={inputRef}>
                            <input
                                type="text" style={{color:'#22222d'}}
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                autoFocus
                            />
                            <Button size="large" onClick={changeName}>Change</Button>
                        </div>
                    ) : (
                        <div>
                            <span>{editName}</span>
                            <Button size="large" onClick={() => setIsEditName(true)}>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="edit_bar">
                <div>UserId</div>
                <div>
                    <span>{user.admin.userId}</span>
                </div>
            </div>
            <div className="edit_bar">
                <div>Password</div>
                <div>{isEditPassword ? (
                        <div ref={inputRef}>
                            <input
                                type="password" style={{color:'#22222d'}}
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                autoFocus
                            />
                            <Button size="large" onClick={changePassword}>Change</Button>
                        </div>
                    ) : (
                        <div>
                            <Button size="large" onClick={() => setIsEditPassword(true)}>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
