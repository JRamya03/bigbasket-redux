import { configureStore } from "@reduxjs/toolkit";
import  initialState from './Slice'

export const Store = configureStore({
     reducer:{
        data: initialState
     }
})