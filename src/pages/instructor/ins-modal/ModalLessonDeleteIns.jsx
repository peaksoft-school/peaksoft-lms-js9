import React from 'react'
import { Button, Modal, styled } from '@mui/material'

export const ModalDeleteLesson = ({
   open,
   handleClose,
   deleteCardHandler,
   getTitle,
}) => {
   const maxLength = 14
   const truncatedText = getTitle.substring(0, maxLength)
   return (
      <Modal width="315px" open={open} handleClose={handleClose}>
         <ModalStyled>
            <ParaghQuestionStyled>
               Вы уверены,что хотите удалить урок⠀
               <b>
                  {getTitle.length <= maxLength
                     ? getTitle
                     : `${truncatedText}...`}
               </b>
               ?
            </ParaghQuestionStyled>
            <div>
               <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                  Отмена
               </ButtonCloseStyled>
               <ButtonDeleteStyled variant="danger" onClick={deleteCardHandler}>
                  Удалить
               </ButtonDeleteStyled>
            </div>
         </ModalStyled>
      </Modal>
   )
}

const ModalStyled = styled('div')(() => ({
   display: 'flex',
   padding: '1rem 1.56rem 1.56rem 1.56rem',
   borderRadius: '8px',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',
   width: '315px',
   height: 'auto',
   position: 'absolute',
   border: '5px solid white',
   top: '37%',
   left: '42%',
   gap: '1.5625rem',
   backgroundColor: 'white',
   div: {
      display: 'flex',
      gap: '0.625rem',
   },

   ':active': {
      border: 'none',
   },
}))

const ButtonCloseStyled = styled(Button)(() => ({
   borderRadius: '0.5rem',
   textTransform: 'capitalize',
   width: '6.4375rem',
   height: '2.5rem',
}))

const ButtonDeleteStyled = styled(Button)(() => ({
   borderRadius: '0.5rem',
   textTransform: 'capitalize',
   width: '6.4375rem',
   height: '2.5rem',
   backgroundColor: 'red',
   color: 'white',
   ':hover': {
      backgroundColor: 'red',
   },
}))

const ParaghQuestionStyled = styled('p')(() => ({
   width: '11.875rem',
   height: 'auto',
   overflow: 'inherit',
   textAlign: 'center',
   fontSize: '1rem',
   fontWeight: '400',
}))
