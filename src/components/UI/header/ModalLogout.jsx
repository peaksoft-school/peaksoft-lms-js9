import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../modal/Modal'
import { Button } from '../button/Button'

export const ModalLogout = ({ open, handleClose, logoutHandler }) => {
   return (
      <div>
         <Modal width="600px" open={open} handleClose={handleClose}>
            <ModalStyled>
               <h2>Выйти</h2>
               <ParaghQuestionStyled>
                  Вы уверены, что хотите выйти из аккаунта?
               </ParaghQuestionStyled>
               <div>
                  <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                     Отмена
                  </ButtonCloseStyled>
                  <ButtonDeleteStyled variant="danger" onClick={logoutHandler}>
                     Выйти
                  </ButtonDeleteStyled>
               </div>
            </ModalStyled>
         </Modal>
      </div>
   )
}
const ModalStyled = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 0.7rem;
   div {
      display: flex;
      justify-content: end;
      gap: 0.6rem;
   }
`

const ButtonCloseStyled = styled(Button)`
   border-radius: 0.5rem;
   width: 6.4375rem;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
   height: 2.5rem;
`

const ButtonDeleteStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 6.4375rem;
   height: 2.5rem;
`

const ParaghQuestionStyled = styled('p')`
   color: var(--black, #1f1c1c);
   text-align: center;
   font-size: 1rem;
   font-weight: 400;
   margin: 0 0 1rem 0;
`
