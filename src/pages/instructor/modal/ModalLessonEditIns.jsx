import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'

export const ModalEditLesson = ({
   handleClose,
   value,
   openModal,
   handleSubmit,
   changeUpdateTitle,
}) => {
   return (
      <Modal
         title="Редактировать урок "
         open={openModal}
         handleClose={handleClose}
      >
         <form onSubmit={handleSubmit}>
            <ContainerInputTitleDateStyled>
               <InputTitleStyled
                  type="text"
                  placeholder="Редактировать урок"
                  value={value}
                  onChange={changeUpdateTitle}
               />
            </ContainerInputTitleDateStyled>
            <ContainerButtonsStyled>
               <ButtonCloseStyled
                  variant="outlined"
                  onClick={() => handleClose()}
               >
                  Отмена
               </ButtonCloseStyled>
               <ButtonAddedStyled disabled={!value} type="submit" handleClose>
                  Редактировать
               </ButtonAddedStyled>
            </ContainerButtonsStyled>
         </form>
      </Modal>
   )
}
const InputTitleStyled = styled(Input)(() => ({
   width: '25vw',
}))
const ContainerInputTitleDateStyled = styled('div')`
   display: flex;
   width: 25vw;
`

const ContainerButtonsStyled = styled('div')`
   display: flex;
   justify-content: flex-end;
   gap: 0.625rem;
   align-items: center;
   margin-top: 1.25rem;
`

const ButtonCloseStyled = styled(Button)`
   border-radius: 0.5rem;
   border: 0.0625rem solid var(--button, #3772ff);
   width: 'auto';
   text-transform: capitalize;
   height: 4.5vh;
`

const ButtonAddedStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 'auto';
   height: 4.5vh;
`
