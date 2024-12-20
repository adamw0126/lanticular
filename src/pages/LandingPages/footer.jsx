import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="padding-global">
                <div className="container_large gap-large align-center">
                    <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae6ef-24eae6ec" className="hr"></div>
                    {/* <NavLink to={'/newsroom'}>Newsroom</NavLink>
                    <NavLink to={'/faqs'}>FAQs</NavLink> */}
                    {/* <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae6f0-24eae6ec" className="footer_menu">
                        <a href="/faqs" className="footer_navlink w-inline-block">
                            <div className="text-size-small">FAQ</div>
                        </a>
                        <a href="/contact" className="footer_navlink w-inline-block">
                            <div className="text-size-small">Contact Us</div>
                        </a>
                    </div> */}
                    <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae703-24eae6ec" className="container gap-normal align-center">
                        <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae704-24eae6ec" className="footer_container">
                            <a id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae705-24eae6ec" href="/" aria-current="page" className="footer_brand w-inline-block w--current">
                                <img src="./logo.png" loading="eager" id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae706-24eae6ec" alt="lenticular" className="footer_brand-item"/>
                            </a>
                            <p id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae707-24eae6ec" className="text-size-regular">Lenticular is the platform for tools enabling image and video conversion into 3D for all supporting platforms including disparity mapping, depth and motion editing.</p>
                        </div>
                        <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae709-24eae6ec" className="container_wrap gap_tiny">
                            <a title="Instagram" href="" target="_blank" className="footer_social w-inline-block">
                                <div className="icon"></div>
                            </a>
                            <a title="Tik Tok" href="" target="_blank" className="footer_social w-inline-block">
                                <div className="icon"></div>
                            </a>
                            <a title="X - Twitter" href="" target="_blank" className="footer_social w-inline-block">
                                <div className="icon"></div>
                            </a>
                            <a title="Discord" href="https://discord.gg/tokenstormfun" target="_blank" className="footer_social w-inline-block">
                                <div className="icon"></div>
                            </a>
                        </div>
                        <div id="w-node-_66c2c61a-dc6e-4a0c-82d9-c6f724eae716-24eae6ec" className="container_wrap gap-small">
                            <div className="text-size-small">Copyright © 2024 Lenticular Co.</div>
                            <a href="/privacy-policy" className="footer_link">Privacy Policy</a>
                            {/* <a href="/legal/terms-conditions" className="footer_link">Terms &amp;Conditions</a> */}
                            {/* <a href="/legal/community-guidelines" className="footer_link">Community Guidelines</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;