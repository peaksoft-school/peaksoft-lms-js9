import React, { useState } from 'react'
import { styled } from '@mui/material'
import { cardsGroup } from '../../../../utils/constants/cardsGroup'
import { Card } from '../../../../components/UI/cards/Card'
import { ModalDeleteGroup } from '../groups-modal/ModalDeleteGroup'
import { ModalEditGroup } from '../groups-modal/ModalEditGroup'
import { Header } from '../../../../components/UI/header/Header'

export const Groups = ({ openModal }) => {
   const [openModalDelete, setOpenModalDelete] = useState(false)
   const [openModalEdit, setOpenModalEdit] = useState(false)
   const [dateEditModal, setDateEditModal] = useState('')

   const deleteCardHandler = (param) => {
      if (param.menuId === 1) {
         setOpenModalEdit((prev) => !prev)
      } else if (param.menuId === 2) {
         setOpenModalDelete((prev) => !prev)
      }
   }
   const closeModalDeleteHandler = () => {
      setOpenModalDelete((prev) => !prev)
   }
   const closeModalEditHandler = () => {
      setOpenModalEdit((prev) => !prev)
   }
   return (
      <>
         <Header
            titlePage="Администратор"
            buttonContent="Создать группу"
            onClick={openModal}
         />
         <ContainerItem>
            {cardsGroup.map((el) => {
               return <Card key={el.id} el={el} onClick={deleteCardHandler} />
            })}
         </ContainerItem>
         <div>
            {openModalDelete && (
               <ModalDeleteGroup
                  open={openModalDelete}
                  handleClose={closeModalDeleteHandler}
               />
            )}
            {openModalEdit && (
               <ModalEditGroup
                  openModal={openModalEdit}
                  handleClose={closeModalEditHandler}
                  onDateChange={setDateEditModal}
                  value={dateEditModal}
               />
            )}
         </div>
      </>
   )
}
const ContainerItem = styled('div')`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   gap: 20px;
`
