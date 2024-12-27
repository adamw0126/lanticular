import { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import TollIcon from '@mui/icons-material/Toll';
import BiotechIcon from '@mui/icons-material/Biotech';
import axios from 'axios';
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import BuyCreditsModal from '../mypage/BuyCreditsModal';

const Dropdown = ({ isOpenDrop, setIsOpenDrop }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [currentCredits, SetCurrentCredits] = useState(0);
    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        SetCurrentCredits(user.admin.credits);
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDrop(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);
    
    return (
        <Box display="flex" alignItems="center">
            <Avatar
                onClick={handleClick}
                sx={{
                    cursor: "pointer",
                    bgcolor: "#6200ea",
                    "&:hover": { bgcolor: "#3700b3" },
                }}
            >
                <img src={user.admin.avatar ? user.admin.avatar : "./userlogo.png"} />
            </Avatar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    mt: "50px",
                    "& .MuiMenu-paper": {
                        backgroundColor: "#121212",
                        borderRadius: "8px",
                        minWidth: "300px",
                    },
                }}
            >
                <Box sx={{ color: "#90caf9", fontFamily: 'Campton Webfont,Arial,sans-serif', textAlign: 'right', padding: '0 16px' }}>
                    {
                        user.admin.role == 'admin'
                            ? <button className="flex items-center gap-1.5 py-2 font-medium text-white"
                                style={{width:'100%', color:'#96cbff'}}
                                onClick={() => {
                                    navigate('/users');
                                    window.location.reload();
                                }}>
                                <img src={user.admin.avatar ? user.admin.avatar : "./userlogo.png"} width={50} height={50} style={{borderRadius:50}} />
                                {`Admin Page (${user.admin.name})`}
                            </button>
                            : <><div style={{display:'flex', gap:10, alignItems:'center', padding:'10px 0'}}>
                                <img src={user.admin.avatar ? user.admin.avatar : "./userlogo.png"} width={50} height={50} style={{borderRadius:50}} />
                                <div style={{display:'flex',flexDirection:'column', cursor:'default'}}>
                                    <div>{user.admin.name}</div>
                                    <div>{user.admin.userId}</div>
                                </div>
                            </div></>
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: '3px 16px',
                        height: 45
                    }}
                >
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif', "&:hover": { color: "#96cbff", cursor:'default' } }}>
                        <TollIcon />{` ${currentCredits} Credits`}&nbsp;&nbsp;
                    </Typography>
                    <Button size='small' className='buy-btn' onClick={() => setOpen(true)}>Buy</Button>
                </Box>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/account');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <ManageAccountsOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Manage Account</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/pricing');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <SellOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Pricing</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/newsroom');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <NewspaperOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>News</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/faqs');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <LiveHelpOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>FAQs</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/technology');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <BiotechIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Technology</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/exports');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <OpenInNewOffOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>My Exports</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                        navigate('/contact');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <ContactPageOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Contact Us</Typography>
                </MenuItem>
                <MenuItem
                    divider
                    onClick={async (e) => {
                        e.preventDefault();
                        handleClose();
                        const result = await axios.post('/api/logout', { who: user.admin._id });

                        if (result.data.message == 'logout') {
                            console.log('logout')
                        }
                        localStorage.removeItem("userInfo");
                        navigate('/');
                        window.location.reload();
                    }}
                    sx={{ "&:hover": { backgroundColor: "#333" } }}
                >
                    <LogoutOutlinedIcon sx={{ color: "white" }} />&nbsp;
                    <Typography sx={{ color: "white", fontFamily: 'Campton Webfont,Arial,sans-serif' }}>Sign out</Typography>
                </MenuItem>
            </Menu>
            <BuyCreditsModal open={open} setOpen={setOpen} SetCurrentCredits={SetCurrentCredits} />
        </Box>
    );
    return (
        <div>
            {isOpenDrop && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-max bg-white border rounded shadow-lg z-10 top-11"
                    role="menu"
                >
                    <div >
                        <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item">
                            {`${user.admin.name}`}
                        </button>
                        {
                            user.admin.role == 'admin'
                                ? <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                                    onClick={() => {
                                        navigate('/users');
                                        window.location.reload();
                                    }}>
                                    {`Admin Page (${user.admin.name})`}
                                </button>
                                : <></>
                        }
                    </div>
                    <div className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item">
                        <div className='flex justify-between'>
                            <div style={{ paddingTop: 4, color: '#0000FF' }}>
                                <TollIcon />{` ${currentCredits} Credits`}&nbsp;&nbsp;
                            </div>
                            <Button size='small' className='buy-btn' onClick={() => setOpen(true)}>Buy</Button>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                    </div>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/account');
                            window.location.reload();
                        }}>
                        <ManageAccountsOutlinedIcon />
                        Manage Account
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/pricing');
                            window.location.reload();
                        }}>
                        <SellOutlinedIcon />
                        Pricing
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/exports');
                            window.location.reload();
                        }}>
                        <OpenInNewOffOutlinedIcon />
                        My Exports
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/newsroom');
                            window.location.reload();
                        }}>
                        <NewspaperOutlinedIcon />
                        News
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/faqs');
                            window.location.reload();
                        }}>
                        <LiveHelpOutlinedIcon />
                        FAQs
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/technology');
                            window.location.reload();
                        }}>
                        <BiotechIcon />
                        Technology
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/contact');
                            window.location.reload();
                        }}>
                        <ContactPageOutlinedIcon />
                        Contact Us
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={async (e) => {
                            e.preventDefault();
                            const result = await axios.post('/api/logout', { who: user.admin._id });

                            if (result.data.message == 'logout') {
                                console.log('logout')
                            }
                            localStorage.removeItem("userInfo");
                            navigate('/');
                            window.location.reload();
                        }}>
                        <LogoutOutlinedIcon />
                        Log Out
                    </button>
                </div>
            )}
            <BuyCreditsModal open={open} setOpen={setOpen} SetCurrentCredits={SetCurrentCredits} />
        </div>
    )
}

export default Dropdown;