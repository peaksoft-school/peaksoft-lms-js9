import React from 'react'
import { styled } from '@mui/material'
import BlockIcon from '../assets/icons/blockIcon.svg'

export const BlockPage = () => {
   return (
      <Container>
         <img src={BlockIcon} alt="blockPhoto" />
         <h2>Вам закрыли доступ</h2>
         <p>Вам закрыли доступ к системе,внесите оплату для продолжения !</p>
      </Container>
   )
}
const Container = styled('div')(() => ({
   width: '100%',
   height: '100vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   h2: {
      color: '#000',
      textAlign: 'center',
      fontSize: '1.478rem',
      fontWeight: '600',
      marginTop: '1.31rem',
   },
   p: {
      width: '22.5625rem',
      color: 'var(--mobile-label-light-gray, rgba(60, 60, 67, 0.60))',
      textAlign: ' center',
      fontSize: '1.18238rem',
      fontWeight: '400',
      marginTop: '0.69rem',
   },
}))
