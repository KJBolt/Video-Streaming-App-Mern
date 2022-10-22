import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    desc: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    userId: {
        type: String,
    },
    parentId: {
        type: String,
        default: null
    },
    videoId: {
        type: String
    }
    
}, {timestamps:true});

export default mongoose.model('Comment', commentSchema)