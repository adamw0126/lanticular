import { useState } from "react";
import { NavLink } from 'react-router-dom';
import PolicyContent from "./policyContent";
import LandingDropdown from "./landingDrop";
import { useMediaQuery } from 'react-responsive';

export default function PrivacyPolicy() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 440 });

    return (
        <div>
            <nav className="navbar in-navbar">
                <div className="nav-wrapper">
                    <div className="nav-container">
                        <a href="/" aria-current="page" style={{ paddingLeft: isMobile && '10px' }} className="nav-brand-wrapper w-inline-block w--current">
                            <img src="./logo.png"
                                loading="eager" alt="" className="nav-brand" style={{ height: '1.8rem' }} />
                        </a>
                        <div className="nav-container-right">
                            {
                                (user == null || !user)
                                    ? <NavLink to="/signin" className="navlink w-inline-block">
                                        <div>Sign In</div>
                                    </NavLink>
                                    : <></>
                            }
                            <NavLink to={!user ? "/signin" : "/upload"} className="navbar-button w-button">Try Now</NavLink>
                            <div data-w-id="5818b669-6883-997b-dea1-ad9b9145464a" className="burger" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                                <div className="burger-line-top"></div>
                                <div className="burger-line-middle"></div>
                                <div className="burger-line-bottom"></div>
                            </div>
                            <LandingDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ marginTop: 80 }}>
                <PolicyContent />
            </div>
        </div>
    );
}
