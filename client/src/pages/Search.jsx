import React, {useState, useEffect} from 'react';
import {Box, Grid, Avatar, Typography} from '@mui/material';
import {publicRequest} from '../requestMethods';
import {format} from 'timeago.js';
import {useLocation, useNavigate} from 'react-router-dom';
import '../spinner.css';
import Navbar from '../components/Navbar';

function Search() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [searchedVideos, setSearchedVideos] = useState([]);
    const query = location.pathname.split('/')[2];

    // Fetch Search results
    useEffect(() => {
        if (query) {
          const fetchResults = async() => {
            setLoading(true)
            const res = await publicRequest.get(`/video/search?q=${query}`);
            setSearchedVideos(res.data)
            setLoading(false)
          }
      
          fetchResults()
        }
      }, [query])

  return (
    <Box>
        <Navbar />

        {loading ? <div className="loader">Loading...</div> : <Box>
            <Box sx={{ p:2, mt:3, ml:3 }}>
                <Typography>
                    {searchedVideos.length} Results found
                </Typography>
            </Box>

            {/* Videos Section */}
            <Box sx={{ my:1 }}>
                <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                    {searchedVideos.map((searchVideo) => (
                    <Grid item md={6} sm={6} xs={12} sx={{ my:2, px:1, cursor:'pointer', display:'flex', justifyContent:'center' }} key={searchVideo._id} onClick={() => navigate(`/watch/${searchVideo._id}`)}>
                        <Box sx={{ width:'60%', mt:1 }}>  
                            <Box component='img' src={searchVideo.imgUrl} sx={{height:'165px', width:'100%', mb:1 }} />
                            <Box sx={{ display:'flex' }}>
                                <Box sx={{ mr:2 }}>
                                    <Avatar src={`${searchVideo.userImage}`} />
                                </Box>
                                <Box>
                                    <Typography variant='body1' color='primary' fontWeight='fontWeightMedium' sx={{ mb:1 }}>
                                        {searchVideo.title}
                                    </Typography>
                                    <Typography variant='caption' color='primary'>
                                        {searchVideo.username}
                                    </Typography>

                                    <Box sx={{ display:'flex', mb:3 }}>
                                        <Typography variant='caption' color='primary' sx={{ mr:1 }}>
                                        {searchVideo.views} views .
                                        </Typography>
                                        <Typography variant='caption' color='primary'>
                                        {format(searchVideo.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>  
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>}
    </Box>
  )
}

export default Search
