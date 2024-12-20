import React, { useState, useEffect, useRef } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails, Input } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AccCard from './accCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DisconnectMail from './disconnectMail';

function Profile() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [editName, setEditName] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [isDisConn, setIsDisConn] = useState(false);
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
            if (res.data.message == 'success') {
                localStorage.setItem('userInfo', JSON.stringify(res.data));
            }
            setIsEditName(false);
        } catch (error) {
            console.error("Error updating user ID", error);
        }
    };
    const changeNameByEnter = async (e) => {
        if(e.key === "Enter"){
            changeName();
        }
    }
    const changePassword = async () => {
        try {
            const res = await axios.post('/api/acc/changePassword', { userId: user.admin.userId, editPassword });
            console.log('res.data ===>', res.data)
            if (res.data.message == 'noValue') {
                toast.success(`Enter password.`,{
                  duration: 2000,
                  position: 'top-right',
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  icon: '',
                });
            }
            if (res.data.message == 'success') {
                toast.success('Updated password.');
                setIsEditPassword(false);
            }
        } catch (error) {
            console.error("Error updating user ID", error);
        }
    };
    const changePasswordByEnter = async (e) => {
        if(e.key === "Enter"){
            changePassword();
        }
    }

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const seletedFile = e.target.files[0];
            console.log('file===>', seletedFile)
            await handleUpload(seletedFile);
        }
    }

    const handleUpload = async (file) => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }
        if (!file.type.includes('image/')) {
            toast.error('File type must be an image.');
            return;
        }
        if (file.size / 1024 / 1024 > 20) {
            toast.error('File size must be smaller than 20MB.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('who', user.admin._id);

            const response = await axios.post('/api/uploadProfileAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('responseData =>>>', response.data)
            if (response.status === 200) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/account');
                toast.success('Success change your avatar.');
            }
        } catch (error) {
            toast.error('File upload failed');
            console.error('Upload error:', error);
        }
    }

    const handleDisconnect = () => {
        setIsDisConn(true);
    };

    return (
        <div>
            <div className="edit_bar">
                <div>Profile Picture</div>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-input"
                    />
                    <label htmlFor="file-input" className='avatar_over cursor-pointer'>
                        <img src={user.admin.avatar ? user.admin.avatar : './userlogo.png'} style={{ borderRadius: 50, width: 80 }} />
                        <div className='photo-underline'><CameraAltOutlinedIcon /></div>
                    </label>
                </div>
            </div>
            <div className="edit_bar">
                <div>Name</div>
                <div>
                    {isEditName ? (
                        <div ref={inputRef} className='flex'>
                            <input
                                type="text" className='profile-input'
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={changeNameByEnter}
                                autoFocus
                            />
                            <Button size="large" className='profile_btn' onClick={changeName}>Change</Button>
                        </div>
                    ) : (
                        <div>
                            <span>{editName}</span>
                            <Button size="large" className='profile_btn' onClick={() => setIsEditName(true)}>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="edit_bar">
                <div style={{width: isMobile && '115px'}}>Email address</div>
                <div>
                    <span>{user.admin.userId}</span>
                </div>
            </div>
            <div className="edit_bar">
                <div>Password</div>
                <div>{isEditPassword ? (
                    <div ref={inputRef} className='flex'>
                        <input
                            type="password" className='profile-input'
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            autoFocus
                            onKeyDown={changePasswordByEnter}
                        />
                        <Button size="large" className='profile_btn' onClick={changePassword}>Change</Button>
                    </div>
                ) : (
                    <div>
                        <Button size="large" className='profile_btn' onClick={() => setIsEditPassword(true)}>Edit</Button>
                    </div>
                )}
                </div>
            </div>
            <div className="connect-accounts">
                <div style={{ padding: '15px 0' }}>Connected accounts</div>
                <div>
                    <AccCard email={user.admin.userId} onDisconnect={handleDisconnect} />
                </div>
            </div>
            <DisconnectMail open={isDisConn} onClose={() => setIsDisConn(false)} />
        </div>
    );
}

export default Profile;
