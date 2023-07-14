import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Input } from '../components/UI/Input'
import { Buttons } from '../components/UI/button/Button'
import { OpenEyePassIcon, ClosedEyePassIcon } from '../assets/icons'

export const CreatePassword = () => {
   const [showFirstPassword, setShowFirstPassword] = useState(false)
   const [showSecondPassword, setShowSecondPassword] = useState(false)

   return (
      <Container>
         <ContainerTitle>Создать пароль</ContainerTitle>
         <ContainerInput>
            <ContainerFirstInputConfirmPassword>
               <label style={{ color: '#8D949E' }} htmlFor="1">
                  Новый пароль:
                  <LoginInput
                     size="small"
                     placeholder="Введите новый пароль"
                     type={showFirstPassword ? 'text' : 'password'}
                     id="1"
                  />
                  <button
                     type="button"
                     onClick={() => setShowFirstPassword(!showFirstPassword)}
                  >
                     {showFirstPassword ? (
                        <OpenEyePassIcon />
                     ) : (
                        <ClosedEyePassIcon />
                     )}
                  </button>
               </label>
            </ContainerFirstInputConfirmPassword>
            <ContainerSecondInputConfirmPassword>
               <label style={{ color: '#8D949E' }} htmlFor="2">
                  Подтверждение:
                  <LoginSecondInput
                     size="small"
                     placeholder="Подтвердите пароль"
                     type={showSecondPassword ? 'text' : 'password'}
                     id="2"
                  />
                  <button
                     type="button"
                     onClick={() => setShowSecondPassword(!showSecondPassword)}
                  >
                     {showSecondPassword ? (
                        <OpenEyePassIcon />
                     ) : (
                        <ClosedEyePassIcon />
                     )}
                  </button>
               </label>
            </ContainerSecondInputConfirmPassword>
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
      marginBottom: '1.12rem',
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
const ContainerSecondInputConfirmPassword = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: end;
   gap: 7px;
   position: relative;
   button {
      position: absolute;
      top: 60%;
      right: 20px;
      transform: translateY(-50%);
      cursor: pointer;
      background-color: #fff;
      border: 0;
   }
`
const ContainerFirstInputConfirmPassword = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: end;
   gap: 7px;
   position: relative;
   button {
      position: absolute;
      top: 56%;
      right: 20px;
      transform: translateY(-50%);
      cursor: pointer;
      background-color: #fff;
      border: 0;
   }
`
