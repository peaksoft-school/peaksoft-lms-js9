import axios from 'axios'
import { BASE_URL } from '../utils/constants/constants'

export const fileAxiosInstanse = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'multipart/form-data',
   },
})

let store
export const injectStoreFile = (_store) => {
   store = _store
}

fileAxiosInstanse.interceptors.request.use(
   (config) => {
      const configUpdate = { ...config }
      const { token } = store.getState().auth
      if (token) {
         configUpdate.headers.Authorization = `Bearer ${token}`
      }

      return configUpdate
   },
   (error) => {
      return Promise.reject(error)
   }
)

fileAxiosInstanse.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },
   (error) => {
      if (error.response?.status === 401) {
         //  store.dispatch(postFiles())
         throw new Error('401 unauthotized')
      }
      return Promise.reject(error)
   }
)
