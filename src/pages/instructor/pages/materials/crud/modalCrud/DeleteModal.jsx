import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../../../../components/UI/modal/Modal'
import { Button } from '../../../../../../components/UI/button/Button'

export const DeleteModal = ({
   deleteHandler,
   isActive,
   setActive,
   closeHandlerModal,
   paragraph,
}) => {
   return (
      <div>
         <Modal open={isActive} handleClose={() => setActive('')}>
            <Container>
               <Title>Вы уверены, что хотите {paragraph}?</Title>
               <ButtonContainer>
                  <ButtonClose variant="outlined" onClick={closeHandlerModal}>
                     Отмена
                  </ButtonClose>
                  <ButtonDelete variant="danger" onClick={deleteHandler}>
                     Удалить
                  </ButtonDelete>
               </ButtonContainer>
            </Container>
         </Modal>
      </div>
   )
}
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   width: '14rem',
   height: '6rem',
   gap: '1rem',
   marginTop: '0.125rem',
}))
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   height: '100vh',
   justifyContent: 'center',
   alignItems: 'end',
   gap: '1rem',
}))
const Title = styled('p')(() => ({
   width: ' 11.875rem',
   height: '2.75rem',
   color: 'var(--black, #1f1c1c)',
   textAlign: 'center',
   fontSize: '1rem',
   fontWeight: 400,
}))

const ButtonClose = styled(Button)(() => ({
   borderRadius: '0.5rem',
   border: '0.0625rem solid var(--button, #3772ff)',
   textTransform: 'capitalize',
   width: '6.4375rem',
   height: '2.5rem',
}))
const ButtonDelete = styled(Button)(() => ({
   borderRadius: '0.5rem',
   textTransform: 'capitalize',
   width: '6.4375rem',
   height: '2.5rem',
}))
