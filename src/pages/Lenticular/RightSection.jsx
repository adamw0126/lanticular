// src/components/RightSidebar.jsx
import React, { useState } from "react";
import { Button, Grid, Slider } from '@mui/material';
import { ArrowUpward, ArrowForward, RotateRight, Panorama, ZoomOutMap, ZoomIn, ArrowLeft, ArrowRight, Tune, ReportProblem } from '@mui/icons-material';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwitchTab from "./SwitchTab";
import Switch from '@mui/material/Switch';
import ThreeDMotion from "./ThreeDMotion";
import ThreeDImage from "./ThreeDImage";
import MobThreeD from './mobThreeD';

const RightSidebar = ({isMotion, setIsMotion, isDepth, setIsDepth, isAnagl, setIsAnagl, isMobile}) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div className="sidebar-container">
            {/* <div className="tab" style={{ color: "rgb(175, 175, 182)" }}><SwitchTab setIsMotion={setIsMotion} isMotion={isMotion} /></div> */}
            {
                isMotion ? <ThreeDMotion user={user} isDepth={isDepth} setIsDepth={setIsDepth} isAnagl={isAnagl} setIsAnagl={setIsAnagl} isMobile={isMobile} /> : <ThreeDImage user={user}/>
            }
            {/* {
                isMotion ? <MobThreeD user={user} isDepth={isDepth} setIsDepth={setIsDepth} isAnagl={isAnagl} setIsAnagl={setIsAnagl} isMobile={isMobile} /> : <ThreeDImage user={user}/>
            } */}
        </div>
    );
};

export default RightSidebar;
