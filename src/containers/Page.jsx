import { Box, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import React from 'react'
import { Isloading } from '../components/UI/snackbar/Isloading'
import logoPath from '../assets/icons/pageLogo.svg'
import kod from '../assets/video/kod.MP4'

const posterImage = require('../assets/video/kod.MP4')

export const Page = ({ children, title }) => {
   const { isLoading } = useSelector((state) => state.auth)
   return (
      <Container>
         <ContainerPageOne>
            <VideoContainer>
               <video
                  width="100%"
                  height="100%"
                  autoPlay
                  loop
                  muted
                  poster={posterImage}
                  style={{
                     objectFit: 'cover',
                     filter: 'brightness(40%)',
                  }}
                  controlsList="nodownload"
               >
                  <source src={kod} type="video/mp4" />
               </video>
               <LogoContainer>
                  <Logo src={logoPath} alt="Логотип" />
               </LogoContainer>
            </VideoContainer>
         </ContainerPageOne>
         <ContainePageTwo>
            <ContainerTitles>{title}</ContainerTitles>
            <div>{children}</div>
         </ContainePageTwo>
         {isLoading && <Isloading />}
      </Container>
   )
}

const Container = styled('div')(() => ({
   width: '100%',
   height: '100vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const ContainerPageOne = styled(Box)(() => ({
   width: '40%',
   height: '100vh',
   position: 'relative',
}))

const ContainePageTwo = styled('div')(() => ({
   width: '60%',
   height: '100vh',
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

const VideoContainer = styled('div')(() => ({
   position: 'relative',
   width: '100%',
   height: '100vh',
}))

const LogoContainer = styled('div')(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
}))

const Logo = styled('img')(() => ({
   width: '45vh',
   height: '45vh',
}))
