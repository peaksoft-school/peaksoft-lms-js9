import { styled } from '@mui/material'
import React from 'react'
import PageLogo from '../assets/icons/pageLogo.svg'

export const Page = ({ children, title }) => {
   return (
      <Container>
         <ContainerPageOne>
            <ContainerLogo>
               <img src={PageLogo} alt="efw" />
            </ContainerLogo>
         </ContainerPageOne>
         <ContainePageTwo>
            <ContainerTitles>{title}</ContainerTitles>
            <div>{children}</div>
         </ContainePageTwo>
      </Container>
   )
}

const Container = styled('div')(() => ({
   width: '100%',
   height: '100vh',
   display: 'flex',
}))
const ContainerPageOne = styled('div')(() => ({
   width: '45%',
   height: '100%',
   background: 'var(--button, #3772FF)',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '5.63rem',
}))
const ContainerLogo = styled('div')(() => ({}))
const ContainePageTwo = styled('div')(() => ({
   width: '55%',
   height: '100%',
}))
const ContainerTitles = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize: '1.5rem',
   p: {
      color: '#1F1F1F',
      textAlign: 'center',
      fontWeight: '600',
      width: '16.375rem',
      ':last-child': {
         color: 'red',
      },
   },
}))
