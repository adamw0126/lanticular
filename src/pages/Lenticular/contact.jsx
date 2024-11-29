import { NavLink } from 'react-router-dom';

const Contact = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return (
        <div>
            <nav className="navbar">
                    <div className="nav-wrapper">
                        <div className="nav-container">
                            <div className="nav-wrapper">
                                <div className="nav-container">
                                    <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                        <img src="./logo.png"
                                            loading="eager" alt="immersity AI" className="nav-brand" style={{ height: '2.2rem' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="nav-container-right">
                                {
                                    (user == null || !user)
                                    ? <NavLink to="/signin" style={{width:120}} className="navlink w-inline-block">
                                        <div>Sign In</div>
                                    </NavLink>
                                    : <></>
                                }
                                <NavLink to={!user ? "/signin" : "/upload"} style={{width:130}} className="navbar-button w-button">Try Now</NavLink>
                            </div>
                        </div>
                    </div>
            </nav>
            
            <div className="no-fillpage">
                <h1>Our Contact Infomation</h1>
            </div>
        </div>
    )
}

export default Contact;