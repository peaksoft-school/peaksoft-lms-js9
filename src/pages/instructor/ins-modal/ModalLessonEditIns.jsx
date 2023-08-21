import React from 'react'
import { styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import { updateLesson } from '../../../store/lesson/lessonThunk'

console.log('useDispatch: ', useDispatch)

console.log('updateLesson: ', updateLesson)

export const ModalEditLesson = ({
   handleClose,
   openModal,
   editChangeModal,
   value,
   id,
   // clickEditHandler,
}) => {
   const dispatch = useDispatch()

   console.log('value lesson edite::>>', value)
   const { handleSubmit } = useForm()

   const onSubmitForm = (data) => {
      console.log('data: submit>> ', data)
      dispatch(
         updateLesson({
            lessonId: id,
            updatedData: { lessonName: data.lessonName },
         })
      )
   }

   return (
      <Modal
         title="Редактировать урок "
         open={openModal}
         handleClose={handleClose}
      >
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <ContainerInputTitleDateStyled>
               <InputTitleStyled
                  type="text"
                  value={value}
                  onChange={editChangeModal}
               />
            </ContainerInputTitleDateStyled>
            <ContainerButtonsStyled>
               <ButtonCloseStyled
                  variant="outlined"
                  onClick={() => handleClose()}
               >
                  Отмена
               </ButtonCloseStyled>
               <ButtonAddedStyled type="submit">
                  Редактировать
               </ButtonAddedStyled>
            </ContainerButtonsStyled>
         </form>
      </Modal>
   )
}
const InputTitleStyled = styled(Input)(() => ({
   width: '17.5vw',
}))

const ContainerInputTitleDateStyled = styled('div')`
   display: flex;
   width: 17vw;
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
   width: 'auto';
   height: 4.5vh;
`

const ButtonAddedStyled = styled(Button)`
   border-radius: 0.5rem;
   text-transform: capitalize;
   width: 'auto';
   height: 4.5vh;
`
