import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MyExports = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screens
    const [items, setItems] = useState([]);

    useEffect(() => {
        getHistory();
        return () => {
        }
    }, []);

    const getHistory = async () => {
        const response = await axios.post('/api/getHistory', { who: user.admin._id });
        setItems(response.data.histroy);
    }
    
    return (
        <div>
            <nav className="navbar">
                    <div className="nav-wrapper">
                        <div className="nav-container">
                            <div className="nav-wrapper">
                                <div className="nav-container">
                                    <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                        <img src="./logo.png"
                                            loading="eager" alt="" className="nav-brand" style={{ height: '2.2rem' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="nav-container-right">
                                {
                                    (user == null || !user)
                                    ? <NavLink to="/signin" style={{width:120}} className="navlink w-inline-block">
                                        <div>Sign In</div>
                                    </NavLink>
                                    : <></>
                                }
                                <NavLink to={!user ? "/signin" : "/upload"} style={{width:130}} className="navbar-button w-button">Try Now</NavLink>
                            </div>
                        </div>
                    </div>
            </nav>
            
            <div className="no-fillpage">
                <h3>My Exports</h3>
            </div>
            <div className='exports-list'>
                {
                    items.length
                    ? <Container maxWidth="md" sx={{ mt: 4 }}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <List>
                                {items.map((item) => (
                                    <ListItem
                                        key={item.what}
                                        sx={{
                                            flexDirection: isMobile ? 'column' : 'row', // Adjust layout for mobile
                                            alignItems: isMobile ? 'flex-start' : 'center',
                                            mb: isMobile ? 2 : 0,
                                        }}
                                        divider
                                    >
                                        <ListItemText
                                            primary={'Download'}
                                            sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 1 : 0 }}
                                        />
                                        <ListItemText
                                            primary={item.what}
                                            sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 1 : 0 }}
                                        />
                                        <ListItemText
                                            primary={item.when}
                                            sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 1 : 0 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Container>
                    : <div className='flex justify-center align-middle mt-25'>
                        <h3>There is no history.</h3>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyExports;