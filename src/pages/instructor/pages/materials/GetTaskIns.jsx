import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { axiosInstance } from '../../../../config/axiosInstance'

export const GetTaskIns = () => {
   useEffect(() => {
      axiosInstance
         .get('/api/tasks/getById')
         .then((res) => console.log(res))
         .catch((error) => console.log(error))
   }, [])
   return (
      <Container>
         <BoxStyle>
            <DivStyle>
               <Backdrop>
                  <Wrapper>
                     <H1>Название задания</H1>
                     <H2>Название файла.формат</H2>
                     <HomeWork>
                        <h2>
                           Lorem ipsum dolor sit amet consectetur adipisicing
                           elit. Atque, doloribus.
                        </h2>
                     </HomeWork>
                  </Wrapper>
               </Backdrop>
            </DivStyle>
         </BoxStyle>
      </Container>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
}))

const Backdrop = styled(Box)(() => ({
   backgroundColor: 'white',
   width: '90%',
   height: '100%',
   display: 'flex',
   justifyContent: 'flex-start',
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
   height: '100%',
}))

const Wrapper = styled(Box)(() => ({
   marginLeft: '1.25rem',
   marginTop: '1.5rem',
}))

const H1 = styled('h1')(() => ({
   fontStyle: 'normal',
   fontWeight: 400,
   lineHeight: '1.6875rem',
}))
const H2 = styled('h3')(() => ({
   fontFamily: 'Open Sans',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: 400,
   lineheight: '1.375rem',
   textDecorationLine: 'underline',
   marginTop: '1.13rem',
   color: '#3772FF',
}))

const HomeWork = styled(Box)(() => ({
   width: ' 21.125rem',
   height: '19.25rem',
   flexShrink: 0,
   background: ' #EFF0F4',
   marginTop: '1.12rem',

   h2: {
      fontFamily: 'Open Sans',
      fontSize: '0.875rem',
      fontStyle: 'normal',
      fontWeight: 400,
   },
}))
