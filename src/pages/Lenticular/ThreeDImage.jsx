import React, { useState } from 'react'
import { Button, Grid, Slider } from '@mui/material';
import { Download, ArrowUpward, ArrowForward, RotateRight, Panorama, ZoomOutMap, ZoomIn, ArrowLeft, ArrowRight, Tune, ReportProblem } from '@mui/icons-material';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

function ThreeDImage() {

    const [isFocus, setIsFocus] = useState(false);

    const navigate = useNavigate()

    const motionValues = [
        { value: 0 },
        { value: 20 },
        { value: 40 },
        { value: 60 },
        { value: 80 },
        { value: 100 },
    ]

    const focusPointValues = [
        { value: 0 },
        { value: 25 },
        { value: 50 },
        { value: 75 },
        { value: 100 }
    ]

    const buttons = [
        { label: 'Vertical', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true"><path d="M0.847407 6.66667C1.31613 6.66667 1.69481 7.00714 1.69481 7.42857V15.8095H6.77926C7.24798 15.8095 7.62667 16.15 7.62667 16.5714C7.62667 16.9929 7.24798 17.3333 6.77926 17.3333H0.847407C0.378685 17.3333 0 16.9929 0 16.5714V7.42857C0 7.00714 0.378685 6.66667 0.847407 6.66667Z" fill="currentColor"></path><path d="M10.8027 1.09091C10.8027 0.488417 11.3399 0 12.0027 0C12.6654 0 13.2027 0.488417 13.2027 1.09091V22.9091C13.2027 23.5116 12.6654 24 12.0027 24C11.3399 24 10.8027 23.5116 10.8027 22.9091V1.09091Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16.3787 7.42857C16.3787 7.2265 16.459 7.03271 16.6018 6.88982C16.7447 6.74694 16.9385 6.66667 17.1406 6.66667H20.9501C21.6594 6.66614 22.3466 6.91302 22.8935 7.36477C23.4403 7.81652 23.8124 8.44485 23.9457 9.14149C24.079 9.83813 23.9651 10.5595 23.6237 11.1812C23.2824 11.8029 22.7348 12.2861 22.0754 12.5474L23.9173 16.2309C24.0058 16.4114 24.0193 16.6196 23.955 16.81C23.8906 17.0005 23.7536 17.1578 23.5738 17.2477C23.3939 17.3375 23.1858 17.3527 22.9949 17.2898C22.8039 17.2269 22.6456 17.0911 22.5543 16.912L20.4793 12.7619H17.9025V16.5714C17.9025 16.7735 17.8222 16.9673 17.6793 17.1102C17.5364 17.2531 17.3427 17.3333 17.1406 17.3333C16.9385 17.3333 16.7447 17.2531 16.6018 17.1102C16.459 16.9673 16.3787 16.7735 16.3787 16.5714V7.42857ZM17.9025 11.2381H20.9501C21.3542 11.2381 21.7418 11.0776 22.0276 10.7918C22.3134 10.506 22.4739 10.1184 22.4739 9.71429C22.4739 9.31015 22.3134 8.92256 22.0276 8.63679C21.7418 8.35102 21.3542 8.19048 20.9501 8.19048H17.9025V11.2381Z" fill="currentColor"></path></svg>, style: 'vertical' },
        { label: 'Horizontal', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M0 7.42857C0 7.2265 0.080272 7.03271 0.223157 6.88982C0.366042 6.74694 0.559835 6.66667 0.761905 6.66667H4.57143C5.28071 6.66614 5.96796 6.91302 6.51477 7.36477C7.06158 7.81652 7.43369 8.44485 7.567 9.14149C7.70031 9.83813 7.58646 10.5595 7.24507 11.1812C6.90368 11.8029 6.35613 12.2861 5.69676 12.5474L7.53867 16.2309C7.62713 16.4114 7.64066 16.6196 7.57629 16.81C7.51193 17.0005 7.37491 17.1578 7.19507 17.2477C7.01523 17.3375 6.80717 17.3527 6.61621 17.2898C6.42525 17.2269 6.26689 17.0911 6.17562 16.912L4.10057 12.7619H1.52381V16.5714C1.52381 16.7735 1.44354 16.9673 1.30065 17.1102C1.15777 17.2531 0.963974 17.3333 0.761905 17.3333C0.559835 17.3333 0.366042 17.2531 0.223157 17.1102C0.080272 16.9673 0 16.7735 0 16.5714V7.42857ZM1.52381 11.2381H4.57143C4.97557 11.2381 5.36315 11.0776 5.64892 10.7918C5.93469 10.506 6.09524 10.1184 6.09524 9.71429C6.09524 9.31015 5.93469 8.92256 5.64892 8.63679C5.36315 8.35102 4.97557 8.19048 4.57143 8.19048H1.52381V11.2381Z" fill="currentColor"></path><path d="M10.7973 1.09091C10.7973 0.488417 11.3346 0 11.9973 0C12.6601 0 13.1973 0.488417 13.1973 1.09091V22.9091C13.1973 23.5116 12.6601 24 11.9973 24C11.3346 24 10.7973 23.5116 10.7973 22.9091V1.09091Z" fill="currentColor"></path><path d="M17.2207 6.66667C17.6895 6.66667 18.0681 7.00714 18.0681 7.42857V15.8095H23.1526C23.6213 15.8095 24 16.15 24 16.5714C24 16.9929 23.6213 17.3333 23.1526 17.3333H17.2207C16.752 17.3333 16.3733 16.9929 16.3733 16.5714V7.42857C16.3733 7.00714 16.752 6.66667 17.2207 6.66667Z" fill="currentColor"></path></svg>, style: 'horizontal' },
        { label: 'Circle', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M4.8 5.82857C4.8 5.55578 4.91375 5.29415 5.11623 5.10127C5.31871 4.90837 5.59333 4.8 5.87968 4.8H11.2781C12.2831 4.79929 13.257 5.13258 14.0319 5.74244C14.8068 6.35231 15.3341 7.20057 15.523 8.14098C15.712 9.08148 15.5506 10.0553 15.0668 10.8946C14.5831 11.7339 13.8071 12.3862 12.8727 12.739L15.4829 17.7117C15.6083 17.9554 15.6274 18.2365 15.5362 18.4935C15.445 18.7506 15.2508 18.963 14.996 19.0844C14.7411 19.2057 14.4463 19.2261 14.1757 19.1412C13.9051 19.0564 13.6807 18.873 13.5513 18.6312L10.6109 13.0286H6.95937V18.1714C6.95937 18.4442 6.84561 18.7058 6.64311 18.8988C6.44065 19.0916 6.16603 19.2 5.87968 19.2C5.59333 19.2 5.31871 19.0916 5.11623 18.8988C4.91375 18.7058 4.8 18.4442 4.8 18.1714V5.82857ZM6.95937 10.9714H11.2781C11.8508 10.9714 12.4001 10.7547 12.805 10.3689C13.21 9.9831 13.4374 9.45984 13.4374 8.91426C13.4374 8.36868 13.21 7.84542 12.805 7.45968C12.4001 7.07385 11.8508 6.85713 11.2781 6.85713H6.95937V10.9714Z" fill="#F04C78"></path><path d="M9.59997 4.8C10.2637 4.8 10.8 5.25964 10.8 5.82857V17.1429H18C18.6638 17.1429 19.2 17.6025 19.2 18.1714C19.2 18.7404 18.6638 19.2 18 19.2H9.59997C8.93622 19.2 8.4 18.7404 8.4 18.1714V5.82857C8.4 5.25964 8.93622 4.8 9.59997 4.8Z" fill="#25B0F5" fillOpacity="0.8"></path></svg>, style: 'circle' },
    ]

    const [previewStyle, setPreviewStyle] = useState('vertical');

    return (
        <div>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Preview Style
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Grid container spacing={2}>
                        {buttons.map((button, index) => (
                            <Grid item xs={4} key={index}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '96px',
                                        height: '96px',
                                        border: '1px solid rgba(157, 170, 231, 0.2)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        fontSize: '8px'
                                    }}
                                    className={previewStyle == button.style ? 'btn-active' : 'btn-inactive'}
                                    onClick={() => setPreviewStyle(button.style)}
                                >
                                    {button.icon}
                                    {button.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Amount of Depth
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Slider marks={motionValues} min={0} max={100} />
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Focus Point
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <button style={{ backgroundColor: 'rgb(50, 50, 67)', height: '40px', width: '100%', borderRadius: '20px', color: `${isFocus ? 'rgb(224, 194, 255)' : 'white'}` }} onClick={() => setIsFocus(!isFocus)}>Set focus point</button>
                    <Slider marks={focusPointValues} min={0} max={100} />
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Edge Dilation
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Slider marks={motionValues} min={0} max={100} />
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} onClick={() => navigate('./depth-map')} >
                    Depth Map
                </AccordionSummary>
            </Accordion>
            <div style={{width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button color='secondary' variant='contained' style={{width: '60%', borderRadius: '20px'}}><Download /> Export</Button>
            </div>
        </div>
    )
}

export default ThreeDImage