import { Box,Avatar, Typography, Button } from '@mui/material';
import Profile from '../images/user-icon.png';
import React, {useState, useEffect} from 'react';
import {format} from 'timeago.js';
import { publicRequest } from '../requestMethods';
import CommentForm from './CommentForm';
import { useSelector } from 'react-redux';

// Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';




function Comment({comment, commentId, handleDelete, replyResponse, activeComment, setActiveComment, addComment, updateComment}) {
    const user = useSelector((state) => state.user.currentUser.user);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [replies, setReplies] = useState([]);
    const [canModify, setCanModify] = useState(false);
    const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment._id;
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment._id;
    const replyId = comment.parentId ? comment.parentId : comment._id;


    // Dialog open
    const handleClickOpen = () => {
        if (!user) {
            setOpen(true);
        } 
    };

    // Dialog Close
    const handleClose = () => {
        setOpen(false);
    };

    // If comment id is equal to user id the we can edit comment
    useEffect(() => {
        if (user && user._id === comment.userId) {
            setCanModify(true)
        }
    }, [comment.userId, user])

    // Fetch Replies when component is mounted
    useEffect(() => {
        const fetchReplies = async () => {
            const res = await publicRequest.get(`/comments/reply/${commentId}`)
            setReplies(res.data);
        }

        fetchReplies()
    }, [commentId, replyResponse ])


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


        {/* Comments */}
        <Box sx={{ display:'flex' }}>
            <Box sx={{ mr:2 }}>
                <Avatar src={Profile} />
            </Box>
            <Box>
                <Box sx={{ display:'flex' }}>
                    <Box>
                        <Typography color='primary' sx={{ fontSize:'13px', mr:1 }}>
                            {comment.username}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color='gray' variant='caption'>
                           {format(comment.createdAt)}
                        </Typography>
                    </Box>
                </Box>
                {isEditing ? <Box sx={{ mt:2 }}><CommentForm  submitLabel='Edit' initialText={comment.desc} handleSubmit={(text) => updateComment(text, comment._id)} handleCancel={() => setActiveComment(null)} /></Box>  
                : <><Box>
                    <Typography sx={{ fontSize:'13px' }}>
                       {comment.desc}
                    </Typography>
                </Box>
                <Box sx={{ display:'flex' }}>
                    <Box>
                    <Typography color='gray' sx={{ mt:1,cursor:'pointer', mr:2 }} variant='caption' onClick={() => !user ? handleClickOpen() : setActiveComment({id: comment._id, type: 'replying'})}>
                            Reply
                        </Typography>
                    </Box>
                    {canModify && <><Box>
                        <Typography color='gray' sx={{  mt:1,cursor:'pointer', mr:2 }} variant='caption' onClick={() => !user ? handleClickOpen() : setActiveComment({id: comment._id, type: 'editing'})}>
                                Edit
                            </Typography>
                        </Box></>}
                    <Box>
                        <Typography color='gray' sx={{  mt:1,cursor:'pointer', mr:2 }} variant='caption' onClick={() => user && user._id === comment.userId ? handleDelete(comment._id) : handleClickOpen() }>
                            Delete
                        </Typography>
                    </Box>
                </Box></>}
                {isReplying && (
                    <Box sx={{ mt:2, width:'100%' }}>
                        <CommentForm  submitLabel='Reply' handleSubmit={(text) => addComment(text, replyId)} handleCancel={() => setActiveComment(null)} />
                    </Box>
                )}
            </Box>
        </Box>


        {/* Replies */}
        <Box sx={{ mt:2 }}>
           {replies && replies.length > 0 && (
            <Box sx={{ ml:6 }}>
                {replies.map((reply) => (
                    <Comment 
                        comment={reply} 
                        commentId={reply._id}  
                        key={reply._id} 
                        handleDelete={handleDelete} 
                        addComment={addComment} 
                        activeComment={activeComment} 
                        setActiveComment={setActiveComment} 
                        updateComment={updateComment}  
                    />
                ))}
            </Box>
           )}
        </Box>
        
    </div>
  )
}

export default Comment
