import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Box,
    Grid,
    FormLabel
} from "@mui/material";
import axios from 'axios';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const DimensionsModal = ({ open, onClose, fPSInputValue, setFPSInputValue, handleConfirmFrame }) => {
    const [formData, setFormData] = useState({
        width: "",
        height: "",
        unit: "inches",
        dpi: 50,
        lpi: 600,
        imageType: "png",
        compressionQuality: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [value, setValue] = React.useState('1');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleValue = (event, newValue) => {
        setValue(newValue);
    }

    const handleFPSInputChange = (event) => {
        setFPSInputValue(event.target.value);
    };

    const createFrames = () => {
        handleConfirmFrame()
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Submitted Data:", formData);
        // try {
        //     const response = await axios.post("/api/interlace", formData);
        //     console.log('OUtput available at:', response.data);
        // } catch (error) {
        //     console.error("Error:", error);
        // } finally {
        //     setIsSubmitting(false);
        // }
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "#22222e", // Modal background color
                    color: "#ffffff", // Modal text color
                },
            }}
            className="dialog-demention"
        >
            {/* <DialogTitle sx={{ color: "#ffffff" }}>Dimensions</DialogTitle> */}
            <DialogContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, }}>
                        <TabList onChange={handleValue} aria-label="lab API tabs example">
                            <Tab label="Frames" value="1" sx={{ width: '50%', color: 'white' }} />
                            <Tab label="Interlation" value="2" sx={{ width: '50%', color: 'white' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '10px',
                                justifyContent: 'center',
                            }}
                        >
                            <TextField size="small"
                                name="width"
                                label="Total Count Frames"
                                type="number"
                                fullWidth
                                value={fPSInputValue}
                                onChange={handleFPSInputChange}
                                InputLabelProps={{
                                    style: { color: "#ffffff" }, // Label color
                                }}
                                InputProps={{
                                    min: 1, max: 30,
                                    style: { color: "#ffffff", borderColor: "#ffffff" }, // Text color
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffffff", // Border color
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                    },
                                }}
                            />
                            {/* <input
                                type="number"
                                value={fPSInputValue}
                                onChange={handleFPSInputChange}
                                placeholder="Enter FPS"
                                min={1}
                                max={30}
                                style={{
                                    width: '140px',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    border: '1px solid gray',
                                }}
                            /> */}
                        </div>
                        <div style={{paddingTop:20}}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: 'white' }}>Image Type</FormLabel>
                                <RadioGroup
                                    row aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="imageType"
                                    value={formData.imageType}
                                    onChange={handleChange}
                                    sx={{ color: "#ffffff" }}
                                >
                                    <FormControlLabel
                                        value="png"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="PNG"
                                    />
                                    <FormControlLabel
                                        value="jpg"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="JPG"
                                    />
                                    <FormControlLabel
                                        value="tif"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="TIF"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1 }}>
                            <Box display="flex" gap={2}>
                                <TextField size="small"
                                    name="width"
                                    label="Width"
                                    type="number"
                                    fullWidth
                                    value={formData.width}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        style: { color: "#ffffff" }, // Label color
                                    }}
                                    InputProps={{
                                        style: { color: "#ffffff", borderColor: "#ffffff" }, // Text color
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "#ffffff", // Border color
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#ffffff",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#ffffff",
                                            },
                                        },
                                    }}
                                />
                                <TextField size="small"
                                    name="height"
                                    label="Height"
                                    type="number"
                                    fullWidth
                                    value={formData.height}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        style: { color: "#ffffff" },
                                    }}
                                    InputProps={{
                                        style: { color: "#ffffff", borderColor: "#ffffff" },
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "#ffffff",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#ffffff",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#ffffff",
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            <FormControl fullWidth>
                                <div className="flex justify-between">
                                    <InputLabel sx={{ color: "#ffffff" }} id="demo-simple-select-label">Unit</InputLabel>
                                    <Select labelId="demo-simple-select-label" size="small"
                                        id="demo-simple-select"
                                        name="unit"
                                        value={formData.unit}
                                        label="Unit"
                                        onChange={handleChange}
                                        sx={{
                                            width: "120px",
                                            color: "#ffffff", // Selected text color
                                            ".MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#ffffff", // Border color
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#ffffff",
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#ffffff",
                                            },
                                        }}
                                    >
                                        <MenuItem value="inches">Inches</MenuItem>
                                        <MenuItem value="pixels">Pixels</MenuItem>
                                    </Select>
                                    <TextField size="small" label={formData.unit}
                                        InputLabelProps={{
                                            style: { color: "#ffffff" },
                                        }}
                                        InputProps={{
                                            style: { color: "#ffffff", borderColor: "#ffffff" },
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor: "#ffffff",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "#ffffff",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#ffffff",
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                {/* <div>
                </div> */}
                            </FormControl>

                            {/* Printer DPI Field */}
                            <TextField size="small"
                                name="dpi"
                                label="Printer DPI"
                                type="number"
                                fullWidth
                                value={formData.dpi}
                                onChange={handleChange}
                                InputLabelProps={{
                                    style: { color: "#ffffff" },
                                }}
                                InputProps={{
                                    style: { color: "#ffffff" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                    },
                                }}
                            />

                            {/* Lenticular Lens LPI Field */}
                            <TextField size="small"
                                name="lpi"
                                label="Lenticular Lens LPI"
                                type="number"
                                fullWidth
                                value={formData.lpi}
                                onChange={handleChange}
                                InputLabelProps={{
                                    style: { color: "#ffffff" },
                                }}
                                InputProps={{
                                    style: { color: "#ffffff" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                    },
                                }}
                            />

                            {/* Image Type Radio Buttons */}
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: 'white' }}>Image Type</FormLabel>
                                <RadioGroup
                                    row aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="imageType"
                                    value={formData.imageType}
                                    onChange={handleChange}
                                    sx={{ color: "#ffffff" }}
                                >
                                    <FormControlLabel
                                        value="png"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="PNG"
                                    />
                                    <FormControlLabel
                                        value="jpg"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="JPG"
                                    />
                                    <FormControlLabel
                                        value="tif"
                                        control={<Radio sx={{ color: "#ffffff" }} />}
                                        label="TIF"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {/* Compression Quality Field */}
                            <TextField size="small"
                                name="compressionQuality"
                                label="Compression Quality"
                                type="number"
                                fullWidth
                                value={formData.compressionQuality}
                                onChange={handleChange}
                                InputLabelProps={{
                                    style: { color: "#ffffff" },
                                }}
                                InputProps={{
                                    style: { color: "#ffffff" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffffff",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <DialogActions>
                {value == '1'
                    ? <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9", // Bright button color
                            borderRadius: "25px",
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            "&:hover": {
                                backgroundColor: "#4444dd",
                                background: "rgb(65, 39, 195)"
                            },
                        }}
                        onClick={createFrames}
                    >
                        Create Frames
                    </Button>
                    : <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#482bd9", // Bright button color
                            borderRadius: "25px",
                            border: 0,
                            textTransform: 'none',
                            fontFamily: 'Campton Webfont,Arial,sans-serif',
                            fontSize: '15px',
                            "&:hover": {
                                backgroundColor: "#4444dd",
                                background: "rgb(65, 39, 195)"
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Create Interlation
                    </Button>
                }
                <Button
                    variant="outlined"
                    sx={{
                        color: "#ffffff",
                        borderColor: "#ffffff",
                        borderRadius: "25px",
                        background: 'rgb(50, 50, 67)',
                        border: 0,
                        textTransform: 'none',
                        fontFamily: 'Campton Webfont,Arial,sans-serif',
                        fontSize: '15px',
                        width: 100,
                        "&:hover": {
                            borderColor: "#bbbbbb",
                            background: "rgb(69, 69, 84)"
                        },
                    }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default DimensionsModal;
