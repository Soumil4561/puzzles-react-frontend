import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './reducers/profileSlicer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
    reducer: {
        profile: persistedReducer
    }
})

export const persistor = persistStore(store);