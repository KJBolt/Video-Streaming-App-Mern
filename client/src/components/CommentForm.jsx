import { Box, OutlinedInput, Button } from '@mui/material'
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';


// Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';





function CommentForm({handleSubmit, submitLabel, handleCancel, initialText=''}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(initialText);
  const user = useSelector((state) => state.user.currentUser);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Dialog open
  const handleClickOpen = () => {
    if (user && user.length === 0) {
        setOpen(true);
    } 
  };

  // Dialog Close
  const handleClose = () => {
    setOpen(false);
  };



  const onSubmit = () => {
    handleSubmit(input)
    setInput('')
  }

  return (
    <div>
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

        <Box sx={{  height:'auto', width:'100%' }}>
          <Box sx={{ color:'primary'}}>
                <OutlinedInput multiline placeholder="Add a comment..."  value={input} variant="standard" color='secondary' focused='true' sx={{ color:'gray', border:'.5px solid gray', width:'100%', height:'auto' }}  onChange={(e) => setInput(e.target.value)} />
          </Box>

          <Box sx={{ display:'flex', justifyContent:'right', py:2, pr:2 }}>
            <Box sx={{ display:'flex' }}>
              <Box>
                <Button variant='text' color='secondary' sx={{ mr:2 }} onClick={handleCancel}>
                    Cancel
                </Button>
              </Box>
              <Box>
                <Button variant='contained' color='secondary' onClick={() => (user && user.length === 0 ? handleClickOpen() : onSubmit())}>
                    {submitLabel}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
    </div>
    
    
    
  )
}

export default CommentForm
