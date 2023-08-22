import React from 'react'
import { styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'

export const ModalLessonPost = ({
   handleClose,
   openModal,
   value,
   postLessonS,
   onChangeHPostandler,
}) => {
   console.log('value: >>>', value)
   const { handleSubmit } = useForm()
   const onSubmitForm = () => {
      postLessonS()
      handleClose()
   }
   return (
      <Modal title="Добавить урок" open={openModal} handleClose={handleClose}>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <InputTitleStyled value={value} onChange={onChangeHPostandler} />
            <ContainerButtonsStyled>
               <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                  Отмена
               </ButtonCloseStyled>
               <ButtonAddedStyled type="submit">Добавить</ButtonAddedStyled>
            </ContainerButtonsStyled>
         </form>
      </Modal>
   )
}

const InputTitleStyled = styled(Input)`
   width: 17vw;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      height: 4.5vh;
      padding: 0px 1.125rem;
   }
`

const ContainerButtonsStyled = styled('div')`
   display: flex;
   justify-content: flex-end;
   align-items: center;
   gap: 0.625rem;
   margin-top: 1.25rem;
`

const ButtonCloseStyled = styled(Button)`
   border-radius: 0.5rem;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 5.4vw;
   height: 4.5vh;
`

const ButtonAddedStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 5.4vw;
   height: 4.5vh;
`
