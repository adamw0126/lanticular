import * as React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const components = [
    {
        title: 'Neural Depth Engine',
        description: 'The workhorse behind our technology, generating precise depth maps with unparalleled accuracy.',
        url: "https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/66401d1bd42e5f5dc52e96ee_Machu_4k_disparity_inferno-transcode.mp4", // replace with actual image URLs
    },
    {
        title: 'Neural Depth Navigator',
        description: 'Algorithms that allow you to move the virtual camera in 3D space within an image, creating new perspectives and viewpoints.',
        url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/6640141a8baf407d22bb4c49_Machu_Circ_640x480-transcode.mp4',
    },
    {
        title: 'Neural Depth Enhancer',
        description: 'Tools for depth-based image processing utilizing depth maps to enhance visual content, including synthetic depth of field, recoloring, and relighting.',
        url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/664013d0f7577e7a4d721864_Machu_Relight_640x480-transcode.mp4',
    },
    {
        title: 'Neural Depth Composer',
        description: 'Techniques for editing and merging depth layers, enabling complex integrations like inserting 3D text partially obscured by 3D features within an image.',
        url: 'https://cdn.prod.website-files.com/6639cdf0b2b3923e2887386c/6640148ed42e5f5dc526a19e_Machu_Layers-transcode.mp4',
    },
];

export default function ComponentsGrid() {
    return (
        <Box sx={{ p: 7, backgroundColor: '#0a0a0c' }}>
            <div className='flex justify-center'>
                <h2>Components</h2>
            </div>
            <div style={{margin:'30px 0', textAlign:'center'}}>
                A comprehensive suite of sophisticated tools enabling you to create a heightened sense of realism.
            </div>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }, gap: 3, padding: 3, background: '#22222f', borderRadius:'15px' }}>
                {components.map((component) => (
                    <Card key={component.title} sx={{ backgroundColor: '#1e1e1e', borderRadius: 2 }}>
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                            <video autoPlay loop muted playsInline="" data-wf-ignore="true" data-object-fit="cover">
                                <source src={component.url} data-wf-ignore="true"/>
                                <source src={component.url} data-wf-ignore="true"/>
                            </video>
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white', fontFamily: 'Satoshi, sans-serif' }}>
                                {component.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Satoshi, sans-serif' }}>
                                {component.description}
                            </Typography>
                            <Button size="small" sx={{ color: '#ffffff', mt: 1, fontFamily: 'Satoshi, sans-serif' }}>
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
