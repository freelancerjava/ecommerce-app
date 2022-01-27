import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        beginGetProducts: state =>{
            return{
                ...state,
                fetchProductsPending: true
            }
        },
        successGetProducts: (state, action) =>{
            return{
                ...state,
                fetchProductsPending: false,
                products: action.payload
            }
        },
        failGetProducts: (state, action) =>{
            return{
                ...state,
                fetchProductsPending: false,
                fetchProductsError: action.payload
            }
        }
    }
})

export const {beginGetProducts, successGetProducts, failGetProducts} = productsSlice.actions

export default productsSlice.reducer
