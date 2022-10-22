import { Box, Typography, Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// import { VideoData } from '../VideosData';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { publicRequest} from '../requestMethods';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import '../spinner.css';

function Explore() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get('/video/trend');
        setTrending(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
        
    }

    fetchTrending()
}, [])

  return (
    
      <Box>
          <Navbar />
          <Grid container>
              <Grid item md={2} sm={0} xs={0} sx={{ display:{md:'block',sm:'none',xs:'none'}, backgroundColor:'#202020', position:'sticky', top:0, left:0, height:{md:'100vh'}}}>
                  <Sidebar />
              </Grid>

              
                <Grid item md={10} sm={12} xs={12} sx={{ display:'flex', justifyContent:{sm:'start', xs:'center'}, width:'100%' }}>
                  <Box sx={{ px:{md:10, sm:1, xs:5}, ml:{md:5, sm:5, xs:1}, width:'100%'}}>
                    <Box>
                      <Typography variant='h6' sx={{ mt:4 ,mb:3, mr:2 }}>
                        Trending Videos
                      </Typography>
                    </Box>

                    <Box>
                      {loading ? <div className="loader">Loading...</div> :<>{trending.map((video) => (
                      <Box key={video._id} sx={{ display:{md:'flex', sm:'flex', xs:'column'}, my:{md:0, sm:3, xs:5}, justifyContent: {md:'left', sm:'left', xs:'center'} }} onClick={() => navigate(`/watch/${video._id}`)}>
                        {trending.length === 0 ?
                          <Box display='flex' justifyContent='center' sx={{ mt:5 }}>
                            <Typography color='primary' variant='h6' fontWeight='fontWeightLight'>No trending videos to display</Typography>
                          </Box> : 
                        
                          <Box sx={{ width:{md:'40%', sm:'40%', xs:'100%'}, mb:3 }}>
                            <Box>
                              <Box component='img' src={video.imgUrl} sx={{height:'150px', width:{sm:'100%', xs:'100%'}, my:2}}/>
                            </Box>

                            <Box sx={{ width:'100%', p:1 }}>
                              <Box>
                                <Typography sx={{ fontSize:'18px', mb:1, mt:0 }}>
                                  {video.title}
                                </Typography>
                              </Box>

                              <Box sx={{ display:'flex' }}>
                                <Box>
                                  <Typography variant='caption' color='secondary' sx={{ mr:1 }}>
                                    {video.username}
                                  </Typography>
                                  <MusicNoteIcon sx={{fontSize: '13px', mx:1}}/>
                                </Box>

                                <Box sx={{ display:'flex' }}>
                                  <Box sx={{ mr:1 }}>
                                    <Typography variant='caption' color='secondary'>
                                      {video.views} views . 
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant='caption' color='secondary'>
                                        {format(video.createdAt)}
                                    </Typography>
                                  </Box>
                                </Box>

                              </Box>

                              <Box  sx={{ mt:1 }}>
                                <Typography variant='caption' color='secondary'>
                                  {video.desc}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>}
                      </Box>
                      ))}</>}
                    </Box>
                  </Box>
                </Grid>
              
          </Grid>
      </Box>
  )
}

export default Explore
