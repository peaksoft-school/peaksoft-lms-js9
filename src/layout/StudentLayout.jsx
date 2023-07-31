import React from 'react'
import { styled } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar/Sidebar'
import { Header } from '../components/UI/header/Header'

export const StudentLayout = () => {
   return (
      <>
         <SidebarStyled>
            <Sidebar roles="student" />
         </SidebarStyled>
         <Container>
            <Header titlePage="Студент" />
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
