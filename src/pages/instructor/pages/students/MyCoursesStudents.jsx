import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Pagination, Stack, styled } from '@mui/material'
import Table from '../../../../components/UI/table/Table'
import { IconButtons } from '../../../../components/UI/button/IconButtons'
import { useToggle } from '../../../../utils/hooks/general'
import { Trash } from '../../../../assets/icons'
import { ModalDeleteGroup } from '../../../admin/groups/groups-modal/ModalDeleteGroup'
import { NotFound } from '../../../../components/UI/not-found/NotFound'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import {
   deleteStudent,
   getStudents,
} from '../../../../store/students/studentsThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'

export const MyCoursesStudents = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const [getName, setGetName] = useState()
   const [getId, setGetId] = useState()
   const { courseStudents, isLoading } = useSelector((state) => state.students)
   const { isActive, setActive } = useToggle('modaldeleteteachers')
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(getStudents({ id: +params.id, page }))
   }, [])

   const openModalDelete = (data) => {
      setActive(!isActive)
      setGetName(data.name)
      setGetId(data.id)
   }

   const handleClickDelete = () => {
      dispatch(
         deleteStudent({
            showSnackbar,
            page,
            id: getId,
            courseId: +params.id,
         })
      )
      setActive('')
   }

   const columns = [
      { id: 'id', label: 'N' },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'groupName', label: 'Группа' },
      { id: 'studyFormat', label: 'Формат обучение' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'E-mail' },
      { id: 'password', label: 'Пароль' },
      {
         render: (row) => (
            <IconButtons
               onClick={() =>
                  openModalDelete({ name: row.fullName, id: row.id })
               }
               style={{ margin: '0 0 0 20%' }}
            >
               <Trash />
            </IconButtons>
         ),
         label: 'Действие',
      },
   ]
   return (
      <div>
         {isLoading && <Isloading />}
         {courseStudents.studentResponses?.length > 0 ? (
            <Table data={courseStudents.studentResponses} columns={columns} />
         ) : (
            <NotFound content="Нет студентов!" />
         )}
         <StackStyled>
            <Stack spacing={2}>
               <Pagination
                  count={Math.ceil(courseStudents.quantityOfStudents / 10)}
                  color="primary"
                  page={page}
                  onChange={(event, newPage) => {
                     setPage(newPage)
                     dispatch(getStudents({ id: +params.id, page: newPage }))
                  }}
               />
            </Stack>
         </StackStyled>
         <ModalDeleteGroup
            open={isActive}
            handleClose={() => setActive('')}
            deleteCardHandler={handleClickDelete}
            paragraph={`студента ${getName}`}
         />
      </div>
   )
}
const StackStyled = styled('div')`
   position: absolute;
   bottom: 1%;
   left: 50%;
`
