import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Sidebar } from '../sidebar/Sidebar'
import { AdminRoutes } from '../../routes/adminRoutes/AdminRoutes'
import { ModalAddedNewGroup } from './groups/ModalAddedNewGroup'

export const GroupAdminPage = () => {
   const [openModal, setOpenModal] = useState(false)

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
   padding: 0 20px;
`
