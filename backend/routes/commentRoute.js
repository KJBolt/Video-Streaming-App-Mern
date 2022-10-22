import express from 'express';
import {verifyToken} from "../verifyToken.js";
import {addComment, updateComment,deleteComment, getComments, addReply, updateReplies, deleteReplies, getReplies} from "../controllers/commentController.js";


const router = express.Router();

// Add comment
router.post('/add/:videoId', verifyToken, addComment);

// Delete comment
router.delete('/:id', verifyToken, deleteComment );

//Get Video comments
router.get('/:videoId', getComments);

// Update Video Comment
router.put('/:id', verifyToken, updateComment)

// Add Replies
router.post('/reply/:commentId', verifyToken, addReply)

// Get Replies
router.get('/reply/:commentId', getReplies);

// Update Reply
router.put('/reply/:commentId', verifyToken, updateReplies);

// Delete Reply
router.delete('/reply/:commentId', verifyToken, deleteReplies);


export default router;