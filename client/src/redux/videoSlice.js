import {createSlice} from '@reduxjs/toolkit';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        currentVideo: null,
        query: null
    },
    reducers: {
        getVideo : (state, action) => {
            state.currentVideo = action.payload
        },
        likeVideo: (state, action) => {
            if(state.currentVideo.dislikes.includes(action.payload)){
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes = state.currentVideo.dislikes.filter(videoId => videoId !== action.payload)
            }
                
        },
        dislikeVideo: (state, action) => {
            if(state.currentVideo.likes.includes(action.payload)){
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes = state.currentVideo.likes.filter(videoId => videoId !== action.payload)
            }
            
        },
        search: (state, action) => {
            state.query = action.payload
        }
        
    }
})

export const {getVideo, likeVideo,dislikeVideo, search} = videoSlice.actions;
export default videoSlice.reducer;