import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom';
import FaqItem from './FaqItem'
import Dropdown from './dropdown';

function Faq() {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const isMobile = useMediaQuery({ maxWidth: 610 });
    const [value, setValue] = useState('motion');

    const handleThis = (param) => {
        setValue(param);
    }
    
    return (
        <div>
            <nav className="navbar in-navbar">
                <div className="nav-wrapper">
                    <div className="nav-container">
                        <div className="nav-wrapper">
                            <div className="nav-container">
                                <a href="/" aria-current="page" className="nav-brand-wrapper w-inline-block w--current">
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
                            <Dropdown />
                        </div>
                    </div>
                </div>
            </nav>
            {
                isMobile ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    <h2 style={{textAlign:'center'}}>Welcome to Lenticular FAQs</h2>
                    <h4 style={{ textAlign: 'center', marginTop: 10 }}>Dive into our FAQ for insights into both basic and advanced features, ensuring you get the most from our AI tool.</h4>
                    <Box sx={{
                        gridArea: 'span 1 / span 1 / span 1 / span 1',
                        display: 'grid',
                        gridColumnGap: '4rem',
                        gridRowGap: '4rem',
                        gridTemplateRows: 'auto',
                        // gridTemplateColumns: '1fr 1fr 1fr',
                        width: '100%',
                        height: 'auto',
                        gridAutoColumns: '1fr',
                        marginTop: '30px'
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            overflow: 'hidden',
                            position: 'relative',
                            gridArea: 'span 1 / span 2 / span 1 / span 2'
                        }}>
                            <Box sx={{
                                aspectRatio: 'auto',
                                textAlign: 'center',
                                backgroundColor: '#2f2f3700',
                                borderRadius: '0',
                                marginBottom: '1rem',
                                padding: '0 0 1rem',
                                display: 'flex',
                                overflow: 'auto',
                                width: '100%',
                                height: 'auto',
                                overflowX: 'auto',
                                marginBottom: '20px',
                                justifyContent: 'center'
                            }}>
                                <Button className={value == 'motion' ? 'btn-color' : 'btn-color-un'} variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%',borderRadius:20}} onClick={() => handleThis('motion')}>General & 3D Motion</Button>
                                <Button className={value == '3video' ? 'btn-color' : 'btn-color-un'} variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%',borderRadius:20}} onClick={() => handleThis('3video')}>
                                    <span style={{ padding: '1px', borderRadius: '5px', backgroundColor: '#e0c2ff', color: 'black', fontSize: 10 }}>NEW</span>
                                    &nbsp; 2D to 3D Video
                                </Button>
                                {/* <Button color='secondary' variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%'}}>2D to 3D Image</Button> */}
                            </Box>
                            <Box sx={{
                                display: 'block',
                                position: 'relative',
                                overflow: 'hidden',
                                textAlign: 'left'
                            }}>
                                <Box sx={{
                                    opacity: '1',
                                    transition: 'all, opacity 300ms',
                                }}>
                                    <Box sx={{
                                        gridColumnGap: '.5rem',
                                        gridRowGap: '.5rem',
                                        textAlign: 'left',
                                        flexDirection: 'column',
                                        width: '100%',
                                        maxWidth: '64rem',
                                        height: 'auto',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'flex'
                                    }}>
                                        {
                                            value == 'motion'
                                            ? <FaqItem />
                                            : <></>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
                : 
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px', paddingLeft: '2rem', paddingRight: '2rem' }}>
                    <h2 style={{marginTop:20}}>Welcome to Lenticular FAQs</h2>
                    <h4 style={{ textAlign: 'center', marginTop: 20 }}>Dive into our FAQ for insights into both basic and advanced features, ensuring you get the most from our AI tool.</h4>
                    <Box sx={{
                        gridArea: 'span 1 / span 1 / span 1 / span 1',
                        display: 'grid',
                        gridColumnGap: '4rem',
                        gridRowGap: '4rem',
                        gridTemplateRows: 'auto',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        width: '100%',
                        height: 'auto',
                        gridAutoColumns: '1fr',
                        marginTop: '70px'
                    }}>
                        <Box sx={{
                            gridColumnGap: '0rem',
                            gridRowGap: '0rem',
                            gridTemplateRows: 'auto',
                            gridTemplateColumns: '1fr',
                            gridAutoColumns: '1fr',
                            placeItems: 'start',
                            textAlign: 'left',
                            display: 'grid',
                            position: 'relative'
                        }}>
                            <Box sx={{
                                gridColumnGap: '1rem',
                                gridRowGap: '1rem',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                position: 'sticky',
                                top: '8.5rem',
                                textAlign: 'left'
                            }}>
                                <Box sx={{
                                    gridColumnGap: '2rem',
                                    gridRowGap: '2rem',
                                    backgroundColor: '#141419',
                                    borderRadius: '1rem',
                                    flexFlow: 'column',
                                    width: '100%',
                                    height: 'auto',
                                    padding: '2rem',
                                    display: 'flex'
                                }}>
                                    <p><strong>Need more help?</strong></p>
                                    <p>Our support team is just a message away!</p>
                                </Box>
                                <Box sx={{
                                    gridColumnGap: '2rem',
                                    gridRowGap: '2rem',
                                    backgroundColor: '#141419',
                                    borderRadius: '1rem',
                                    flexFlow: 'column',
                                    width: '100%',
                                    height: 'auto',
                                    padding: '2rem',
                                    display: 'flex'
                                }}>
                                    <p>Join our Discord</p>
                                    <p>community to connect with fellow Lenticular users.</p>
                                    <Button variant="contained" className='btn-color' sx={{ borderRadius: '20px' }} >Discord</Button>
                                </Box>
                            </Box>
                            <Box sx={{
                                gridColumnGap: '0rem',
                                gridRowGap: '0rem',
                                textAlign: 'left',
                                flexDirection: 'column',
                                gridTemplateRows: 'auto',
                                gridTemplateColumns: '1fr',
                                gridAutoColumns: '1fr',
                                placeItems: 'start',
                                display: 'grid',
                                position: 'relative'
                            }}>
                            </Box>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            overflow: 'hidden',
                            position: 'relative',
                            gridArea: 'span 1 / span 2 / span 1 / span 2'
                        }}>
                            <Box sx={{
                                aspectRatio: 'auto',
                                textAlign: 'center',
                                backgroundColor: '#2f2f3700',
                                borderRadius: '0',
                                marginBottom: '1rem',
                                padding: '0 0 1rem',
                                display: 'flex',
                                overflow: 'auto',
                                width: '100%',
                                height: 'auto',
                                overflowX: 'auto',
                                marginBottom: '20px',
                                justifyContent: 'center'
                            }}>
                                <Button className={value == 'motion' ? 'btn-color' : 'btn-color-un'} variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%',borderRadius:20}} onClick={() => handleThis('motion')}>General & 3D Motion</Button>
                                <Button className={value == '3video' ? 'btn-color' : 'btn-color-un'} variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%',borderRadius:20}} onClick={() => handleThis('3video')}>
                                    <span style={{ padding: '1px', borderRadius: '5px', backgroundColor: '#e0c2ff', color: 'black', fontSize: 10 }}>NEW</span>
                                    &nbsp; 2D to 3D Video
                                </Button>
                                {/* <Button color='secondary' variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%'}}>2D to 3D Image</Button> */}
                            </Box>
                            <Box sx={{
                                display: 'block',
                                position: 'relative',
                                overflow: 'hidden',
                                textAlign: 'left'
                            }}>
                                <Box sx={{
                                    opacity: '1',
                                    transition: 'all, opacity 300ms',
                                }}>
                                    <Box sx={{
                                        gridColumnGap: '.5rem',
                                        gridRowGap: '.5rem',
                                        textAlign: 'left',
                                        flexDirection: 'column',
                                        width: '100%',
                                        maxWidth: '64rem',
                                        height: 'auto',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'flex',
                                    }}>
                                        {
                                            value == 'motion'
                                            ? <FaqItem />
                                            : <></>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
            }
        </div>
    )
}

export default Faq