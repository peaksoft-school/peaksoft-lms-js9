import { styled } from '@mui/material'
import React from 'react'
import Peacsoft from '../assets/icons/PEAKSOFT.svg'
import Logo from '../assets/icons/XMLID_1207_.svg'
import Circle from '../assets/icons/Circle.svg'

export const Page = ({ children, title }) => {
   return (
      <Container>
         <ContainerPageOne>
            <ContainerCircle>
               <img src={Circle} alt="efw" />
            </ContainerCircle>
            <ContainerTitle>
               <img src={Peacsoft} alt="efw" />
            </ContainerTitle>
            <ContainerLogo>
               <img src={Logo} alt="efw" />
            </ContainerLogo>
         </ContainerPageOne>
         <ContainePageTwo>
            <ContainerTitles>
               <h3>{title}</h3>
            </ContainerTitles>
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
   width: '40%',
   height: '100%',
   background: 'var(--button, #3772FF)',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '5.63rem',
}))
const ContainerLogo = styled('div')(() => ({
   width: '16.42938rem',
   height: '19.6875rem',
}))
const ContainerTitle = styled('div')(() => ({
   width: '14.5895rem',
   height: '2.04081rem',
}))
const ContainerCircle = styled('div')(() => ({
   position: 'absolute',
   top: 132,
   left: 435,
}))
const ContainePageTwo = styled('div')(() => ({
   width: '60%',
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
