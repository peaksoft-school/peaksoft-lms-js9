import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../../components/UI/modal/Modal'
import { Button } from '../../../../components/UI/button/Button'

export const ModalDeleteGroup = ({ open, handleClose, deleteCardHandler }) => {
   return (
      <div>
         <Modal width="315px" open={open} handleClose={handleClose}>
            <ModalStyled>
               <ParaghQuestionStyled>
                  Вы уверены, что хотите удалить группу ... ?
               </ParaghQuestionStyled>
               <div>
                  <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                     Отмена
                  </ButtonCloseStyled>
                  <ButtonDeleteStyled
                     variant="danger"
                     onClick={deleteCardHandler}
                  >
                     Удалить
                  </ButtonDeleteStyled>
               </div>
            </ModalStyled>
         </Modal>
      </div>
   )
}
const ModalStyled = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   gap: 1.5625rem;
   margin-top: 0.125rem;
   div {
      display: flex;
      justify-content: center;
      gap: 0.625rem;
   }
`

const ButtonCloseStyled = styled(Button)`
   border-radius: 0.5rem;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 6.4375rem;
   height: 2.5rem;
`

const ButtonDeleteStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 6.4375rem;
   height: 2.5rem;
`

const ParaghQuestionStyled = styled('p')`
   width: 11.875rem;
   height: 2.75rem;
   color: var(--black, #1f1c1c);
   text-align: center;
   font-size: 1rem;
   font-weight: 400;
`
