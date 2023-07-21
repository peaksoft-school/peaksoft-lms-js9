import React, { useState } from 'react'
import { styled } from '@mui/material'
import { ModalAddedNewGroup } from './groups-modal/ModalAddedNewGroup'
import { AdminRoutes } from '../../../routes/adminRoutes/AdminRoutes'
import { Sidebar } from '../../sidebar/Sidebar'

export const GroupAdminPage = () => {
   const [openModal, setOpenModal] = useState(false)
   const [dataValue, setDataValue] = useState('')

   const openModalAddedNewGroupHandler = () => {
      setOpenModal((prev) => !prev)
   }
   const closeModalAddedNewGroupHandler = () => {
      setOpenModal((prev) => !prev)
   }

   const addedNewGroupHandler = () => {}

   return (
      <>
         <SidebarStyled>
            <Sidebar roles="admin" />
         </SidebarStyled>
         <ContainerModalGroup>
            <ModalAddedNewGroup
               handleClose={closeModalAddedNewGroupHandler}
               openModal={openModal}
               onSubmit={addedNewGroupHandler}
               onDateChange={setDataValue}
               value={dataValue}
            />
            <AdminRoutes
               openModal={openModalAddedNewGroupHandler}
               roles="admin"
            />
         </ContainerModalGroup>
      </>
   )
}

const SidebarStyled = styled('div')`
   position: fixed;
`
const ContainerModalGroup = styled('div')`
   margin-left: 13%;
   padding: 0 1.2rem;
`
