import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Box, CircularProgress } from '@mui/material'
import { Header } from '../../../components/UI/header/Header'
import Table from '../../../components/UI/table/Table'
import { useToggle } from '../../../utils/hooks/general'
import { ModalTeachers } from './ModalTeacher'
import {
   deleteTeacherId,
   getTeacher,
} from '../../../store/teachers/teachers.thunk'
import { TrashIcon, Eyes, EditTeachers } from '../../../assets/icons'
import { IconButtons } from '../../../components/UI/button/IconButtons'
import { Modal } from '../../../components/UI/modal/Modal'
import { Button } from '../../../components/UI/button/Button'

export const Teachers = () => {
   const { data, isLoading } = useSelector((state) => state.teachers)
   console.log(data, 'data')
   console.log(isLoading, 'isLoading')
   const { isActive, setActive } = useToggle('modaladdedteachers')
   const dispatch = useDispatch()
   const [openDeleteModal, setOpenDeleteModal] = useState(false)
   const [idInstructor, setIdInstructor] = useState()
   // const ids = data.map((item) => item.id)
   // console.log(ids)

   const openModalAddedTeacherHandler = () => {
      setActive(!isActive)
   }

   const closeModalHandler = () => {
      setActive('')
   }

   const deleteTeacherModal = (id) => {
      setIdInstructor(id)
      setOpenDeleteModal((prevState) => !prevState)
   }

   const deleteTeacherrrr = () => {
      dispatch(deleteTeacherId(idInstructor))
      setOpenDeleteModal((prevState) => !prevState)
   }

   useEffect(() => {
      dispatch(getTeacher())
   }, [dispatch])

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
               <IconButtons onClick={console.log(row.id, 'edit')}>
                  <EditTeachers />
               </IconButtons>
               <IconButtons onClick={console.log(row.id, 'eyes')}>
                  <Eyes />
               </IconButtons>
               <IconButtons onClick={() => deleteTeacherModal(row.id)}>
                  <TrashIcon />
               </IconButtons>
            </Container>
         ),
         label: 'Действия',
      },
   ]

   return (
      <div>
         <div>
            <Header
               titlePage="Администратор"
               buttonContent="Добавить учителя"
               onClick={openModalAddedTeacherHandler}
            />
         </div>

         <ModalTeachers open={isActive} handleClose={closeModalHandler} />
         <BoxStyle>
            <Table columns={teachersColumns} data={data} />

            {isLoading && (
               <ContainerProgress>
                  <CircularProgress />
               </ContainerProgress>
            )}
         </BoxStyle>
         {openDeleteModal && (
            <ModalStyle open={openDeleteModal} onClose={openDeleteModal}>
               <ContainerP>
                  <p>Вы уверены, что хотите удалить группу ... ?</p>
               </ContainerP>
               <Button onClick={() => deleteTeacherrrr()}>Yes</Button>
               <Button
                  onClick={() => setOpenDeleteModal((prevState) => !prevState)}
               >
                  Noo!
               </Button>
            </ModalStyle>
         )}
      </div>
   )
}

const BoxStyle = styled(Box)(() => ({
   marginTop: '1.5%',
}))

const ContainerProgress = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: '150px',
   // height: '50%',
}))

const Container = styled(Box)(() => ({
   display: 'flex',
}))

const ModalStyle = styled(Modal)(() => ({
   width: '10rem',
}))

const ContainerP = styled(Box)(() => ({
   width: '190px',
}))
