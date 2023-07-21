import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { Button } from '../../../components/UI/button/Button'

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
   gap: 25px;
   margin-top: 2px;
   div {
      display: flex;
      justify-content: center;
      gap: 10px;
   }
`
const ButtonCloseStyled = styled(Button)`
   border-radius: 8px;
   border: 1px solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 103px;
   height: 40px;
`
const ButtonDeleteStyled = styled(Button)`
   border-radius: 8px;
   /* border: 1px solid var(--button, #3772ff); */
   text-transform: capitalize;
   width: 103px;
   height: 40px;
`
const ParaghQuestionStyled = styled('p')`
   width: 190px;
   height: 44px;
   color: var(--black, #1f1c1c);
   text-align: center;
   font-size: 16px;
   font-weight: 400;
`
