import { createSlice } from '@reduxjs/toolkit'
import {
   createPasswordThunk,
   forgotPasswordThunk,
   signInThunk,
} from './signInThunk'
import { STORAGE_KEY, USER_ROLE } from '../../utils/constants/constants'

const getInitialState = () => {
   const json = localStorage.getItem(STORAGE_KEY.AUTH_KEY)
   if (json) {
      const userData = JSON.parse(json)
      return {
         isAuthorization: true,
         token: userData.token,
         email: userData.email,
         role: userData.role,
         isLoading: false,
         error: null,
      }
   }
   return {
      isAuthorization: false,
      isLoading: false,
      token: '',
      email: '',
      role: USER_ROLE.GUEST,
      error: null,
   }
}

export const signInSlice = createSlice({
   name: 'auth',
   initialState: getInitialState(),
   reducers: {
      logout: (state) => {
         state.isAuthorization = false
         state.isLoading = false
         state.token = ''
         state.email = ''
         state.role = USER_ROLE.GUEST
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(signInThunk.fulfilled, (state, actions) => {
            console.log('actions', actions)
            state.isAuthorization = true
            state.email = actions.payload.email
            state.token = actions.payload.token
            state.role = actions.payload.role
            state.isLoading = false
            state.error = null
         })
         .addCase(signInThunk.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
            state.error = null
         })
         .addCase(signInThunk.rejected, (state, actions) => {
            state.isAuthorization = false
            state.error = actions.payload
            state.isLoading = false
         })

         // forgotPassword

         .addCase(forgotPasswordThunk.fulfilled, (state) => {
            state.isAuthorization = true
            state.isLoading = false
         })
         .addCase(forgotPasswordThunk.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(forgotPasswordThunk.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })

         // createPassword

         .addCase(createPasswordThunk.fulfilled, (state) => {
            state.isAuthorization = true
            state.isLoading = false
         })
         .addCase(createPasswordThunk.pending, (state) => {
            state.isAuthorization = false
            state.isLoading = true
         })
         .addCase(createPasswordThunk.rejected, (state) => {
            state.isAuthorization = false
            state.isLoading = false
         })
   },
})
export const authActions = signInSlice.actions
export default signInSlice.reducer
