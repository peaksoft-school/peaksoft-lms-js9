import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/UI/table/Table'
import { columnsTableGroup } from '../../../../utils/constants/constants'
import { getInstructors } from '../../../../store/instructor/instructorThunk'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const TableTeachers = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { instructors, isLoading } = useSelector((state) => state.instructors)

   useEffect(() => {
      dispatch(getInstructors(params.id))
   }, [])
   console.log(instructors)
   console.log(isLoading)

   return (
      <div>
         {isLoading && <Isloading />}
         <Table data={instructors} columns={columnsTableGroup} />
      </div>
   )
}
