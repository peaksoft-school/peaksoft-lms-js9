import { createSlice } from '@reduxjs/toolkit'
import { getTeacher } from './teachers.thunk'

const initialState = {
   data: [],
   isLoading: true,
   error: '',
}

export const teachersSlice = createSlice({
   name: 'teachers',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getTeacher.pending, (state) => {
            return {
               ...state,
               isLoading: true,
            }
         })
         .addCase(getTeacher.fulfilled, (state, action) => {
            return {
               ...state,
               data: action.payload,
               isLoading: false,
            }
         })
         .addCase(getTeacher.rejected, (state, action) => {
            return {
               ...state,
               isLoading: false,
               error: action.payload,
            }
         })
   },
})
