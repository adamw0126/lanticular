import { Box, Button } from '@mui/material'
import React from 'react'
import FaqItem from './FaqItem'

function Faq() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px', paddingLeft: '2rem', paddingRight: '2rem' }}>
            <h1>Welcome to Lenticular FAQs</h1>
            <h4 style={{ maxWidth: '765px', textAlign: 'center' }}>Dive into our FAQ for insights into both basic and advanced features, ensuring you get the most from our AI tool.</h4>
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
                marginTop: '100px'
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
                            backgroundColor: '#111',
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
                            backgroundColor: '#111',
                            borderRadius: '1rem',
                            flexFlow: 'column',
                            width: '100%',
                            height: 'auto',
                            padding: '2rem',
                            display: 'flex'
                        }}>
                            <p>Join our Discord</p>
                            <p>community to connect with fellow Lenticular users.</p>
                            <Button variant="contained" color='secondary' sx={{ borderRadius: '20px' }} >Discord</Button>
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
                        overflowX: 'scroll',
                        marginBottom: '20px'
                    }}>
                        <Button color='secondary' variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%'}}>General & 3D Motion</Button>
                        <Button color='secondary' variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%'}}>
                            <span style={{ padding: '1px', borderRadius: '3px', backgroundColor: '#e0c2ff', color: 'black' }}>NEW</span>
                            &nbsp; 2D to 3D Video
                        </Button>
                        <Button color='secondary' variant='contained' sx={{marginLeft: '16px', marginRight: '16px', minWidth: '40%'}}>2D to 3D Image</Button>
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
                                <FaqItem />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Faq