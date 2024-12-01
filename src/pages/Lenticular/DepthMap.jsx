import React from 'react';
import LeftSection from './LeftSection';
import DepthMapRightSidebar from './DepthMapRightSidebar';
import DepthMapLeftSection from './DepthMapLeftSection';
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { lazy } from 'react';

const DepthMap = () => {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
            toast.error('File type must be image.');
            return;
        }
        if (file.size / 1024 / 1024 > 20) {
            toast.error('File size must be smaller than 20MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Correct way to append file
        formData.append('userId', user.admin.userId); // Correct way to append userId

        try {
            const response = await axios.post('/api/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status == 200) {
                toast.success(response.data.message);
                setFile(null);
                // setTimeout(() => {
                navigate('/image');
                window.location.reload();
                // }, 500);
            }
        } catch (error) {
            toast.error('File upload failed');
            console.error('Upload error:', error);
        }
    };
    return (
        <div>
            <nav className="navbar" style={{ position: 'unset', paddingRight: 10, padding: '5px 0' }}>
                <div className="nav-wrapper">
                    <div className="nav-container">
                        <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                            <img src="../logo.png"
                                loading="eager" alt="" className="nav-brand" style={{ height: '2.2rem' }} />
                        </a>
                        <div className="nav-container-right" style={{ paddingRight: 0 }}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors py-2 px-4 rounded" style={{ marginBottom: 0 }}>
                                + Upload
                            </label>
                            <button
                                onClick={handleUpload}
                                className="bg-blue-500 text-white hover:bg-blue-600 transition-colors py-2 px-4 rounded perform-upload"
                            >
                                Perform Upload
                            </button>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                aria-haspopup="true"
                                aria-expanded={isOpen}
                                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                <img
                                    src="../userlogo.png"
                                    width={40}
                                    style={{
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                            {isOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-35 bg-white border rounded shadow-lg z-10 top-11"
                                    role="menu"
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsOpen(false);
                                        }}
                                        className="block px-3 py-2 drop-item decoration-transparent duration-300 ease-in-out" role="menuitem"
                                    >
                                        Option 1
                                    </a>
                                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            localStorage.removeItem("userInfo");
                                            navigate('/');
                                            window.location.reload();
                                        }}>
                                        <svg
                                            className="fill-current"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                                fill=""
                                            />
                                            <path
                                                d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                                fill=""
                                            />
                                        </svg>
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="app-container">
                <div className="left-section">
                    <DepthMapLeftSection />
                </div>
                <div className="right-sidebar">
                    <DepthMapRightSidebar/>
                </div>
            </div>
        </div>
    );
};

export default DepthMap;