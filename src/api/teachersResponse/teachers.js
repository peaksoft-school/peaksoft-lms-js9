import { axiosInstance } from '../../config/axiosInstance'

export const postTeacherLMS = (teacherData) => {
   return axiosInstance.post('/api/instructors', teacherData)
}

export const getTeacherLMS = () => {
   return axiosInstance.get('/api/instructors')
}

export const deleteTeacherLMS = (id) => {
   return axiosInstance.delete(`/api/instructors/${id}`)
}
export const editTeacherLMS = (id, newData) => {
   return axiosInstance.put(`/api/instructors/${id}`, newData)
}
