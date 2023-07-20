import React from 'react'
import { styled } from '@mui/material'
import BlockIcon from '../assets/icons/blockIcon.svg'
import { Modal } from '../components/UI/modal/Modal'

export const BlockPage = ({ open, handleClose }) => {
   return (
      <Modal open={open} handleClose={handleClose}>
         <Container>
            <img src={BlockIcon} alt="blockPhoto" />
            <div>
               <h2>Вам закрыли доступ</h2>
            </div>
            <p>Вам закрыли доступ к системе,внесите оплату для продолжения !</p>
         </Container>
      </Modal>
   )
}
const Container = styled('div')(() => ({
   width: '26.3125rem',
   height: '23.5625rem',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   marginLeft: '2rem',
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
