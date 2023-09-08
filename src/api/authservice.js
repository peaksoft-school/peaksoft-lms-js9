import { axiosInstance } from '../config/axiosInstance'

const signIn = (userData) => {
   return axiosInstance.post('/auth/signIn', userData)
}

export default { signIn }
