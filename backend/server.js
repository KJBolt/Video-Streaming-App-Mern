import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import videoRoute from './routes/videoRoute.js';
import commentRoute from './routes/commentRoute.js';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/video', videoRoute);
app.use('/api/comments', commentRoute);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port 5000')
        });
    } catch (error) {
        throw error
    }
    
})
.catch((error) => {
    console.log(error)
});