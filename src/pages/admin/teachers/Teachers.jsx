import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Header } from '../../../components/UI/header/Header'
import Table from '../../../components/UI/table/Table'
import { useToggle } from '../../../utils/hooks/general'
import { ModalTeachers } from './ModalTeacher'
import {
   deleteTeacherId,
   getTeachers,
} from '../../../store/teachers/teachers.thunk'
import { TrashIcon, EditTeachers } from '../../../assets/icons'
import { IconButtons } from '../../../components/UI/button/IconButtons'
import { ModalDelete } from '../courses/courses-modal/ModalDelete'
import { Isloading } from '../../../components/UI/snackbar/Isloading'
import { showSnackbar } from '../../../components/UI/snackbar/Snackbar'
import { NotFound } from '../../../components/UI/not-found/NotFound'

export const Teachers = () => {
   const dispatch = useDispatch()
   const { data, isLoading } = useSelector((state) => state.teachers)
   const [idInstructor, setIdInstructor] = useState()
   const [nameInstructor, setNameInstructor] = useState()
   const { isActive, setActive } = useToggle('modaladdedteachers')
   const { isActive: isActiceDeleteModal, setActive: setActiveDeleteModal } =
      useToggle('openModal')
   const [openEditModal, setOpenEditModal] = useState(false)
   const [editModalData, setEditModalData] = useState(null)

   const openModalAddedTeacherHandler = () => {
      setActive(!isActive)
   }

   const openEditModalTeacher = (id) => {
      const teacherData = data.find((item) => item.id === id)
      setOpenEditModal((prevState) => !prevState)
      setEditModalData(teacherData)
   }

   const closeModalHandler = () => {
      setActive('')
   }

   const deleteTeacherModal = ({ id, name }) => {
      setIdInstructor(id)
      setNameInstructor(name)
      setActiveDeleteModal('openModal')
   }

   const deleteTeacherrrr = () => {
      dispatch(deleteTeacherId({ idInstructor, showSnackbar }))
      setActiveDeleteModal('')
   }

   useEffect(() => {
      dispatch(getTeachers())
   }, [dispatch])
   const onClose = () => {
      setActiveDeleteModal('')
   }
   const teachersColumns = [
      { id: 'id', label: 'ID' },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'specialization', label: 'Специализация' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'E-mail' },
      { id: 'password', label: 'Пароль' },
      {
         render: (row) => (
            <Container>
               <IconButtons onClick={() => openEditModalTeacher(row.id)}>
                  <EditTeachers />
               </IconButtons>
               <IconButtons
                  onClick={() =>
                     deleteTeacherModal({ id: row.id, name: row.fullName })
                  }
               >
                  <TrashIcon />
               </IconButtons>
            </Container>
         ),
         label: 'Действия',
      },
   ]

   return (
      <>
         {isLoading && <Isloading />}
         <Header
            titlePage="Администратор"
            buttonContent="Добавить учителя"
            onClick={openModalAddedTeacherHandler}
         />
         <BoxStyle>
            {data && data.length > 0 ? (
               <TableContainer>
                  <Table columns={teachersColumns} data={data} />
               </TableContainer>
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет учителей!" />
               </ContainerNotFound>
            )}
         </BoxStyle>
         <ModalTeachers open={isActive} handleClose={closeModalHandler} />
         <ModalDeleteStyled
            open={isActiceDeleteModal}
            handleClose={onClose}
            deleteCardHandler={deleteTeacherrrr}
            paragraph={`учителя ${nameInstructor}`}
         />
         {openEditModal && (
            <ModalTeachers
               open={openEditModal}
               handleClose={openEditModalTeacher}
               modalData={editModalData}
            />
         )}
      </>
   )
}
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`

const TableContainer = styled(Box)(() => ({
   width: '100%',
}))

const Container = styled(Box)(() => ({
   display: 'flex',
   marginLeft: '17px',
}))
const BoxStyle = styled(Box)(() => ({
   marginTop: '1.6%',
}))

const ModalDeleteStyled = styled(ModalDelete)(() => ({
   width: '22rem',
}))
