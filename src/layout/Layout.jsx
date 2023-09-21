import React from 'react'
import { styled } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const Layout = ({ rolesLayout }) => {
   return (
      <>
         <SidebarStyled>
            <Sidebar
               roles={rolesLayout === 'student' ? 'student' : 'instructor'}
            />
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
   margin-left: 15rem;
   padding: 0 1.2rem;
`
