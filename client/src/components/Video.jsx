// React Imports
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

//Timeago.js Import
import { format } from 'timeago.js';

// React Player Import
import ReactPlayer from 'react-player';

// React Redux Imports
import {subscribe} from '../redux/userSlice';
import {dislikeVideo, getVideo,likeVideo} from '../redux/videoSlice';
import {useDispatch, useSelector} from 'react-redux';

//Mui Imports
import {Container, Grid, Box, Typography, Button, Divider, Avatar} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Tooltip from '@mui/material/Tooltip';

// // Toasts Imports
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Other Imports
import Recommendations from './Recommendations';
import Comments from './Comments';
import { publicRequest, userRequest} from '../requestMethods';




function Video() {
    const location = useLocation();
    const link = location.pathname.split('/')[2];
    const [video, setVideo] = useState({});
    // const [videoUser, setVideoUser] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const reduxVideo = useSelector((state) => state.video.currentVideo);
    


    // Dialog Configuration
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        if (user && user.length === 0) {
            setOpen(true);
        } 
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Like video
    const handleLike = async (videoId) => {
        try {
            await userRequest.put(`/user/like/${videoId}`);
            dispatch(likeVideo(user.user._id))  
        } catch (error) {
            console.log(error.message)
        }     
    }

    // Dislike video
    const handleDislike = async (videoId) => {
        try {
            await userRequest.put(`/user/dislike/${videoId}`);
            dispatch(dislikeVideo(user.user._id))
        } catch (error) {
            console.log(error.message)
        }   
    }

    // handleSubscribe
    const handleSubscribe = async (userId) => {
        if (user.length !== 0 && user.user.subscribedUsers.includes(userId)){
            try {
                await userRequest.put(`/user/unsub/${userId}`);
                dispatch(subscribe(userId));
            } catch (error) {
                console.log(error.message)
            }
        } else {
            try {
                await userRequest.put(`/user/sub/${userId}`);
                dispatch(subscribe(userId));
            } catch (error) {
                console.log(error.message)
            }
        }
        
        
    }

    
    useEffect(() => {
        const fetchVideo = async () => {
            const res = await publicRequest.get(`/video/find/${link}`)
            setVideo(res.data)
            // setVideoUser(res.data.userId)
            dispatch(getVideo(res.data))
        }

        fetchVideo();
        
    }, [link, dispatch])

    
  return (
    <div>
        <Container>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">
            Sign In
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                In order to like, dislike or comment a video, you first need to sign in
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} variant='text' color='secondary' >
                Close
            </Button>
            </DialogActions>
        </Dialog>

        <Grid container >
            <Grid item md={8} sm={12} xs={12}  sx={{ py:2 }}>
                <Box sx={{ width:'100%', height:'500px', position:'relative' }}>
                    <ReactPlayer url={video.videoUrl} controls width='100%' height='100%' />
                </Box>
                <Box>
                    <Typography color='primary' variant='h6' fontWeight='fontWeightRegular' sx={{ pt:2 }}>
                        {reduxVideo && reduxVideo.title}
                    </Typography>
                </Box>

                {/* Views and Likes Section */}
                <Box sx={{ display:'flex', justifyContent:'space-between', mb:1 }}>
                    <Box>
                        <Typography fontWeight='fontWeightRegular' sx={{ fontSize:'14px', color:'gray', mt:1 }}>
                            {reduxVideo && reduxVideo.views} views . {format(video.createdAt)}
                        </Typography>
                    </Box>
                    <Box>
                        <Tooltip title='i like this'>
                            <Button startIcon={user.length !== 0 && reduxVideo.likes?.includes(user.user._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} onClick={() => (user.length === 0 ? handleClickOpen() : handleLike(video._id))}>
                                {reduxVideo && reduxVideo.likes.length}
                            </Button>
                        </Tooltip>
                        
                        <Tooltip title='i dislike this' onClick={() => (user && user.length === 0 ? handleClickOpen() : handleDislike(video._id))}>
                            <Button startIcon={user.length !== 0 && reduxVideo.dislikes?.includes(user.user._id) ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}>
                                Dislike
                            </Button>
                        </Tooltip>
                        
                        <Tooltip title='share' onClick={handleClickOpen}>
                            <Button startIcon={<ReplyOutlinedIcon />}>
                                Share
                            </Button>
                        </Tooltip>
                        
                    </Box>
                </Box>
                <Divider color='#303134' sx={{borderBottomWidth: 1}} />


                {/* Channel Details */}
                <Box sx={{ mt:2, display:'flex', justifyContent:'space-between', p:1 }}>
                    <Box sx={{ display:'flex' }}>
                        <Box sx={{ mr:2 }}>
                            <Avatar src={`${reduxVideo && reduxVideo.userImage}`} />
                        </Box>
                        <Box>
                            <Typography color='primary'>
                                {video.username}
                            </Typography>
                            <Typography color='gray' variant='caption'>
                                {video.subscribers} subscribers
                            </Typography>
                        </Box>
                    </Box> 
                    <Box>
                    { user.length !== 0 && user.user.subscribedUsers.includes(video.userId) ? 
                        <Button variant='contained' color='secondary' onClick={() => user && user.length === 0 ? handleClickOpen() : handleSubscribe(video.userId)}>
                            Subscribed
                        </Button> : 
                        <Button variant='contained' color='success' onClick={() => user && user.length === 0 ? handleClickOpen() : handleSubscribe(video.userId)}>
                        Subscribe
                        </Button>}
                    </Box>
                </Box>

                <Box sx={{ my:2, pl:8 }}>
                    <Typography sx={{ fontSize:'14px' }}>
                        {reduxVideo && reduxVideo.desc}
                    </Typography>
                </Box>
                <Divider color='#303134' sx={{borderBottomWidth: 1}} />


                {/* Comment Count */}
                <Box sx={{ py:3 }}>
                    <Box> 
                        <Typography color='primary' variant='h6' sx={{ mr:3, pt:2 }}>
                            20 Comments
                        </Typography>
                    </Box>
                </Box>


                {/* Comment Section */}
                <Comments videoId={video._id} />
            </Grid>
            
            <Grid md={4} sm={12} xs={12} item sx={{ p:1 }}>
                <Recommendations category={video && video.category} />
            </Grid>
        </Grid>
        </Container>
    </div>
  )
}

export default Video
