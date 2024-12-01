import { Button } from '@mui/material'
import React from 'react'
function NewsItem({ videoUrl, date, title, type, isVideo }) {
    return (
        <div style={{ backgroundColor: '#0a0a0c80', padding: '24px', borderRadius: '0.75rem' }}>
            <div>
                {isVideo ? (
                    <video autoPlay loop muted playsInline style={{ borderRadius: '0.75rem' }}>
                        <source src={videoUrl} />
                    </video>
                ) : (
                    <img src={videoUrl} style={{ borderRadius: '0.75rem' }} />
                )}
            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <span style={{ backgroundColor: '#9a9aac', borderRadius: '5px', marginRight: '10px', padding: '5px' }}>{type}</span>
                <span>{date}</span>
            </div>
            <h2>{title}</h2>
            <Button color='secondary'>Read More</Button>
        </div>
    )
}

export default NewsItem