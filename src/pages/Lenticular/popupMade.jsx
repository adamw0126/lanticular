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

const DimensionsModal = ({ open, onClose }) => {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Submitted Data:", formData);
        try {
            const response = await axios.post("/api/interlace", formData);
            console.log('OUtput available at:', response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
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
            <DialogTitle sx={{ color: "#ffffff" }}>Dimensions</DialogTitle>
            <DialogContent>
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
                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{color: 'white'}}>Image Type</FormLabel>
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
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#482bd9", // Bright button color
                        "&:hover": {
                            backgroundColor: "#4444dd",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Create
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        color: "#ffffff",
                        borderColor: "#ffffff",
                        "&:hover": {
                            borderColor: "#bbbbbb",
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
