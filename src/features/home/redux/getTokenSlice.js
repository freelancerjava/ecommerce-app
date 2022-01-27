import { createSlice } from '@reduxjs/toolkit'
import initialState from './initialState'

export const getTokenSlice = createSlice({
    name: 'getToken',
    initialState,
    reducers: {
        beginGetToken: (state) => {
            return {
                ...state,
                fetchTokenPending: true,
                fetchTokenError: null
            }
        },
        successGetToken: (state, action) => {
            return {
                ...state,
                token: action.payload,
                fetchTokenPending: false,
                fetchTokenError: null,
            };
        },
        failGetToken: (state, action) => {
            return {
                ...state,
                fetchTokenPending: false,
                fetchTokenError: action.payload,
            };
        }
    }
})

export const { beginGetToken, successGetToken, failGetToken } = getTokenSlice.actions
export default getTokenSlice.reducer