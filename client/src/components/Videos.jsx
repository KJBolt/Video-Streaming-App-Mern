import React, {useState, useEffect} from 'react';
import {Box, Divider, Grid, Avatar, Typography} from '@mui/material';
import {publicRequest} from '../requestMethods';
import {format} from 'timeago.js';
import {useNavigate} from 'react-router-dom';
import '../spinner.css';


const categories = [
  {
    id: 1,
    category: 'Sports'
  },
  {
    id: 2,
    category: 'Entertainment'
  },
  {
    id: 3,
    category: 'News'
  },
  {
    id: 4,
    category: 'Health'
  },
  {
    id: 5,
    category: 'Business'
  },
  {
    id: 6,
    category: 'Music'
  },
  {
    id: 7,
    category: 'Religion'
  },
  {
    id: 8,
    category: 'Education'
  },
]

function Videos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch videos after component is mounted
  useEffect(() => {
    const fetchVideos = async() => {
      setLoading(true);
      const res = await publicRequest.get('/video/random');
      setVideos(res.data);
      setLoading(false);
    }

    fetchVideos()
  }, [])

  // Fetch videos by categories
  const handleCategory = async(category) => {
    const res = await publicRequest.get(`/video/category?category=${category}`);
    setCategoryVideos(res.data);
  }


  

  

  return (
    <Box>
      {/* Categories */}
      <Divider color='#303134' sx={{borderBottomWidth: 1}} />
        <Box sx={{ height:'60px', backgroundColor:'#202020', overflow:{sm:'none', xs:'auto'}, position:'sticky', top:-1, zIndex:1, display:'flex', justifyContent:{md:'center', sm:'left', xs:'left'}, alignItems:{md:'center', sm:'start',xs:'start'}, py:{md:0, sm:1, xs:1}, pl:{md:0, sm:2, xs:2} }}>
        {categories.map((category) => (
          <Box sx={{ border:'1px solid gray', borderRadius:'5px', mr:2, height:'max-content', p:1, color:'#fff', cursor:'pointer' }} key={category.id} onClick={() => handleCategory(category.category)}>
            {category.category}
          </Box>
        ))}
      </Box>
      <Divider color='#303134' sx={{borderBottomWidth: 1}} />


      {/* Videos Section */}
        <Box sx={{ my:1 }}>
          {categoryVideos.length !== 0 ? 
            <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            {loading ? <div className="loader">Loading...</div> : <>{categoryVideos.map((video) => (
            <Grid item md={3} sm={4} xs={10} sx={{ my:2, px:1, cursor:'pointer' }} key={video._id} onClick={() => navigate(`/watch/${video._id}`)}>
              <Box component='img' src={video.imgUrl} sx={{height:'165px', width:'100%', mb:1 }} />
              <Box sx={{ display:'flex',  }}>
                <Box sx={{ mr:2 }}>
                  <Avatar src={`${video.userImage}`} />
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
            ))}</>}
          </Grid>
          :
          <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            {loading ? <div className="loader">Loading...</div> : <>{videos.map((video) => (
            <Grid item md={3} sm={4} xs={10} sx={{ my:2, px:1, cursor:'pointer' }} key={video._id} onClick={() => navigate(`/watch/${video._id}`)}>
              <Box component='img' src={video.imgUrl} sx={{height:'165px', width:'100%', mb:1 }} />
              <Box sx={{ display:'flex',  }}>
                <Box sx={{ mr:2 }}>
                  <Avatar src={`${video.userImage}`} />
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
            ))}</>}
          </Grid>}
        </Box>
    </Box>
  )
}

export default Videos
