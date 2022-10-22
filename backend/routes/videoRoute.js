import express from 'express';
import {
    addVideo,
    updateVideo,
    findVideo,
    deleteVideo,
    incrementViews,
    getTrends,
    getRandom,
    getsubVideos,
    getCategory,
    search
} from '../controllers/videoController.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Create Video
router.post('/' ,verifyToken, addVideo );

// update Video
router.put('/:id' ,verifyToken, updateVideo );

// find Video
router.get('/find/:id' , findVideo );

// Delete Video
router.delete('/:id' ,verifyToken, deleteVideo );

// Video views
router.put('/views/:id', incrementViews );

// Trend videos
router.get('/trend', getTrends);

// Random videos
router.get('/random', getRandom);

// Subcribed channel videos
router.get('/sub', verifyToken, getsubVideos);

// Tags
router.get('/category', getCategory);

// Search Videos
router.get('/search', search);

export default router;