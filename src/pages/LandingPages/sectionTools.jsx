import { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';

const SectionTools = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    let [is2D, setIs2D] = useState(false);
    const videoRef = useRef(null);

    const change2DTo3D = (param) => {
        if(param == 0){
            setIs2D(true);
        } else {
            setIs2D(false);
        }
    }

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
        <section id="motion" className="section_tools">
        <div className="padding-global">
            <div className="container_large gap-large">
                <div id="w-node-_2f559bd0-4d76-57df-cfb0-2206704edbf7-7b225824" data-current="2D to 3D Motion" data-easing="ease" data-duration-in="0" data-duration-out="0" className="tabs w-tabs">
                    <div className="tabs-menu scroll_y w-tab-menu">
                        <a data-w-tab="2D to 3D Motion" className="scroll heading-style-h2">
                            <div className="tab-label">2D to 3D Motion</div>
                        </a>
                        {/* <a data-w-tab="2D TO 3D Video" className="tab-link scroll w-inline-block w-tab-link w--current">
                            <div className="tab-link-container">
                                <div className="tag_new">NEW</div>
                                <div className="tab-label">2D to 3D Video</div>
                            </div>
                        </a>
                        <a data-w-tab="2D to 3D Image" className="tab-link scroll w-inline-block w-tab-link">
                            <div className="tab-label">2D to 3D Image</div>
                        </a> */}
                    </div>
                    <div className="w-tab-content">
                        <div data-w-tab="2D to 3D Motion" className="w-tab-pane w--tab-active">
                            <div id="w-node-_98d296ec-d786-3a81-4b2c-bcaab8d23c77-7b225824" className="container_primary">
                                <div className="w-layout-grid grid_primary">
                                    <div className="container_secondary">
                                        <div className="container gap-normal">
                                            <h3 className="heading-style-h3">Transform any Image.</h3>
                                            <p id="w-node-a6b5bfa6-dd51-62b2-cf0a-165d6d8afd05-7b225824" className="text-size-large text-color-light500">
                                                Convert your 2D Image into a 3D motion, adding an extra dimension with depth by movement. 
<br/>
                                                <br/>Create depth and motion fast and with full control on your camera path, with our instant previews before the conversion.
                                            </p>
                                        </div>
                                        <NavLink to={!user ? "/signin" : "/upload"} className="navbar-button w-button">Try Now</NavLink>
                                    </div>
                                    <div id="w-node-_03bd3d16-fd9e-51dd-4083-176ce369b92f-7b225824" className="motion-element">
                                        <div className="motion-wrapper">
                                            {/* <a href="" target="_blank" className="motion_creator motion">@simplifyerx</a> */}
                                            <div className="motion_3d-wrapper">
                                                {
                                                    is2D ? <img sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 90vw, 91vw" srcSet="./anim_2.mp4 500w, ./anim_2.mp4 800w, ./anim_2.mp4 1024w" alt="immersity AI" src="./cat.jpg" loading="eager" className="motion_img-2d"/> :
                                                    <video id="03bd3d16-fd9e-51dd-4083-176ce369b953-video" ref={videoRef} autoPlay loop style={{backgroundImage:"url()"}} muted playsInline="" data-wf-ignore="true" data-object-fit="cover">
                                                        <source src="./anim_2.mp4" data-wf-ignore="true"/>
                                                        <source src="./anim_2.mp4" data-wf-ignore="true"/>
                                                    </video>
                                                }
                                            </div>
                                            <div className="motion_2d-wrapper">
                                                <img sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 90vw, 91vw" srcSet="./cat.jpg 500w, ./cat.jpg 800w, ./cat.jpg 1024w" alt="immersity AI" src="./cat.jpg" loading="eager" className="motion_img-2d"/>
                                            </div>
                                        </div>
                                        <div data-w-id="03bd3d16-fd9e-51dd-4083-176ce369b95c" className="motion_toggle">
                                            <div style={{opacity: is2D ? 1 : 0.25}} className="motion_toggle-2d" onClick={() => change2DTo3D(0)}>
                                                <img loading="eager" src="https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/664861f0678aa564e834187e_toggle-2D.svg" alt="2D" className="toggle-img"/>
                                            </div>
                                            <div style={{opacity: is2D ? 0.25 : 1}} className="motion_toggle-3d" onClick={() => change2DTo3D(1)}>
                                                <img loading="eager" src="https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/664861f0ecf05579217a6600_toggle-3D.svg" alt="3D Motion" className="toggle-img"/>
                                            </div>
                                            <div className={`motion_toggle-item ${is2D ? 'motion2D' : 'motion3D'}`}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default SectionTools;