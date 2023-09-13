import { createSlice } from '@reduxjs/toolkit'
import {
   deleteLinkLessonThunk,
   deletePresentationLessonThunk,
   deleteVideoLessonThunk,
   getLinkLessonThunk,
   getPresentationLessonThunk,
   getVideoLessonThunk,
   postLinkLessonThunk,
   postPresentationLessonThunk,
   postVideoLessonThunk,
   putPresentationLessonThunk,
   putVideoLessonThunk,
   updateLinkLessonThunk,
} from './lessonCrudThunk'

const initialState = {
   isLoadingCrud: false,
   linkId: [],
   videoId: [],
   presentationId: [],
}

export const lessonCrudSlice = createSlice({
   initialState,
   name: 'lessonCrud',
   reducers: {},
   extraReducers: (builder) => {
      builder
         // link
         .addCase(getLinkLessonThunk.fulfilled, (state, action) => {
            return { ...state, linkId: action.payload[0] }
         })

         // video

         .addCase(getVideoLessonThunk.fulfilled, (state, action) => {
            return {
               ...state,
               videoId: action.payload[0],
            }
         })

         // presentation

         .addCase(getPresentationLessonThunk.fulfilled, (state, action) => {
            return {
               ...state,
               presentationId: action.payload[0],
            }
         })

         // deletePresentation

         .addCase(deletePresentationLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(deletePresentationLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(deletePresentationLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // deleteLink

         .addCase(deleteLinkLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(deleteLinkLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(deleteLinkLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // deleteVideo

         .addCase(deleteVideoLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(deleteVideoLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(deleteVideoLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // postPresentation

         .addCase(postPresentationLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(postPresentationLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(postPresentationLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // postVideo

         .addCase(postVideoLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(postVideoLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(postVideoLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // postLink

         .addCase(postLinkLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(postLinkLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(postLinkLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // putPresentation

         .addCase(putPresentationLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(putPresentationLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(putPresentationLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // putVideo

         .addCase(putVideoLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(putVideoLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(putVideoLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })

         // putLink

         .addCase(updateLinkLessonThunk.fulfilled, (state) => {
            state.isLoadingCrud = false
         })
         .addCase(updateLinkLessonThunk.pending, (state) => {
            state.isLoadingCrud = true
         })
         .addCase(updateLinkLessonThunk.rejected, (state) => {
            state.isLoadingCrud = false
         })
   },
})
