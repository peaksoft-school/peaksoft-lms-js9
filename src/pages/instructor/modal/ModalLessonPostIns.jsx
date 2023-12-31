import React from 'react'
import { styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'

export const ModalLessonPost = ({
   handleClose,
   postLesson,
   openModal,
   onChangePostandler,
   value,
}) => {
   const { handleSubmit } = useForm()
   const onSubmitForm = () => {
      postLesson()
      handleClose()
   }
   return (
      <Modal title="Добавить урок" open={openModal} handleClose={handleClose}>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <InputTitleStyled
               value={value}
               onChange={onChangePostandler}
               placeholder="Введите имя урока"
            />
            <ContainerButtonsStyled>
               <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                  Отмена
               </ButtonCloseStyled>
               <ButtonAddedStyled type="submit" disabled={!value}>
                  Добавить
               </ButtonAddedStyled>
            </ContainerButtonsStyled>
         </form>
      </Modal>
   )
}
const InputTitleStyled = styled(Input)`
   width: 25vw;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      padding: 0px 1.125rem;
      height: 4.5vh;
   }
`
const ContainerButtonsStyled = styled('div')`
   justify-content: flex-end;
   align-items: center;
   display: flex;
   gap: 0.625rem;
   margin-top: 1.25rem;
`
const ButtonCloseStyled = styled(Button)`
   border-radius: 0.5rem;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 6.5rem;
   height: 2.6rem;
`
const ButtonAddedStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 6.5rem;
   height: 2.6rem;
`
