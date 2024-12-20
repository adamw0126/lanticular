import React from "react";
import { Box, Typography, Button, Grid, Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import Dropdown from "./dropdown";

function PricingPage() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 440 });

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleTryNow = () => {
        navigate('/upload');
    }

    return (
        <div>
            <nav className="navbar in-navbar">
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
                            <Dropdown />
                        </div>
                    </div>
                </div>
            </nav>
            <Box
                sx={{
                    color: "#FFF",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 2,
                    py: 6,
                }}
            >
                {/* Title */}
                <div style={{ padding: 20 }}>
                    <h1>Pricing</h1>
                </div>

                {/* Pricing Section */}
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "#1A1A1A",
                        color: "#FFF",
                        borderRadius: 5,
                        p: 2,
                        textAlign: "center",
                        width: "100%",
                        maxWidth: 400,
                        mb: 4,
                    }}
                >
                    {/* Header */}
                    <Grid container sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: 'start', fontFamily: 'Satoshi, sans-serif' }}>
                                Credits
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: 'right', fontFamily: 'Satoshi, sans-serif' }}>
                                Price
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Credit Options */}
                    <Box sx={{ mb: 2 }}>
                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={6} sx={{ textAlign: 'start' }}>
                                <Typography sx={{ fontFamily: 'Satoshi, sans-serif' }}>500</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                <Typography sx={{ fontFamily: 'Satoshi, sans-serif' }}>$5.00</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sx={{ textAlign: 'start' }}>
                                <Typography sx={{ fontFamily: 'Satoshi, sans-serif' }}>
                                    1,200{" "}
                                    <span
                                        style={{
                                            color: "#7D6FF0",
                                            fontSize: "0.9em",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Bonus Credits
                                    </span>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                <Typography sx={{ fontFamily: 'Satoshi, sans-serif' }}>$10.00</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Highlight Section */}
                    <Box
                        sx={{
                            backgroundColor: "#111",
                            borderRadius: 1,
                            p: 1,
                            textAlign: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#7D6FF0", }}>
                            New Account
                        </Typography>
                        <Typography sx={{ fontFamily: 'Satoshi, sans-serif' }}>100 Free Credits</Typography>
                    </Box>

                    {/* Call-to-Action Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9",
                            color: "#FFF",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 5,
                            width: "100%",
                            fontFamily: 'Satoshi, sans-serif'
                        }}
                        onClick={handleTryNow}
                    >
                        Try Now
                    </Button>
                </Paper>

                {/* Footer Text */}
                <Typography
                    variant="body2"
                    sx={{
                        mt: 4,
                        textAlign: 'center',
                        color: '#AAA',
                        fontFamily: 'Satoshi, sans-serif',
                        fontSize: 17
                    }}
                >
                    Lenticular offers a versatile credits system tailored to meet your diverse 3D content creation needs. We offer two packages of credits. Purchase credits and use them flexibly across all features on our platform, ensuring you only pay for what you use. We currently do not provide subscription plans.
                </Typography>

                {/* Feature Comparison Section */}
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1000,
                        textAlign: "center",
                        // backgroundColor: "#1A1A1A",
                        borderRadius: 2,
                        p: 3,
                        mt: 4,
                    }}
                >
                    {/* Tabs */}
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="primary"
                        centered
                        sx={{
                            "& .MuiTab-root": {
                                color: "#FFF",
                                fontWeight: "bold",
                                textTransform: "none",
                                borderRadius: "25px",
                                py: 1,
                                px: 3,
                                fontFamily: 'Satoshi, sans-serif'
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#482bd9",
                            },
                        }}
                    >
                        <Tab label="2D to 3D Motion" />
                        <Tab label="2D to 3D Video" />
                    </Tabs>

                    {
                        selectedTab == 0
                            ? <Grid container spacing={2} sx={{ mt: 3, fontFamily: 'Satoshi, sans-serif', fontSize: '15px' }}>
                                {/* Table Header */}
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontFamily: 'Satoshi, sans-serif' }}>
                                        Type File & Output Format
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontFamily: 'Satoshi, sans-serif' }}>
                                        Free Export
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontFamily: 'Satoshi, sans-serif' }}>
                                        Plus / Premium Export
                                    </Typography>
                                </Grid>

                                {/* Table Content */}
                                <Grid item xs={4}>
                                    3D Motion (MP4)
                                </Grid>
                                <Grid item xs={4}>
                                    ✔ Up to 720p
                                </Grid>
                                <Grid item xs={4}>
                                    30 / 60 / 100 Credits
                                </Grid>

                                <Grid item xs={4}>
                                    3D Motion (GIF)
                                </Grid>
                                <Grid item xs={4}>
                                    ✘
                                </Grid>
                                <Grid item xs={4}>
                                    30 Credits (Up to 360p Only)
                                </Grid>

                                <Grid item xs={4}>
                                    Apple Music Motion (MOV)
                                </Grid>
                                <Grid item xs={4}>
                                    ✘
                                </Grid>
                                <Grid item xs={4}>
                                    500 Credits
                                </Grid>
                            </Grid>
                            : <div></div>
                    }
                </Box>
            </Box>
        </div>
    );
}

export default PricingPage;
