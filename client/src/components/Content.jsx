import { Box, Grid } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import Videos from './Videos';

function Content() {
  return (
    <Box>
        <Grid container>
            <Grid item md={2} sm={0} xs={0} sx={{width:'500px', display:{md:'block',sm:'none',xs:'none'}, backgroundColor:'#202020', position:'sticky', top:0, height:{md:'100vh'}}}>
                <Sidebar />
            </Grid>
            <Grid item md={10} sm={12} xs={12}>
                <Videos />
            </Grid>
        </Grid>
      
    </Box>
  )
}

export default Content
