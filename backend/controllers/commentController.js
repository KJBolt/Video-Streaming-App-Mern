import Comment from '../model/Comment.js';
import Video from '../model/Video.js';
import User from '../model/User.js';

export const addComment = async (req, res) => {
    const {videoId} = req.params
    const user = await User.findById(req.user.id)
    try {
        const newComment = new Comment({...req.body, username:user.name, videoId:videoId, userId:req.user.id});
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.userId);

        if (req.user.id === comment.userId || req.user.id === video.user.id) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Comment deleted successfully"});
        } else {
            res.status(200).json({message: "You can only delete your comment"});
        }

    } catch (error) {
        res.status(401).json({error: error.message});
    }
};


export const updateComment = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (req.user.id === comment.userId || req.user.isAdmin) {
            const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
                $set: {desc: req.body.desc}
            }, {new: true});
            return res.status(200).json(updateComment);
        }
        return res.status(401).json({message: "Permission denied"});
    } catch (error) {
        return res.status(401).json(error.message);
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId, parentId:null}).sort({createdAt: -1});
        res.status(200).json(comments);
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

export const addReply = async (req, res) => {
    const {commentId} = req.params
    try {
        const user = await User.findById(req.user.id)
        const newReply = new Comment({
            desc: req.body.desc,
            username: user.name,
            userId: user._id,
            parentId: commentId
        })
        const savedReply = await newReply.save();
        return res.status(200).json(savedReply)
    } catch (error) {
        return res.status(401).json(error.message);
    } 
}


export const getReplies = async(req, res) => {
    try {
        const commentReplies = await Comment.find({parentId: req.params.commentId}).sort({createdAt: -1})
        if (commentReplies) {
            return res.status(200).json(commentReplies)
        }
        return res.status(401).json({message: "No Replies"})
    } catch (error) {
        return res.status(401).json(error.message);
    }
}



export const updateReplies = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        
        if (req.user.id === comment.userId || req.user.isAdmin) {
            const updateReply = await Comment.findByIdAndUpdate(req.params.commentId, {
                $set: {desc: req.body.desc}
            }, {new: true});
            return res.status(200).json(updateReply);
        }
        return res.status(401).json({message: "Permission denied"});
    } catch (error) {
        return res.status(401).json(error.message);
    }
}




export const deleteReplies = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (req.user.id === comment.userId || req.user.isAdmin) {
            await Comment.findByIdAndDelete(req.params.commentId);
            return res.status(200).json({message: "Reply Deleted"});
        }
        return res.status(401).json({message: "Permission denied"});
    } catch (error) {
        return res.status(401).json(error.message);
    }
}