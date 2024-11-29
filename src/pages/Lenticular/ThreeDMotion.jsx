import React, { useState, lazy, useEffect } from 'react'
import { Button, Grid, Slider } from '@mui/material';
import { Download, ArrowUpward, ArrowForward, RotateRight, Panorama, ZoomOutMap, ZoomIn, ArrowLeft, ArrowRight, Tune, ReportProblem } from '@mui/icons-material';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from '@mui/material/Switch';
import { useNavigate, useNavigation } from 'react-router-dom';
require('../DepthyViewer');
let gv = require('./config');

let viewerContainer = null;

function ThreeDMotion({user, isDepth, setIsDepth, isAnagl, setIsAnagl}) {
    
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        viewerContainer = document.getElementById('depth-viewer');
        // gv.viewer = new DepthyViewer(viewerContainer, {});
        console.log('gv.viewer', gv.viewer)
        const handleCanvasClick = viewerContainer.addEventListener('click', function (event) {
            console.log('123djfishfsuehkjsef__', isFocus, event.target.tagName)
            if(!isFocus && event.target.tagName === 'CANVAS'){
              const mouseX = event.offsetX;
              const mouseY = event.offsetY;
              getBrightnessAtPosition(parseInt(mouseX), parseInt(mouseY), gv.depthURL)
              .then(brightness => {
                    handleFocusChange(null, parseInt((1 - brightness / 255) * 100));
                    handleSliderChange(null, gv.temp_amt_mot);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
          
              document.getElementsByTagName('canvas')[0].style.cursor = 'default';
              setIsFocus(false)
            }
          });
          return () => {
            viewerContainer.removeEventListener('click', handleCanvasClick);
          };
    }, [])

    const handleSetIsDepth = () => {
        setIsDepth(!isDepth)
    }

    // const handleSetIsAnagl = () => {
    //     setIsAnagl(!isAnagl)
    //     gv.viewer.exportAnaglyph({ width: gv.imageWidth, height: gv.imageHeight })
    //     .then((dataUrl) => {
    //       const img = document.createElement('img');
    //       img.src = dataUrl;
    //       document.body.appendChild(img); 
    //     });
    // }

    const positionValues = [
        {value: -1},
        {value: 0},
        {value: 1}
    ]

    const dilationValues = [
        {value: 0},
        {value: 20},
        {value: 40},
        {value: 60},
        {value: 80},
        {value: 100},
    ]

    const animLengthValues = [
        {value: 1},
        {value: 2},
        {value: 3},
        {value: 4},
        {value: 5},
        {value: 6},
        {value: 7},
        {value: 8},
        {value: 9},
        {value: 10}
    ]

    const focusPointValues = [
        {value:0},
        {value:25},
        {value:50},
        {value:75},
        {value:100}
    ]

    const navigate = useNavigate();

    const buttons = [
        { label: 'Vertical', icon: <ArrowUpward />, style: 'Vertical' },
        { label: 'Horizontal', icon: <ArrowForward />, style: 'Horizontal' },
        { label: 'Circle', icon: <RotateRight />, style: 'Circle' },
        // { label: 'Perspective', icon: <Panorama />, style: 'Perspective' },
        // { label: 'Zoom', icon: <ZoomOutMap />, style: 'Zoom' },
        // { label: 'Dolly', icon: <ZoomIn />, style: 'Dolly' },
        // { label: 'Zoom Left', icon: <ArrowLeft />, style: 'Zoom Left' },
        // { label: 'Zoom Center', icon: <ZoomOutMap />, style: 'Zoom Center' },
        // { label: 'Zoom Right', icon: <ArrowRight />, style: 'Zoom Right' },
        // { label: 'Custom', icon: <Tune />, style: 'Custom' },
    ];
    const [previewStyle, setPreviewStyle] = useState('Circle');
    const [amountValue, setAmountValue] = useState(50); // Default value is 50
    const [lengthValue, setLengthValue] = useState(5);
    const [focusValue, setFocusValue] = useState(50);
    const [dilationValue, setDilationValue] = useState(50);
    const [isDepthmap, setIsDepthmap] = useState(false);
    const [isAnaglyph, setIsAnaglyph] = useState(false);

    const handleSliderChange = (event, newValue) => {
        setAmountValue(newValue); // Update state with the new slider value
        gv.viewer.setOptions({
            animateScale: { x: newValue * 3 / 100, y: newValue * 3 / 100 },
        });
    };

    const handleLengthChange = (event, newValue) => {
        setLengthValue(newValue); // Update state with the new slider value
        gv.viewer.setOptions({
            animateDuration: newValue,
        });
    };

    const handleFocusChange = (event, newValue) => {
        setFocusValue(newValue); // Update state with the new slider value
        gv.viewer.setOptions({
            depthFocus: newValue / 100,
        });
    };

    const handleDilationChange = (event, newValue) => {
        setDilationValue(newValue); // Update state with the new slider value
    };
    const handleDilationCommit = (event, newValue) => {
        dilateDepthMapFromUrl(gv.depthURL, parseInt(newValue / 10))
        .then(outputUrl => {
            gv.viewer.setDepthmap(outputUrl);
        })
        .catch(error => {
            console.error(error);
        });
    };
    const amountValues = [
        { value: 0, label: '0%' },
        { value: 25, label: '25%' },
        { value: 50, label: '50%' },
        { value: 75, label: '75%' },
        { value: 100, label: '100%' }
    ];

    return (
        <div>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Animation Style
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <div className="loop" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}><span>Loop</span><Switch /></div>
                    <div className="reverse" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}><span>Reverse</span><Switch /></div>
                    <Grid container spacing={2}>
                        {buttons.map((button, index) => (
                            <Grid item xs={4} key={index}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '96px',
                                        height: '96px',
                                        color: 'gray',
                                        backgroundColor: 'transparent',
                                        border: '1px solid rgba(157, 170, 231, 0.2)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        fontSize: '8px'
                                    }}
                                    className={previewStyle == button.style ? 'btn-active' : 'btn-inactive'}
                                    onClick={() => {
                                        switch (index) {
                                            case 0:
                                                gv.viewer.setOptions({
                                                    animateStyle: 'vertical',
                                                });
                                                break;
                                            case 1:
                                                gv.viewer.setOptions({
                                                    animateStyle: 'horizontal',
                                                });
                                                break;
                                            case 2:
                                                gv.viewer.setOptions({
                                                    animateStyle: 'circle',
                                                });
                                                break;
                                                    
                                            default:
                                                break;
                                        }
                                        setPreviewStyle(button.style)
                                    }}
                                >
                                    {button.icon}
                                    {button.label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    {/* <div style={{ marginTop: '20px', color: 'rgb(224, 194, 255)', fontSize: '16px', cursor:'pointer' }}>
                        <ReportProblem />
                        <span>Need help using animation styles?</span>
                    </div> */}
                    {/* <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                            Manual Settings
                        </AccordionSummary>
                        <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '14px' }}>
                                <button className="btn-setting">Circular</button>
                                <button className="btn-setting">Linear</button>
                                <button className="btn-setting">Arc</button>
                            </div>
                            <div>
                                <p style={{ fontSize: '16px', marginTop: '10px' }}>Starting Point</p>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-X</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                            <div>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-Y</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                            <div>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-Z</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                            <div>
                                <p style={{ fontSize: '16px', marginTop: '10px' }}>Ending Point</p>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-X</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                            <div>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-Y</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                            <div>
                                <div>
                                    <span style={{ fontSize: '12px' }}>Position-Z</span>
                                </div>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    shiftStep={0.01}
                                    step={0.01}
                                    marks={positionValues}
                                    min={-1}
                                    max={1}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion> */}
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Amount of Motion
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Slider marks={amountValues} min={0} max={100} value={amountValue} onChange={handleSliderChange} id="amountSlider" />
                    <div>{amountValue}%</div>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Animation Length
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Slider marks={animLengthValues} min={1} max={10} value={lengthValue} onChange={handleLengthChange} />
                    <div>{lengthValue}s</div>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Focus Point
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <button style={{ backgroundColor: 'rgb(50, 50, 67)', height: '40px', width: '100%', borderRadius: '20px', color: `${isFocus ? 'rgb(224, 194, 255)' : 'white'}` }} onClick={()=>{
                        if(!isFocus){
                            setIsFocus(true)
                            document.getElementsByTagName('canvas')[0].style.cursor = 'crosshair';
                            gv.temp_amt_mot = amountValue;
                            handleSliderChange(null, 0);
                        } else {
                            handleSliderChange(null, gv.temp_amt_mot);
                        }
                        // setAmountValue(0);
                        // const event = new Event("change", { bubbles: true });
                        // document.getElementById('amountSlider').value = 0; // Set the new value
                        // document.getElementById('amountSlider').dispatchEvent(event); 
                        // document.getElementById('amountSlider').dispatchEvent(new Event('change'));
                    }}>Set focus point</button>
                    <Slider id={'focusSlider'} marks={focusPointValues} min={0} max={100} value={focusValue} onChange={handleFocusChange} />
                    <div style={{ display: 'flex', justifyContent:'space-between'}}>
                        <div>Close</div>
                        <div>Far</div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Edge Dilation
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <Slider marks={dilationValues} min={0} max={100} onChange={handleDilationChange} onChangeCommitted={handleDilationCommit} value={dilationValue} />
                    <div>{dilationValue}%</div>
                </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} >
                    Export
                </AccordionSummary>
                <AccordionDetails sx={{ color: "rgb(175, 175, 182)" }}>
                    <div style={{width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button color='' variant='contained' style={{width: '74%', borderRadius: '20px', border: '1px solid'}} onClick={() => {
                            gv.viewer.exportToPNG().then(function () {
                                console.log('PNG exported and downloaded successfully.');
                              });
                        }}><Download /> Export (.png)</Button>
                    </div>
                    <div style={{ width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            color=""
                            variant="contained"
                            style={{ width: '74%', borderRadius: '20px', border: '1px solid' }}
                            onClick={() => {
                                if (!gv.viewer) {
                                    console.error('Viewer is not available.');
                                    return;
                                }
                                if (!gv.viewer.exportWebmAnimation) {
                                    console.error('exportWebmAnimation is not a function.');
                                    return;
                                }

                                gv.viewer.exportWebmAnimation(5, 75)
                                    .then((blob) => {
                                        console.log('Video export completed:', blob);
                                    })
                                    .catch((error) => {
                                        console.error('Export failed:', error);
                                    });
                            }}
                        >
                            <Download /> Export (.mp4)
                        </Button>
                    </div>

                </AccordionDetails>
            </Accordion>
            <div style={{padding:15}}>
                <div className="loop" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}><span>Depthmap</span><Switch onChange={handleSetIsDepth} /></div>
                {/* <div className="reverse" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}><span>Anaglyph</span><Switch onChange={handleSetIsAnagl}/></div> */}
            </div>
            {/* <Accordion style={{ backgroundColor: "transparent", borderBottom: "1px solid rgba(172, 180, 215, 0.3)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'rgb(175, 175, 182)' }} />} sx={{ color: "rgb(175, 175, 182)" }} onClick={()=>navigate('./depth-map')} >
                    Depth Map
                </AccordionSummary>
            </Accordion> */}
        </div>
    )
}

export default ThreeDMotion

async function dilateDepthMapFromUrl(imageUrl, strength, scaleFactor = 0.5) {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    return new Promise((resolve, reject) => {
        img.onload = () => {
            // Create a temporary canvas for resizing
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            // Resize the canvas based on the scale factor
            tempCanvas.width = img.width * scaleFactor;
            tempCanvas.height = img.height * scaleFactor;

            // Draw the resized image
            tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
            const resizedImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

            // Apply dilation on the resized image
            const dilatedImageData = dilateDepthMap(resizedImageData, strength);

            // Put the dilated image data back to the canvas
            tempCtx.putImageData(dilatedImageData, 0, 0);

            // Convert the canvas to a data URL
            const dilatedImageUrl = tempCanvas.toDataURL();
            resolve(dilatedImageUrl);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageUrl;
    });
}
function dilateDepthMap(imageData, strength) {
    const width = imageData.width;
    const height = imageData.height;
    const srcData = imageData.data;
    const dstData = new Uint8ClampedArray(srcData.length);

    const offset = strength;

    // Precompute surrounding pixel offsets to avoid redundant calculations
    const directions = [];
    for (let dy = -offset; dy <= offset; dy++) {
        for (let dx = -offset; dx <= offset; dx++) {
            if (dx !== 0 || dy !== 0) { // Skip the center pixel
                directions.push({ dx, dy });
            }
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;

            let maxDepth = srcData[index]; // Initialize max depth with the current pixel

            // Loop over precomputed directions
            for (const { dx, dy } of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const neighborIndex = (newY * width + newX) * 4;
                    maxDepth = Math.max(maxDepth, srcData[neighborIndex]);
                }
            }

            dstData[index] = maxDepth;    // Red
            dstData[index + 1] = maxDepth; // Green
            dstData[index + 2] = maxDepth; // Blue
            dstData[index + 3] = 255;      // Alpha (fully opaque)
        }
    }

    return new ImageData(dstData, width, height);
}

  function getBrightnessAtPosition(x, y, imageUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageUrl;
  
        image.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const f_x = parseInt(x * image.width / gv.canvasWidth);
            const f_y = parseInt(y * image.height / gv.canvasHeight);
            try {
                const imageData = ctx.getImageData(f_x, f_y, 1, 1);
                const data = imageData.data;
                const brightness = data[0];
                resolve(brightness);
            } catch (error) {
                reject(new Error('Unable to access pixel data due to cross-origin restrictions.'));
            }
        };
  
        image.onerror = function() {
            reject(new Error('Failed to load image.'));
        };
    });
  }