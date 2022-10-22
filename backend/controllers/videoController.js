import Video from '../model/Video.js';
import User from '../model/User.js';

export const addVideo = async (req, res) => {
    const user = await User.findById(req.user.id);
    const username = user.name
    const userImage = user.img
    const subscribers = user.subscribers
    try {
        const video = new Video({userId:req.user.id, username:username, userImage:userImage, subscribers:subscribers, ...req.body});
        await video.save();
        res.status(200).json(video);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const updateVideo = async (req, res) => {
    try {
        const video = Video.findById(req.params.id);
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, {new:true});
            res.status(200).json(updatedVideo);
        }  
        return res.status(404).json({message: "You can only update your video"});  
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const video = Video.findById(req.params.id);
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Video deleted successfully"});
        }  
        return res.status(404).json({message: "You can only delete your video"});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const findVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        if (video) {
            return res.status(200).json(video)
        }
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const incrementViews = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc:{views: 1}
        });
        return res.status(200).json('The video views has been increased')
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getTrends = async (req, res) => {
    try {
        const videos = await Video.find().sort({views: "desc"});
        return res.status(200).json(videos)
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};


export const getRandom = async (req, res) => {
    try {
        const randomVideos = await Video.aggregate([{$sample:{size:10}}]);
        return res.status(200).json(randomVideos)
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getsubVideos = async (req, res) => {
    try {
            const user = await User.findById(req.user.id);
            const subscribedUsers = user.subscribedUsers;

            const list = await Promise.all(
                subscribedUsers.map((channelId) => {
                    return Video.find({userId: channelId})
                })
            );

            res.status(200).json(list.flat());
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getCategory = async (req, res) => {
    try {  
            
            const category = req.query.category
            const videos = await Video.find({category:{$in:category}}).limit(10);
            res.status(200).json(videos);
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const search = async (req, res) => {
    try {
            const query = req.query.q;
            const videos = await  Video.find({title: {$regex:query, $options:"i"}});
            res.status(200).json(videos);

            if (!videos) {
                return res.status(404).json({message: "No result found"});
            }
        
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};
