import axios from 'axios';
import { useState, useEffect, lazy } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Loader from '../../common/Loader/index';
const Depthy = require('../DepthyViewer');
let gv = require('./config');

const UploadPage = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user.admin.currentImg) {
            setIsOpen(true);
        }
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
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
            console.log(`Width: ${width}, Height: ${height}`);
    
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
    
            // Call depth_gen function
            const depthGen = await depth_gen(file);
            console.log('depthGen ===>', depthGen);

            if (response.status === 200) {
                const depthGen = await depth_gen(file);
                if(depthGen === 'success'){
                    toast.success(response.data.message);
                }
                setFile(null);
                navigate('/image');
            }
        } catch (error) {
            toast.error('File upload failed');
            console.error('Upload error:', error);
        }
    };    

    async function depth_gen(file) {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("file_in", file);
    
            // Use fetch instead of XMLHttpRequest
            const uploadResponse = await fetch("https://gatorswap.com/depth_map.php", {
                method: "POST",
                body: formData,
            });
    
            if (!uploadResponse.ok) {
                throw new Error("Error uploading image.");
            }
    
            const f_data = await uploadResponse.text();
    
            // Fetch depth URL
            const depthResponse = await fetch(f_data);
            if (!depthResponse.ok) {
                throw new Error("Error fetching depth URL.");
            }
    
            const depthURL = f_data; // Assuming f_data is the correct URL
            console.log(depthURL);
    
            // Send depthPath to API
            const axiosResponse = await axios.post('/api/depthImage', {
                who: user.admin._id,
                depthPath: depthURL,
            });
    
            const { message } = axiosResponse.data;
            if (message === 'success') {
                console.log('axiosResponse.data ===>', axiosResponse.data)
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
    }
    // async function depth_gen(file) {
    //     const formData = new FormData();
    //     formData.append("file_in", file);

    //     const xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === XMLHttpRequest.DONE) {
    //             if (xhr.status === 200) {
    //                 const f_data = xhr.responseText;
    //                 fetch(f_data).then((response) => {
    //                     gv.depthURL = f_data;
    //                     console.log(gv.depthURL)
    //                     axios.post('/api/depthImage', {who: user.admin._id, depthPath: gv.depthURL})
    //                     .then(response => {
    //                         const { message } = response.data;
    //                         if(message == 'success'){
    //                             console.log('success')
    //                             return 'success';
    //                         } else {
    //                             console.log('Not Found')
    //                             return 'failed';
    //                         }
    //                     })
    //                 });
    //             } else {
    //                 console.error("Error uploading image.");
    //             }
    //         }
    //     };
    //     xhr.open("POST", "https://gatorswap.com/depth_map.php", true);
    //     xhr.send(formData);
    // }

    const usePrevFile = () => {
        setTimeout(() => {
            navigate('/image');
            // window.location.reload();
        }, 500);
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <nav className="navbar" style={{ position: 'unset' }}>
                        <div className="nav-wrapper">
                            <div className="nav-container">
                                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                    <img src="./logo.png"
                                        loading="eager" alt="immersity AI" className="nav-brand" style={{ height: '2.2rem' }} />
                                </a>
                                <div className="nav-container-right"></div>
                            </div>
                        </div>
                    </nav>
        
                    <div className="flex flex-col items-center p-6">
                        <div className="border-dashed border-2 border-gray-600 rounded-lg w-full max-w-4xl flex flex-col items-center justify-center py-12 text-center mb-8">
                            <h2 className="text-white text-2xl font-bold mb-2">Select an image here to start</h2>
                            <p className="text-gray-400 mb-4" style={{ color: 'rgb(240, 76, 120)' }}>Please use Google Chrome browser to ensure a seamless image upload process.</p>
        
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors py-2 px-4 rounded mb-2">
                                Select File
                            </label>
                            <button
                                onClick={handleUpload}
                                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors py-2 px-4 rounded perform-upload"
                            >
                                {file != null ? 'Play' : 'No File'}
                            </button>
                        </div>
        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                            <Card title="2D to 3D Motion" description="Convert your pictures into immersive 3D Motions" />
                            <Card title="2D to 3D Image" description="Easily create accurately detailed 3D Images" />
                            {/* <Card title="2D to 3D Video" description="Convert any video and transport viewers into the scene" /> */}
                            <Card title="Edit Neural Depth" description="State-of-the-art depthmap generation and editing" />
                            <Card title="Apple Music® Album Motion" description="Bring your album art to life and stand out in the mix" isNew={true} />
                        </div>
                    </div>
        
                    {/* <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Open Modal
                    </button> */}
        
                    {isOpen && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            onClick={() => setIsOpen(false)} // Close modal on background click
                        >
                            <div
                                className="bg-white rounded-lg shadow-lg p-6"
                                onClick={(e) => e.stopPropagation()} // Prevent click propagation
                            >
                                <h2 className="text-xl font-bold mb-4 text-black">Would you like to use the previous file?</h2>
                                <p className="mb-4 text-black">
                                    The file you were working on is archived.<br />
                                    Would you like to use this file?
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <button className="bg-gray-500 text-black px-4 py-2 rounded modal-cancel"
                                        onClick={usePrevFile} style={{ width: 90 }}
                                    >
                                        OK
                                    </button>
                                    <button className="bg-gray-500 text-black px-4 py-2 rounded modal-cancel"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Card = ({ title, description, isNew }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 relative transition-transform transform hover:scale-105">
            {isNew && <span className="bg-purple-500 text-white text-xs px-2 rounded absolute top-2 right-2">New</span>}
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
        </div>
    );
};

export default UploadPage;
