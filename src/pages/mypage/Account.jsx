import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import SubFooter from '../LandingPages/footerSub';

import Profile from './profile';
import Credits from './credits';

const Account = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='myacc'>
            <nav className="navbar in-navbar" style={{position:'unset'}}>
                <div className="nav-wrapper">
                    <div className="nav-container">
                        <div className="nav-wrapper">
                            <div className="nav-container">
                                <a href="/" aria-current="page" style={{paddingLeft: isMobile && '0px'}} className="nav-brand-wrapper w-inline-block w--current">
                                    <img
                                        src="./logo.png"
                                        loading="eager"
                                        alt=""
                                        className="nav-brand"
                                        style={{ height: '1.8rem' }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="nav-container-right">
                            <div className='signout'
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const result = await axios.post('/api/logout', { who: user.admin._id });

                                    if (result.data.message == 'logout') {
                                        console.log('logout')
                                    }
                                    localStorage.removeItem("userInfo");
                                    navigate('/');
                                    window.location.reload();
                                }}>Sign out</div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="fillpage">
                <div className={`${!isMobile ? 'acc_content' : 'acc_content_mob'} text-white`}>
                    <div>
                        <h3 style={{ padding: '15px 0' }}>Manage Account</h3>
                    </div>
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    display: isMobile ? 'block' : 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    variant={isMobile ? 'scrollable' : 'fullWidth'}
                                    scrollButtons={isMobile ? 'auto' : false}
                                >
                                    <Tab label="Profile" {...a11yProps(0)} className='acc_tab' />
                                    <Tab label="Credits" {...a11yProps(1)} />
                                    {/* <Tab label="Activity" {...a11yProps(2)} /> */}
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <Profile />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <Credits />
                            </CustomTabPanel>
                            {/* <CustomTabPanel value={value} index={2}>
                                <h3>Recent Activity</h3>
                                <p>Details about recent user activity will appear here.</p>
                            </CustomTabPanel> */}
                        </Box>
                    </div>
                </div>
            </div>

            <SubFooter />
        </div>
    );
};

export default Account;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
