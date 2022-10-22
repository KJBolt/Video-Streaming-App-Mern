import mongoose from 'mongoose';

const Schema = mongoose.Schema

const videoSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    userImage: {
        type:String
    },
    subscribers:{
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    },
    
}, {timestamps:true})

export default mongoose.model('Video', videoSchema)