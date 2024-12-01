import { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import Loader from '../../common/Loader/index';
import axios from 'axios';

const Dropdown = ({ isOpenDrop, setIsOpenDrop }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDrop(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div>
            {isOpenDrop && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-max bg-white border rounded shadow-lg z-10 top-11"
                    role="menu"
                >
                    <div >
                        <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item">
                            {`${user.admin.name} (${user.admin.userId})` }
                        </button>
                    </div>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/account');
                        window.location.reload();
                    }}>
                        <ManageAccountsOutlinedIcon />
                        Manage Account
                    </button>
                    {/* <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/pricing');
                        window.location.reload();
                    }}>
                        <SellOutlinedIcon />
                        Pricing
                    </button> */}
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/newsroom');
                        window.location.reload();
                    }}>
                        <NewspaperOutlinedIcon />
                        News
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/faqs');
                        window.location.reload();
                    }}>
                        <LiveHelpOutlinedIcon />
                        FAQs
                    </button>
                    <button className="flex items-center gap-1.5 py-2 px-3 font-medium duration-300 ease-in-out lg:text-base drop-item"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/contact');
                        window.location.reload();
                    }}>
                        <ContactPageOutlinedIcon />
                        Contact Us
                    </button>
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
                        <LogoutOutlinedIcon />
                        Log Out
                    </button>
                </div>
            )}
        </div>
    )
}

export default Dropdown;