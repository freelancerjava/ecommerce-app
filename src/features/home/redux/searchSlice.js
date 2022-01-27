import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

export const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers:{
        setSearchName: (state, action) =>{
            return{
                ...state,
                searchName: action.payload
            }
        } 
    }

}) 

export const {setSearchName} = searchSlice.actions
export default searchSlice.reducer