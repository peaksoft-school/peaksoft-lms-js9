import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Input } from '../components/UI/Input'
import { Buttons } from '../components/UI/button/Button'
import { OpenEyePassIcon, ClosedEyePassIcon } from '../assets/icons'
import { ForgotModal } from './ForgotModal'

export const SignInPage = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [open, setOpen] = useState(false)
   const handleClose = () => {
      setOpen(false)
   }
   return (
      <Container>
         <ContainerTitle>
            <span>Добро пожаловать</span>
            <br />
            <span style={{ marginLeft: '15px' }}>в </span>
            <span style={{ color: 'red' }}>PEAKSOFT LMS </span>
            <span>!</span>
         </ContainerTitle>
         <ContainerInput>
            <div>
               <label style={{ color: '#8D949E' }} htmlFor="1">
                  Логин:
                  <LoginInput
                     size="small"
                     placeholder="Введите логин"
                     type="text"
                     id="1"
                  />
               </label>
            </div>
            <ContainertConfirmPassword>
               <label style={{ color: '#8D949E' }} htmlFor="2">
                  Пароль:
                  <LoginSecondInput
                     size="small"
                     placeholder="Введите пароль"
                     type={showPassword ? 'text' : 'password'}
                     id="2"
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? (
                        <OpenEyePassIcon />
                     ) : (
                        <ClosedEyePassIcon />
                     )}
                  </button>
               </label>
            </ContainertConfirmPassword>
            <ForgotButtonContainer>
               {open ? (
                  <ForgotModal open={open} handleClose={handleClose} />
               ) : null}
               <ForgotButton onClick={() => setOpen(true)} type="button">
                  Забыли пароль?
               </ForgotButton>
            </ForgotButtonContainer>
         </ContainerInput>
         <Buttons style={{ width: '13rem', marginTop: '2rem' }}>Войти</Buttons>
      </Container>
   )
}
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   height: '100vh',
}))
const LoginInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '28.8vw',
      height: '42px',
      borderRadius: '10px',
      marginBottom: '1.45rem',
      marginTop: '0.629rem',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))
const ContainerTitle = styled('div')(() => ({
   color: '#1F1F1F',
   textlign: 'center',
   fontSize: '1.5rem',
   fontWeight: '600',
   marginBottom: '3.5rem',
}))

const LoginSecondInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '28.8vw',
      height: '42px',
      borderRadius: '10px',
      marginBottom: '0.5rem',
      marginTop: '0.629rem',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))
const ContainerInput = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
}))

const ContainertConfirmPassword = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: end;
   gap: 7px;
   position: relative;
   button {
      position: absolute;
      top: 67%;
      right: 20px;
      transform: translateY(-50%);
      cursor: pointer;
      background-color: #fff;
      border: 0;
   }
`
const ForgotButton = styled('button')`
   display: flex;
   justify-content: end;
   color: #3772ff;
   font-size: 16px;
   font-weight: 400;
   background-color: white;
   border: none;
`
const ForgotButtonContainer = styled('div')`
   width: 100%;
   display: flex;
   justify-content: end;
`
