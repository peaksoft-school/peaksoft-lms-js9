import { createSlice } from '@reduxjs/toolkit'
import { signInThunk } from './signInThunk'
import { STORAGE_KEY, USER_ROLE } from '../utils/constants/constants'

const getInitialState = () => {
   const json = localStorage.getItem(STORAGE_KEY.AUTH_KEY)
   if (json) {
      const userData = JSON.parse(json)
      return {
         isAuthorization: true,
         token: userData.token,
         email: userData.email,
         role: userData.role,
      }
   }
   return {
      isAuthorization: false,
      //   isLoading: false,
      token: '',
      email: '',
      role: USER_ROLE.GUEST,
      error: '',
   }
}
const initialState = getInitialState()

export const signInSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(signInThunk.fulfilled, (state, actions) => {
            console.log('actions', actions)
            state.isAuthorization = true
            state.email = actions.payload.email
            state.token = actions.payload.token
            state.role = actions.payload.role
         })
         .addCase(signInThunk.pending, (state) => {
            state.isAuthorization = false
         })
         .addCase(signInThunk.rejected, (state, actions) => {
            state.isAuthorization = false
            state.error = actions.payload
         })
   },
})
export const authActions = signInSlice.actions
