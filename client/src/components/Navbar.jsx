import { AppBar, Box, Button, ListItemIcon, ListItemText, MenuItem, Toolbar, FormControl, OutlinedInput,IconButton, Avatar   } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Profile from '../images/user-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import {auth, provider} from '../firebase';
import {signInWithPopup, signOut } from "firebase/auth";
import {publicRequest} from '../requestMethods';
import {useDispatch, useSelector} from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import {login, logout} from '../redux/userSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);
    const [query, setQuery] = useState('');
    

    // Save info in database and redux store
    const signInUser = async(result) => {
        const res = await publicRequest.post('/auth/google', {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL
        })
        dispatch(login(res.data));
        window.location.reload();
    }

    // Google Authentication
    const handleSignIn =  () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            signInUser(result)
        }).catch((error) => {
            console.log(error.message)
        });
    }

    // Sign Out
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(logout())
        }).catch((error) => {
        // An error happened.
        });
    }
    
    
    // Navigate to search page with search value
    const handleQuery = () => {
        navigate(`/search/${query}`)
    }


  return (
    <Box>
      <AppBar position='sticky'  elevation={0} sx={{ backgroundColor:'#202020'}}>
        <Toolbar sx={{ display:'flex', justifyContent:'space-between', py:'10px'}}>
            {/* Logo */}
            <Box>
                <Link to='/' style={{ textDecoration:'none' }}>
                    <MenuItem>
                        <ListItemIcon sx={{ mr:1 }}>
                            <YouTubeIcon sx={{ color:'red', fontSize:'45px' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ fontWeight:'fontWeightMedium', fontSize:'35px', color:'#fff' }}>
                            Jbolt
                        </ListItemText>
                    </MenuItem>
                </Link> 
            </Box>

            {/* Search Bar */}
            <Box sx={{ display:{md:'block', sm:'none', xs:'none'} }}>
                <FormControl sx={{ width:'500px'}}>
                    <Box sx={{ display:'flex', flexDirection:'row', width:'100%' }}>
                        <Box sx={{ width:'90%' }}>
                            <OutlinedInput placeholder="Search" sx={{ color:'gray', border:'.5px solid gray', width:'100%', height:'40px' }} onChange={(event) => setQuery(event.target.value)} />
                        </Box>
                        <Box sx={{ width:'10%', border:'.5px solid gray', height:'40px', display:'flex', justifyContent: 'center', alignItems:'center' }}>
                            <Tooltip title='search'>
                                <SearchIcon sx={{color:'gray', height:'50px', width:'30px'}} onClick={handleQuery}/>
                            </Tooltip>
                            
                        </Box>
                    </Box> 
                </FormControl>
            </Box>

            <Box sx={{ display:'flex' }}>
                {user && user.length === 0  ? <Box>
                    <Button variant="outlined" color='success' size='large' startIcon={<PermIdentityIcon />} onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Box> :
                
                <Box sx={{ display:'flex' }}>
                    
                    <Link to='/upload' style={{ textDecoration:'none' }}>
                        <Box>
                            <Tooltip title='create'>
                                <IconButton>
                                    <VideoCallOutlinedIcon sx={{ color:'#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Link>
                    
                    
                    <Box>
                        <Tooltip title='notifications'>
                            <IconButton>
                                <NotificationsNoneIcon sx={{ color:'#fff' }} />
                            </IconButton>
                        </Tooltip>
                        
                    </Box>

                    <Box sx={{ mr:1 }}>
                        <Tooltip title='Sign Out'>
                            <IconButton onClick={handleSignOut}>
                                <ExitToAppIcon sx={{ color:'#fff' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box sx={{ width:'max-content', height:'max-content', mt:1 }}>
                         {user && user.user.img !== '' ? <Avatar  sx={{ width: 30, height: 30 }} src={`${user.user.img}`} /> : <Avatar  sx={{ width: 30, height: 30 }} src={Profile} /> }
                    </Box>
                    
                </Box>}
                
            </Box>
            
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
