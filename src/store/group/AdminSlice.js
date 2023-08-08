/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getCard, getGroupUsers } from './AdminThunk'

const initialState = {
   cards: [],
   users: [],
}
export const AdminSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCard.fulfilled, (state, action) => {
            state.cards = action.payload
         })
         .addCase(getGroupUsers.fulfilled, (state, action) => {
            state.users = action.payload
         })
   },
})
export const adminActions = AdminSlice.actions
