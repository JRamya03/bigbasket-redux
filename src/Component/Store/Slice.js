import { createSlice } from "@reduxjs/toolkit";
import Content from './Content.json';

export const Slice=createSlice({
    name:"vegetable",
    initialState:{ 
        arr: Content.veg,
        isAuth:false
    },
    reducers:{
      UpdateName:(state,action)=>{
         state.arr = action.payload
      },
      UpdateAuth:(state,action)=>{
        state.isAuth = action.payload
      }
    }
})

export default Slice.reducer

export const {UpdateName,UpdateAuth} = Slice.actions