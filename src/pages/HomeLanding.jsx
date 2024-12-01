import { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import SectionTools from './LandingPages/sectionTools'
import SectionApp from './LandingPages/sectionApp'
import SectionCreators from './LandingPages/sectionCreators'
import SectionNeural from './LandingPages/sectionNeural'
import Footer from './LandingPages/footer'

const HomeLanding = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    let [valByScroll, setValByScroll] = useState(0);
    let [logoSize, setLogoSize] = useState(0);
    const videoRef = useRef(null);

    window.onscroll = function () {
        dspByScroll();
    }
    function dspByScroll() {
        if(document.documentElement.scrollTop <= 378){
            setValByScroll(document.documentElement.scrollTop);
        }
    }

    useEffect(() => {
        setLogoSize(2.5 - valByScroll/378);
    }, [valByScroll]);

    useEffect(() => {
        const video = videoRef.current;
        if(video){
            video.muted = true;
            video.play().catch((error) => {
                console.error('Autoplay failed:', error);
            });
        }
    }, [])

    return (
        <>
            <div className="page-wrapper">
                <nav className="navbar">
                    <div className="nav-wrapper">
                        <div className="nav-container">
                            <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
                                <img src="./logo.png" loading="eager" data-w-id="abe3504f-abe0-74f0-87b5-91de36bb01fb" alt="lenticular" className="nav-brand" style={{willChange: 'width, height', height: `${!logoSize ? '2.5' : logoSize}rem`, minHeight:'1.5rem', maxHeight:'2.5rem'}} />
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
                                <div data-w-id="5818b669-6883-997b-dea1-ad9b9145464a" className="burger">
                                    <div className="burger-line-top"></div>
                                    <div className="burger-line-middle"></div>
                                    <div className="burger-line-bottom"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu" style={{willChange: 'opacity',opacity:`calc(0 + ${valByScroll/378})`}}>
                        <a href="/#motion" className="navlink w-inline-block">
                            <div>2D to 3DMotion</div>
                        </a>
                        <NavLink to="/contact" className="navlink w-inline-block">Contact Us</NavLink>
                        <a href="https://discord.gg/tokenstormfun" target="_blank" className="navlink w-inline-block">
                            <div>Discord</div>
                        </a>
                    </div>
                    <div className="navbar_menu-mobile">
                        <div className="container_large-copy">
                            <a id="w-node-a98d28af-448d-971b-0d7a-75d2967ed96b-36bb01f7" href="/#motion" className="navlink-mobile w-inline-block">
                                <div className="text-size-regular">Products</div>
                                <div className="icon_20x20-solid text-color-dark100">
                                    <div className="icon"></div>
                                </div>
                            </a>
                            <a id="w-node-d5575a52-2454-2d79-5cff-2b32fa8d137d-36bb01f7" href="https://discord.gg/tokenstormfun" target="_blank" className="navlink-mobile w-inline-block">
                                <div className="text-size-regular">Discord</div>
                                <div className="icon_20x20-solid text-color-dark100">
                                    <div className="icon"></div>
                                </div>
                            </a>
                            <a id="w-node-_59f4e24a-b438-2d6e-1a9a-f68d63f474df-36bb01f7" href="/faqs" className="navlink-mobile w-inline-block">
                                <div className="text-size-regular">FAQ</div>
                                <div className="icon_20x20-solid text-color-dark100">
                                    <div className="icon"></div>
                                </div>
                            </a>
                            <a id="w-node-_9c9921ca-15a4-42e4-2e69-66e3edfdbb86-36bb01f7" href="/contact" className="navlink-mobile w-inline-block">
                                <div className="text-size-regular">Contact Us</div>
                                <div className="icon_20x20-solid text-color-dark100">
                                    <div className="icon"></div>
                                </div>
                            </a>
                        </div>
                        <div className="c-menu-bottom">
                            <NavLink to={!user ? "/signin" : "/upload"} className="navbar-button w-button">Try Now</NavLink>
                            {
                                (user == null || !user)
                                ? <NavLink to="/signin" className="navlink w-inline-block">
                                    <div>Sign In</div>
                                </NavLink>
                                : <></>
                            }
                        </div>
                    </div>
                </nav>
                
                <div className="main-wrapper">
                    <section className="section_hero">
                        <div className="hero">
                            <div className="hero-container">
                                <div className="padding-global">
                                    <div className="container align-center gap-small" style={{willChange: 'opacity',opacity:`calc(0 + ${valByScroll/378})`}}>
                                        <h1 id="w-node-_4146ae31-843e-6155-a933-3f3f49478edd-7b225824" className="heading-style-h1 large">Lenticular Content</h1>
                                        <p id="w-node-_4146ae31-843e-6155-a933-3f3f49478edf-7b225824" className="text-size-xlarge">The platform converting images into 3D</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hero_video-wrapper">
                                <div className="hero_video-mask" style={{willChange: 'width, height',height: `calc(${valByScroll}% / 378 * 100)`}}></div>
                                <div data-poster-url="" data-video-urls="./anim_1.mp4,./anim_1.mp4" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="hero_video w-background-video w-background-video-atom">
                                    <video id="4146ae31-843e-6155-a933-3f3f49478ee4-video" ref={videoRef} autoPlay loop muted playsInline="" data-wf-ignore="true" data-object-fit="cover" style={{backgroundImage:"url()"}}>
                                        <source src="./anim_1.mp4" data-wf-ignore="true"/>
                                        <source src="./anim_1.mp4" data-wf-ignore="true"/>
                                    </video>
                                </div>
                            </div>
                            <div className="popup-wrap">
                                <div className={`popup-inner ${valByScroll > 0 ? 'nonPopup' : 'dspPopup'}`}>
                                    <div className="popup-text_wrap">
                                        <p className="text-size-medium">Generate 2D image 3D Motion with Lenticular</p>
                                    </div>
                                    <a href="/#motion" className="button w-button">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <SectionTools />
                    {/* <SectionApp /> */}
                    {/* <SectionCreators /> */}
                    {/* <SectionNeural /> */}
                    <Footer />
                    <img src="https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/663a4754e856524d9a4f0337_bg.svg" loading="eager" alt="" className="bg-home"/>
                    <div className="loader"></div>
                </div>
        </div>
        </>
    )
}

export default HomeLanding;