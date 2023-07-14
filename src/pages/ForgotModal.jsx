import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../components/UI/modal/Modal'
import { Buttons } from '../components/UI/button/Button'
import { Input } from '../components/UI/Input'

export const ForgotModal = ({ open, handleClose }) => {
   return (
      <div>
         <Modal title="Забыли пароль?" open={open} handleClose={handleClose}>
            <div>
               <ContentTitle>
                  Вам будет отправлена ссылка для сброса пароля
               </ContentTitle>
               <ForgotInput placeholder="Введите ваш Email" size="small" />
            </div>
            <ForgotButton>Отправить</ForgotButton>
         </Modal>
      </div>
   )
}
const ContentTitle = styled('div')(() => ({
   color: 'var(--color-dark-dark-2, #87898E)',
   fontSize: '14px',
   fontWeight: '400',
}))
const ForgotButton = styled(Buttons)(() => ({
   padding: '10px 24px',
   width: '31vw',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: ' 8px',
   marginLeft: '9px',
}))
const ForgotInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '32vw',
      height: '42px',
      borderRadius: '10px',
      marginBottom: '1.45rem',
      marginTop: '0.629rem',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))
