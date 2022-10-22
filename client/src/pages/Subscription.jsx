import { Box, Grid, Typography, Avatar } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Profile from '../images/user-icon.png';
// import { VideoData } from '../VideosData';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { userRequest } from '../requestMethods';
import { format } from 'timeago.js';
import '../spinner.css'

function Subscription() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [subscribedChannels, setSubscribedChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async () => {
            setLoading(true)
            const res = await userRequest.get('/video/sub');
            setSubscribedChannels(res.data)
            setLoading(false)
        }

        fetchChannels()
    }, [])

  return (
    <Box>
      <Navbar />

      <Box>
        <Grid container>
                <Grid item md={2} sm={0} xs={0} sx={{ display:{md:'block',sm:'none',xs:'none'}, backgroundColor:'#202020', position:'sticky', top:0, height:{md:'100vh'}}}>
                    <Sidebar />
                </Grid>
                {loading ? <div className="loader">Loading...</div> : <Grid item md={10} sm={12} xs={12}>
                    <Box sx={{ my:1 }}>
                        {subscribedChannels.length === 0 ? 
                        <Box display='flex' justifyContent='center' sx={{ mt:5 }}>
                            <Typography color='primary' variant='h6' fontWeight='fontWeightLight'>You have not subscribed to any channel</Typography>
                        </Box> : 
                        <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                            {subscribedChannels.map((video) => (
                            <Grid item md={3} sm={4} xs={10} sx={{ my:2, p:1 }} key={video._id}  onClick={() => navigate(`/watch/${video._id}`)}>
                            <Box component='img' src={video.imgUrl} sx={{height:'180px', width:'100%', mb:1 }} />
                            <Box sx={{ display:'flex',  }}>
                                <Box sx={{ mr:2 }}>
                                <Avatar src={Profile} />
                                </Box>

                                <Box>
                                <Typography variant='body1' color='primary' fontWeight='fontWeightMedium' sx={{ mb:1 }}>
                                    {video.title}
                                </Typography>
                                <Typography variant='caption' color='primary'>
                                    {video.username}
                                </Typography>

                                <Box sx={{ display:'flex', mb:3 }}>
                                    <Typography variant='caption' color='primary' sx={{ mr:1 }}>
                                    {video.views} views .
                                    </Typography>
                                    <Typography variant='caption' color='primary'>
                                    {format(video.createdAt)}
                                    </Typography>
                                </Box>
                                </Box>
                            </Box>
                            </Grid>
                            ))}
                        </Grid>}
                    </Box>
                </Grid>}
            </Grid>
      </Box>
    </Box>
  )
}

export default Subscription
