import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/UI/table/Table'
import {
   deleteTeacherCourse,
   getInstructors,
} from '../../../../store/instructor/instructorThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { DeleteIconCourses } from '../../../../assets/icons'
import { ModalDelete } from '../courses-modal/ModalDelete'
import { useToggle } from '../../../../utils/hooks/general'
import { IconButtons } from '../../../../components/UI/button/IconButtons'
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const TableTeachers = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const [getIdTeachers, setGetIdTeachers] = useState()
   const [getName, setGetName] = useState()
   const { instructors, isLoading, getAllIns } = useSelector(
      (state) => state.instructors
   )
   const { isActive, setActive } = useToggle('modaldeleteteachers')

   useEffect(() => {
      dispatch(getInstructors(params.id))
   }, [])

   useEffect(() => {
      const getNameTeacher = getAllIns.find(
         (el) => getIdTeachers === el.id
      )?.fullName
      if (getNameTeacher) {
         setGetName(getNameTeacher)
      }
   }, [getIdTeachers, getAllIns])

   const handleClickDelete = () => {
      dispatch(
         deleteTeacherCourse({
            courseId: params.id,
            instructorId: getIdTeachers,
            showSnackbar,
         })
      )
      setActive('')
   }
   const openModalDelete = (id) => {
      setActive(!isActive)
      setGetIdTeachers(id)
   }
   const columnsTableCoursTeachers = [
      { id: 'id', label: 'ID' },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'specialization', label: 'Специализация' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'E-mail' },
      {
         render: (row) => (
            <IconButtons
               onClick={() => openModalDelete(row.id)}
               style={{ margin: '0 0 0 20%' }}
            >
               <DeleteIconCourses />
            </IconButtons>
         ),
         label: 'Действие',
      },
   ]

   return (
      <div>
         {isLoading && <Isloading />}
         {instructors && instructors.length > 0 ? (
            <Table data={instructors} columns={columnsTableCoursTeachers} />
         ) : (
            <NotFound content="Нет учителей" />
         )}
         <ModalDelete
            open={isActive}
            handleClose={() => setActive('')}
            deleteCardHandler={handleClickDelete}
            paragraph={`учителя ${getName}`}
         />
      </div>
   )
}
