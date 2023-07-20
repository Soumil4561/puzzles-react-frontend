import { createSlice } from '@reduxjs/toolkit';

export const profileSlicer = createSlice({
    name: 'profile',
    initialState: {
        userID: null,
        username: null,
        profilePhoto: null
    },
    reducers: {
        login: (state, action) => {
            state.userID = action.payload.userID
            state.username = action.payload.username
            state.profilePhoto = action.payload.profilePhoto
        },
        logout: (state) => {
            state.userID = null
            state.username = 'Not Logged In'
            state.profilePhoto = null
        },
        updateProfilePhoto: (state, action) => {
            state.profilePhoto = action.payload.profilePhoto
        },
        updateProfileName: (state, action) => {
            state.username = action.payload.username
        }
    }
})

export const { login, logout, updateProfilePhoto } = profileSlicer.actions;

export default profileSlicer.reducer;
