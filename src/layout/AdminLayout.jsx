import React from 'react'
import { styled } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const AdminLayout = () => {
   return (
      <>
         <SidebarStyled>
            <Sidebar roles="admin" />
         </SidebarStyled>
         <Container>
            <Outlet />
         </Container>
      </>
   )
}

const SidebarStyled = styled('div')`
   position: fixed;
`
const Container = styled('div')`
   margin-left: 13%;
   padding: 0 1.2rem;
`
