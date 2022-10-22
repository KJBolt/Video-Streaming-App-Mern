import { Link } from 'react-router-dom';
import React from 'react';
import { Box, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';


const menuItems = [
  {
    id:1,
    icon: <CottageOutlinedIcon />,
    desc: 'Home' 
  },
  {
    id:2,
    icon: <ExploreOutlinedIcon />,
    desc: 'Explore' 
  },
  {
    id:3,
    icon: <VideoLibraryOutlinedIcon />,
    desc: 'Subscription' 
  },
  // {
  //   id:4,
  //   icon: <PlayCircleOutlinedIcon />,
  //   desc: 'Your Videos' 
  // },
]


function Sidebar() {
  return (
    <Box sx={{ mt:'10px' }}>
      {menuItems.map((menuItem) => (
        <Link to={`/${menuItem.desc === 'Home' ? '' : menuItem.desc }`} style={{ textDecoration:'none' }} key={menuItem.id}>
          <MenuItem  sx={{ mt:'10px', py:1 }}>
            <ListItemIcon sx={{ color:'#fff' }}>
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText sx={{ color:'#fff', fontWeight:'fontWeightLight', fontSize:'14px', pl:{ lg:2, sm:1, xs:1}, pr:{ sm:0, xs:1} }}>
              {menuItem.desc}
            </ListItemText>
          </MenuItem>
        </Link>
      ))}
       
    </Box>
  )
}

export default Sidebar
