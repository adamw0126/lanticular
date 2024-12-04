import React from "react";
import { Box, Typography, Button, Grid, Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';

function PricingPage() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);

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
                                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                    <img
                                        src="./logo.png"
                                        loading="eager"
                                        alt=""
                                        className="nav-brand"
                                        style={{ height: '2.2rem' }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="nav-container-right">
                            {(!user || user === null) && (
                                <NavLink to="/signin" style={{ width: 120 }} className="navlink w-inline-block">
                                    <div>Sign In</div>
                                </NavLink>
                            )}
                            <NavLink
                                to={!user ? "/signin" : "/upload"}
                                style={{ width: 130 }}
                                className="navbar-button w-button"
                            >
                                Try Now
                            </NavLink>
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
                    py: 10,
                }}
            >
                {/* Title */}
                <div style={{padding:20}}>
                    <h1>Pricing</h1>
                </div>

                {/* Pricing Section */}
                <Paper
                    elevation={3}
                    sx={{
                        backgroundColor: "#1A1A1A",
                        color: "#FFF",
                        borderRadius: 2,
                        p: 3,
                        textAlign: "center",
                        width: "100%",
                        maxWidth: 500,
                        mb: 4,
                    }}
                >
                    {/* Header */}
                    <Grid container sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Credits
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Price
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Credit Options */}
                    <Box sx={{ mb: 2 }}>
                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={6}>
                                <Typography>500</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>$5.00</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>
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
                            <Grid item xs={6}>
                                <Typography>$10.00</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Highlight Section */}
                    <Box
                        sx={{
                            backgroundColor: "#111",
                            borderRadius: 1,
                            p: 2,
                            textAlign: "center",
                            mb: 3,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#7D6FF0" }}>
                            New Account
                        </Typography>
                        <Typography>100 Free Credits</Typography>
                    </Box>

                    {/* Call-to-Action Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9",
                            color: "#FFF",
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 2,
                            width: "100%",
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
                        maxWidth: '800px',
                        color: '#AAA',
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
                        backgroundColor: "#1A1A1A",
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
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#482bd9",
                            },
                        }}
                    >
                        <Tab label="2D to 3D Motion" />
                        <Tab label="2D to 3D Video" />
                    </Tabs>

                    {/* Comparison Table */}
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        {/* Table Header */}
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Type File & Output Format
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Free Export
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Plus / Premium Export
                            </Typography>
                        </Grid>

                        {/* Table Content */}
                        <Grid item xs={4}>
                            <Typography>3D Motion (MP4)</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>✔ Up to 720p</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>30 / 60 / 100 Credits</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>3D Motion (GIF)</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>✘</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>30 Credits (Up to 360p Only)</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography>Apple Music Motion (MOV)</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>✘</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>500 Credits</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default PricingPage;
