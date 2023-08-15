import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/UI/table/Table'
import { columnsTableCourses } from '../../../../utils/constants/constants'
import { getGroupUsers } from '../../../../store/students/studentsThunk'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const TableStudents = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { students, isLoading } = useSelector((state) => state.students)

   useEffect(() => {
      dispatch(getGroupUsers(params.id))
   }, [])

   return (
      <div>
         {isLoading && <Isloading />}
         <Table data={students} columns={columnsTableCourses} />
      </div>
   )
}
