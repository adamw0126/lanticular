import { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingDropdown = ({ isOpen, setIsOpen }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
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
        }
    }, [])

    return (
        <div>
            {
                isOpen && (
                    <div ref={dropdownRef}
                        className="absolute right-0 mt-2 w-max bg-white border rounded shadow-lg z-10 top-11"
                        role="menu">
                        <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                        onClick={(e) => {
                            e.preventDefault();
                            if(!user){
                                navigate('/signin');
                            } else {
                                navigate('/upload');
                            }
                            // window.location.reload();
                        }}>
                            {/* <NewspaperOutlinedIcon /> */}
                            {!user ? "Sign In" : "Try Now"}
                        </button>
                        {
                            !user ? (
                                <div>
                                    <a href='/#motion' className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item" style={{textDecoration:'none'}}>
                                        {/* <NewspaperOutlinedIcon /> */}
                                        2D to 3DMotion
                                    </a>
                                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/contact');
                                    }}>
                                        {/* <NewspaperOutlinedIcon /> */}
                                        Contact Us
                                    </button>
                                    <a href='https://discord.gg/tokenstormfun' className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item" style={{textDecoration:'none'}}>
                                        {/* <NewspaperOutlinedIcon /> */}
                                        Discord
                                    </a>
                                </div>
                            ) : (
                                <div>
                                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const result = await axios.post('/api/logout', { who: user.admin._id });
                
                                        if (result.data.message == 'logout') {
                                            console.log('logout')
                                        }
                                        localStorage.removeItem("userInfo");
                                        navigate('/');
                                        window.location.reload();
                                    }}>
                                        {/* <LogoutOutlinedIcon /> */}
                                        Log Out
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default LandingDropdown;