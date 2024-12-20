import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContactForm from './contact_info';
import {useMediaQuery} from 'react-responsive';
import LandingDropdown from '../LandingPages/landingDrop'
import SubFooter from '../LandingPages/footerSub';

const Contact = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const isMobile = useMediaQuery({ maxWidth: 450 });
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className="navbar in-navbar">
                <div className="nav-wrapper">
                    <div className="nav-container">
                        <div className="nav-wrapper">
                            <div className="nav-container">
                                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current" style={{paddingLeft: isMobile && 0}}>
                                    <img
                                        src="./logo.png"
                                        loading="eager"
                                        alt=""
                                        className="nav-brand"
                                        style={{ height: '1.8rem' }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="nav-container-right">
                            {(!user || user === null) && (
                                <NavLink to="/signin" style={{ width: 120 }} className="navlink w-inline-block">
                                    <div>Sign In</div>
                                </NavLink>
                            )}
                            <NavLink
                                to={!user ? "/signin" : "/upload"}
                                style={{ width: 130 }}
                                className="navbar-button w-button"
                            >
                                Try Now
                            </NavLink>
                            <div data-w-id="5818b669-6883-997b-dea1-ad9b9145464a" className="burger" onClick={() => setIsOpen(!isOpen)} style={{cursor:'pointer'}}>
                                <div className="burger-line-top"></div>
                                <div className="burger-line-middle"></div>
                                <div className="burger-line-bottom"></div>
                            </div>
                            <LandingDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                </div>
            </nav>
            
            <div style={{marginTop:'90px', textAlign:'center'}}>
                <h1>Contact Us</h1>
                <div style={{fontWeight:400, fontSize:'21px'}}>
                    Please ensure you read our <NavLink to="/faqs">FAQ</NavLink> before reaching out.
                </div>
                <div>
                    <ContactForm />
                </div>
            </div>
            
            <SubFooter />
        </div>
    )
}

export default Contact;