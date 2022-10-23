import {Box, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';
import { publicRequest } from '../requestMethods';

function Recommendations({category}) {
    const [relatedVideos, setRelatedVideos] = useState([])
    const navigate = useNavigate();

    // Fetch Related Videos
    useEffect(() => {
        const fetchRelatedVideos = async() => {
            const res = await publicRequest.get(`/video/category?category=${category}`);
            setRelatedVideos(res.data)
        }

        fetchRelatedVideos()
    }, [category])


    

  return (
    <Box sx={{ display:'flex', flexDirection:'column', ml:2 }}>
        {/* <Typography color='primary' variant='h6' sx={{ py:2 }}>
            Related Videos
        </Typography> */}
        {relatedVideos.map((video) => (
            <Box sx={{ cursor:'pointer', display:{md:'flex', sm:'flex', xs:'block'}, height:'100%', my:1, width:{md:'100%', sm:'70%'} }} key={video._id} onClick={() => navigate(`/watch/${video._id}`)}>
                <Box component='img' src={video.imgUrl} sx={{ height:{md:'120px', sm:'120px', xs:'120px'}, width:{md:'50%', sm:'40%'}, mr:{md:1, sm:2, xs:2}}} />
                <Box sx={{ mt:1 }}>
                    <Box>
                        <Typography color='primary' fontWeight='fontWeightMedium' sx={{ mb:1, fontSize:'15px' }}>
                            {video.title}
                        </Typography>
                        <Typography variant='caption' color='#b3b3b3'>
                            {video.username}
                        </Typography>

                        <Box sx={{ display:'flex', mb:3 }}>
                            <Typography variant='caption' color='#b3b3b3' sx={{ mr:1 }}>
                            {video.views} views .
                            </Typography>
                            <Typography variant='caption' color='#b3b3b3'>
                            {format(video.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        ))}
        
    </Box>
  )
}

export default Recommendations
