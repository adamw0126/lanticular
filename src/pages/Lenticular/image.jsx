import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { lazy } from 'react';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import Loader from '../../common/Loader/index';
import UploadLoader from '../../common/Loader/uploadLoading';
require('../DepthyViewer');
let gv = require('./config');
import Dropdown from './dropdown';

let stage = null;
let viewerContainer = null;
let depthPreview = null;
let previewContainer = null;

const AnimationPage = lazy(() => import('./animPage'));
const user = JSON.parse(localStorage.getItem('userInfo'));

const ImageComponent = () => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0); // For tracking download progress
    const dropdownRef = useRef(null);

    useEffect(() => {
        // console.log('user ===>', user)
        viewerContainer = document.getElementById('depth-viewer');
        depthPreview = document.getElementById('preview_container');
        previewContainer = document.getElementById("preview_container");
        stage = document.getElementsByClassName("image-container")[0];
        gv.stageWidth = stage.clientHeight;
        gv.stageHeight = stage.clientWidth;
        gv.imageWidth = user.admin.w_h.width;
        gv.imageHeight = user.admin.w_h.height;
        gv.depthURL = user.admin.depthImage;
        gv.imageURL = user.filePath;
        window.dispatchEvent(new Event('resize'));
 
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            response_size()
            dilateDepthMapFromUrl(gv.depthURL, gv.dilationSize)
            .then(outputUrl => {
                gv.tempDepth = outputUrl;
                build_viewer();
            })
            .catch(error => {
                console.error(error);
            });
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            const seletedFile = e.target.files[0];
            console.log('file===>', seletedFile)
            await handleUpload(seletedFile);
        }
    };

    const handleUpload = async (file) => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }
        if (!file.type.includes('image/')) {
            toast.error('File type must be an image.');
            return;
        }
        if (file.size / 1024 / 1024 > 20) {
            toast.error('File size must be smaller than 20MB.');
            return;
        }
    
        const img = new Image();
        img.src = URL.createObjectURL(file);
    
        const getImageDimensions = () => {
            return new Promise((resolve) => {
                img.onload = () => {
                    const dimensions = { width: img.width, height: img.height };
                    URL.revokeObjectURL(img.src); // Clean up blob URL
                    resolve(dimensions);
                };
            });
        };
    
        try {
            const { width, height } = await getImageDimensions();
    
            const formData = new FormData();
            formData.append('file', file); // Correctly append file
            formData.append('userId', user.admin.userId); // Correctly append userId
            formData.append('img_w', width);
            formData.append('img_h', height);
    
            // Upload the file
            const response = await axios.post('/api/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const depthGen = await depth_gen(file);
            if (response.status === 200) {
                if(depthGen === 'success'){
                    toast.success(response.data.message);
                }
                setFile(null);
                // localStorage.setItem('userInfo', JSON.stringify(response.data));
                // navigate('/image'); // Navigate after success
                window.location.reload()
            }
        } catch (error) {
            toast.error('File upload failed');
            console.error('Upload error:', error);
        }
    };

    const depth_gen = async (file) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("file_in", file);

            // Upload file to generate depth map
            const uploadResponse = await fetch("https://gatorswap.com/depth_map.php", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Error uploading image.");
            }

            const f_data = await uploadResponse.text();

            // Fetch depth URL with progress tracking
            const depthResponse = await fetch(f_data);
            if (!depthResponse.ok) {
                throw new Error("Error fetching depth URL.");
            }

            const contentLength = depthResponse.headers.get("Content-Length");
            if (!contentLength) {
                console.warn("Content-Length header is missing.");
            }

            const totalSize = contentLength ? parseInt(contentLength, 10) : 0;
            let receivedSize = 0;
            const reader = depthResponse.body.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                receivedSize += value.length;

                if (totalSize > 0) {
                    const progress = (receivedSize / totalSize) * 100;
                    setDownloadProgress(progress); // Update progress state
                }
            }

            const depthURL = f_data; // Assuming f_data is the correct URL

            // Send depthPath to API
            const axiosResponse = await axios.post('/api/depthImage', {
                who: user.admin._id,
                depthPath: depthURL,
            });

            const { message } = axiosResponse.data;
            if (message === 'success') {
                localStorage.setItem('userInfo', JSON.stringify(axiosResponse.data));
                return 'success';
            } else {
                console.log('Not Found');
                return 'failed';
            }
        } catch (error) {
            console.error(error.message);
            return 'failed';
        } finally {
            setIsLoading(false);
        }
    };
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

    function build_viewer() {
        console.log(gv.canvasWidth, gv.canvasHeight);

        gv.viewer = new DepthyViewer(viewerContainer, {
            size: {width: gv.canvasWidth, height: gv.canvasHeight} 
        });
        // depthPreview.src = gv.depthURL;
        gv.viewer.setImage(gv.imageURL);
        gv.viewer.setDepthmap(gv.tempDepth);

        gv.origin_viewer = new DepthyViewer(
            viewerContainer, {
                size: {width: gv.imageWidth,height: gv.imageHeight} 
            },
          );
        gv.origin_viewer.setImage(gv.imageURL);
        gv.origin_viewer.setDepthmap(gv.tempDepth);
    }
    function fitImageToStage(stageWidth, stageHeight, imageWidth, imageHeight) {
        const imageAspectRatio = imageWidth / imageHeight;
        const stageAspectRatio = stageWidth / stageHeight;
      
        let fitWidth, fitHeight;
      
        if (stageAspectRatio > imageAspectRatio) {
          fitWidth = stageHeight * imageAspectRatio;
          fitHeight = stageHeight;
        } else {
          fitWidth = stageWidth;
          fitHeight = stageWidth / imageAspectRatio;
        }
      
        return {
          width: fitWidth,
          height: fitHeight,
        };
    }
    function response_size(){
        gv.canvasWidth = fitImageToStage(
          gv.stageWidth,
          gv.stageHeight,
          gv.imageWidth,
          gv.imageHeight
        ).width;
        gv.canvasHeight = fitImageToStage(
          gv.stageWidth,
          gv.stageHeight,
          gv.imageWidth,
          gv.imageHeight
        ).height;
        gv.depthPrevWidth = gv.canvasWidth;
        gv.depthPrevHeight = gv.canvasHeight;
        // depthPreview.width = gv.depthPrevWidth;
        // depthPreview.height = gv.depthPrevHeight;
    }

    window.addEventListener("resize", () => {
        gv.stageWidth = stage.clientWidth;
        gv.stageHeight = stage.clientHeight;
        response_size();
    });

    return (
        <div>
            {isLoading ? (
                <UploadLoader progress={downloadProgress} />
            ) : (
                <div>
                    <nav className="navbar" style={{position: 'unset', paddingRight:10, padding:'5px 0'}}>
                        <div className="nav-wrapper">
                            <div className="nav-container">
                                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                    <img src="./logo.png" 
                                        loading="eager" alt="" className="nav-brand" style={{height:'2.2rem'}} />
                                </a>
                                <div className="nav-container-right" style={{paddingRight:10}}>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-input"
                                    />
                                    <label htmlFor="file-input" className="cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors py-2 px-4 rounded" style={{marginBottom:0}}>
                                        + Upload
                                    </label>
                                    {/* <button 
                                        onClick={handleUpload}
                                        className="bg-blue-500 text-white hover:bg-blue-600 transition-colors py-2 px-4 rounded perform-upload"
                                    >
                                        {file != null ? 'Play' : 'No File'}
                                    </button> */}
                                    <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        aria-haspopup="true"
                                        aria-expanded={isOpen}
                                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                                    >
                                        <img
                                            src="./userlogo.png"
                                            width={40}
                                            style={{
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </div>
                                    <Dropdown isOpenDrop={isOpen} setIsOpenDrop={setIsOpen} />
                                </div>
                            </div>
                        </div>
                    </nav>
        
                    <div className="flex flex-col items-center">
                        <AnimationPage />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageComponent;