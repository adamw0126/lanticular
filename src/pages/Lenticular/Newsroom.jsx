import React from 'react'
import NewsItem from './NewsItem'
import { Box } from '@mui/material'
import Footer from '../LandingPages/footer'

const newsList = [
    {url: 'https://s3.us-east-1.amazonaws.com/static.immersity.ai/videos/Album+Motion_Banner+No+Logo_241106_1080p.mp4', date: 'November 7, 2024', title: 'Introducing Apple Music® Album Motion with Lenticular', type: 'Blog', isVideo: true},
    {url: 'https://s3.us-east-1.amazonaws.com/static.immersity.ai/videos/Immersity+AI+for+Apple+Music.mp4', date: 'November 7, 2024', title: 'Bands Can Now Add 3D Motion to Album Art on Apple Music with Lenticular', type: 'Press Release', isVideo: true},
    {url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e28873893/66e411e52a9e11ad172db761_large-0924-Archana%20Aneja%20Newsletter%20Still.png', date: 'September 13, 2024', title: 'Archana Aneja', type: 'Blog', isVideo: false},
    {url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e28873893/66dafd95b796a77b127a333d_Fashion%20week2.png', date: 'September 1, 2024', title: 'Immersive Fashion Week', type: 'Tutorials', isVideo: false},
    {url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e28873893/66daf60eb7409c4b64689546_66430b0dd8af1d48e3b1ef4a_octopus_1024x720.webp', date: 'July 1, 2024', title: 'v3.1: Export Flow updated', type: 'Update', isVideo: false},
    {url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e28873893/66db060585b6f47550fba731_Main%20image.png', date: 'June 1, 2024', title: 'Lenticular adds 2D-to-3D Video Conversion', type: 'Press Release', isVideo: false},
    {url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e28873893/66db06eb97593d241448d0f0_New%20version.png', date: 'May 22, 2024', title: 'Introducing Lenticular!', type: 'Upda+te', isVideo: false},
]

function Newsroom() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px', paddingLeft: '2rem', paddingRight: '2rem', maxWidth: '87rem', width: '100%', zIndex: '1' }}>
            <h1>News & Tutorials</h1>
            <h4 style={{ maxWidth: '765px', textAlign: 'center' }}>Stay updated with our latest news, and unlock the full potential of Lenticular with our tutorials. Whether you're a beginner or looking to refine your skills, discover the best practices and tips to transform your creations.</h4>
            <Box sx={{
                bgcolor: '#2f2f3740',
                height: 'auto',
                width: '100%',
                padding: '1rem',
                borderRadius: '1.5rem',
            }}>
                <NewsItem videoUrl="https://s3.us-east-1.amazonaws.com/static.immersity.ai/videos/Kimberly+Offord_Blog_Backup.mp4" date="November 27, 2024" title="At the Intersection" type="Blog" isVideo={true} />
                <Box sx={{
                    display: 'grid',
                    gridColumnGap: '1rem',
                    gridRowGap: '1rem',
                    borderRadius: '1.5rem',
                    gridTemplateRows: 'auto auto',
                    gridTemplateColumns: '1fr 1fr',
                    gridAutoColumns: '1fr',
                    height: 'auto',
                    width: '100%',
                    marginTop: '1rem'
                }} >

                {
                    newsList.map((item, index) => (
                        <NewsItem key={index} videoUrl={item.url} date={item.date} title={item.title} type={item.type} isVideo={item.isVideo} />
                    ))
                }

                </Box>
            </Box>
            <Footer/>
        </div >
    )
}

export default Newsroom