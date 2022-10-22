import express from 'express';
import { 
    updateUser, 
    deleteUser, 
    getUser, 
    subscribeUser,
    unsubscribeUser, 
    dislike,
    like
} from '../controllers/userController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Update User
router.put('/:id', verifyToken, updateUser);

// Delete User
router.delete('/:id', verifyToken, deleteUser);

// Get a User
router.get('/find/:id', getUser);

// Subscribe User
router.put('/sub/:id', verifyToken, subscribeUser);

// unSubscribe User
router.put('/unsub/:id', verifyToken, unsubscribeUser);

// like a video
router.put('/like/:videoId', verifyToken, like);

// dislike a video
router.put('/dislike/:videoId', verifyToken, dislike);

export default router