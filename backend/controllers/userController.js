import User from '../model/User.js';
import Video from "../model/Video.js";
import mongoose from 'mongoose';

export const updateUser = async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            res.status(200).json(updatedUser)
        }
        return res.status(404).json({message: "YOu can update only your account"})

    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Delete successful"})
        }
        return res.status(404).json({message: "YOu can delete only your account"})

    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};

export const getUser = async (req, res) => {
    try {
            const getUser = await User.findById(req.params.id);
            return res.status(200).json(getUser)
    } catch (error) {
        // return res.status(404).json({error:error.message})
    }
};

export const subscribeUser = async (req, res) => {
    try {
        if(req.user.id === req.params.id) {
            return res.status(404).json({message: "You cannot subscribe to your own self"})
        }
        await User.findByIdAndUpdate(req.user.id, {
            $set:{subscribedUsers:req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id, {
            $inc:{subscribers: 1}
        });

        return res.status(200).json({message: "Subcription successful"})
        
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};

export const unsubscribeUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{subscribedUsers:req.params.id}
        });

        await User.findByIdAndUpdate(req.params.id, {
            $inc:{subscribers: -1}
        });

        return res.status(200).json({message: "Unsubcription successful"})
        
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};

export const like = async (req, res) => {
    try {
        const userId = req.user.id;
        const videoId = req.params.videoId;
        
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{likes:userId},
            $pull:{dislikes:userId}
        });
        return res.status(200).json({message: "Video liked"})

    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};

export const dislike = async (req, res) => {
    try {
        const userId = req.user.id;
        const videoId = req.params.videoId;
        
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{dislikes:userId},
            $pull:{likes:userId}
        });
        return res.status(200).json({message: "Video disliked"});

    } catch (error) {
        return res.status(404).json({error:error.message})
    }
};




