import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: []
    },
    reducers: {
        login : (state, action) => {
            state.currentUser = action.payload
        },
        subscribe: (state, action) => {
            if (!state.currentUser.user.subscribedUsers.includes(action.payload)){
                state.currentUser.user.subscribedUsers.push(action.payload)
            } else {
                state.currentUser.user.subscribedUsers = state.currentUser.user.subscribedUsers.filter(userId => userId !== action.payload)
            }
        },
        logout: (state) => {
            state.currentUser = []
        }
    }
})

export const {login, subscribe, logout} = userSlice.actions;
export default userSlice.reducer;