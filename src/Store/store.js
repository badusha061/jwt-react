import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
    reducer : {
        user:useReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', 
   
})