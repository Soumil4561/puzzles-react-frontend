import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './reducers/profileSlicer'

const store = configureStore({
    reducer: {
        profile: profileReducer
    }
})

export default store;