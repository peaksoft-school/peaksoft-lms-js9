import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { postFile } from '../courses/coursesThunk'
import { getLesson } from '../lesson/lessonThunk'

// getLinks

export const getLinkLessonThunk = createAsyncThunk(
   'lessonCrud/getLinkLesson',
   async (lessonId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`/api/links/${lessonId}`)
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

// postLink

export const postLinkLessonThunk = createAsyncThunk(
   'lessonCrud/postLinkLesson',
   async (
      { lessonId, values, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.post(`/api/links/${lessonId}`, values)
         showSnackbar('Ссылка успешно добавлен!', 'success')
         return dispatch(getLinkLessonThunk(lessonId))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.massage)
      }
   }
)
// putLink

export const updateLinkLessonThunk = createAsyncThunk(
   'lessonCrud/updateLinkLesson',
   async ({ data, linkId, showSnackbar }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(`/api/links/${linkId}`, data)
         showSnackbar('Ссылка успешно редактирован!', 'success')
         return response
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
// deleteLink

export const deleteLinkLessonThunk = createAsyncThunk(
   'lessonCrud/deleteLinkLesson',
   async ({ linkId, showSnackbar }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(`/api/links/${linkId}`)
         showSnackbar('Ссылка успешно удалено!', 'success')
         return response
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
// getVideo
export const getVideoLessonThunk = createAsyncThunk(
   'lessonCrud/getVideoLesson',
   async (lessonId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/videos/${lessonId}/lesson`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
// postVideo

export const postVideoLessonThunk = createAsyncThunk(
   'lessonCrud/postVideoLesson',
   async (
      { courseId, lessonId, values, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.post(`/api/videos/${lessonId}`, values)
         showSnackbar('Видеоурок успешно добавлен!', 'success')
         return dispatch(getLesson(courseId))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
// putVideo
export const putVideoLessonThunk = createAsyncThunk(
   'lessonCrud/putVideoLesson',
   async ({ data, videoLessonId, showSnackbar }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.put(
            `/api/videos/${videoLessonId}`,
            data
         )
         showSnackbar('Видеоурок успешно редактирован!', 'success')
         return response
      } catch (error) {
         showSnackbar(error.message, 'error')

         return rejectWithValue(error.message)
      }
   }
)
// deleteVideo
export const deleteVideoLessonThunk = createAsyncThunk(
   'lessonCrud/deleteVideoLesson',
   async (
      { lessonId, videoId, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         await axiosInstance.delete(`/api/videos/${videoId}`)
         showSnackbar('Видеоурок успешно удалено!', 'success')
         return dispatch(getLinkLessonThunk(lessonId))
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
// getPresentation
export const getPresentationLessonThunk = createAsyncThunk(
   'lessonCrud/getPresentationLesson',
   async (lessonId, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/presentations/getAll/${lessonId}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)

// postPresentation

export const postPresentationLessonThunk = createAsyncThunk(
   'lessonCrud/postPresentationLesson',
   async ({ lessonId, data, showSnackbar }, { rejectWithValue, dispatch }) => {
      try {
         const getFile = await dispatch(postFile(data.linkFilePpt)).unwrap()
         await axiosInstance.post(`/api/presentations/${lessonId}`, {
            ...data,
            linkPptFile: getFile,
         })
         showSnackbar('Презентация успешно добавлен!', 'success')

         return dispatch(getPresentationLessonThunk(lessonId))
      } catch (error) {
         showSnackbar(error.message, 'error')

         return rejectWithValue(error.message)
      }
   }
)
// putPresentation
export const putPresentationLessonThunk = createAsyncThunk(
   'lessonCrud/putPresentationLesson',
   async (
      { lessonId, presentationId, data, showSnackbar },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const getFile = await dispatch(postFile(data.linkFilePpt)).unwrap()
         await axiosInstance.put(`/api/presentations/${presentationId}`, {
            ...data,
            linkPptFile: getFile,
         })
         showSnackbar('Презентация успешно редактирован!', 'success')
         return dispatch(getPresentationLessonThunk(lessonId))
      } catch (error) {
         showSnackbar(error.message, 'error')

         return rejectWithValue(error.message)
      }
   }
)

// deletePresentation
export const deletePresentationLessonThunk = createAsyncThunk(
   'lessonCrud/deletePresentationLesson',
   async ({ presentationId, showSnackbar }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.delete(
            `/api/presentations/${presentationId}`
         )
         showSnackbar('Презентация успешно удалено!', 'success')
         return response
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
