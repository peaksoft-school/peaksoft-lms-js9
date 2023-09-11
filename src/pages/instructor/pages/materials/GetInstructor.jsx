import React from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { Sidebar } from '../../../../layout/Sidebar'
import { Header } from '../../../../components/UI/header/Header'

export const GetInstructor = () => {
   return (
      <Container>
         <div>
            <SideBarStyle roles="instructor" />
         </div>
         <BoxStyle>
            <HeaderStyle titlePage="Инструктор" />
            <DivStyle>
               <BoxStyleeeee>dfkjgnkflhjeor</BoxStyleeeee>
            </DivStyle>
         </BoxStyle>
      </Container>
   )
}

const SideBarStyle = styled(Sidebar)(() => ({
   position: 'absolute',
}))

const HeaderStyle = styled(Header)(() => ({
   position: 'absolute',
   top: 0,
   left: 0,
   zIndex: 3,
}))

const Container = styled('div')(() => ({
   display: 'flex',
}))

const BoxStyleeeee = styled(Box)(() => ({
   backgroundColor: 'white',
   width: '90%',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   borderRadius: '10px',
}))
const BoxStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: '100%',
}))

const DivStyle = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))
