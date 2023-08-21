import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../../components/UI/modal/Modal'
import { UploadImage } from '../../../../components/UI/modal/UploadImage'
import { Button } from '../../../../components/UI/button/Button'
import { Input } from '../../../../components/UI/input/Input'
import BasicDatePicker from '../../../../components/UI/datapicker/DataPicker'

export const ModalCourses = ({
   handleClose,
   openModal,
   onSubmit,
   onDateChange,
   onImageUpload,
   variant,
   errors,
   setValue,
   handleSubmit,
   register,
   imageEditValue,
   dateEditModal,
   isFormEmpty,
}) => {
   const onSubmitForm = (data) => {
      onSubmit(data)
   }

   return (
      <Modal
         title={variant ? 'Редактировать курс' : 'Создать курс'}
         open={openModal}
         handleClose={handleClose}
      >
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <ContainerUploadImageStyled>
               <UploadImage
                  imageEditValue={imageEditValue || imageEditValue}
                  onImageUpload={onImageUpload}
               />
               <StyledParagUploadImage>
                  Нажмите на иконку чтобы загрузить или перетащите фото
               </StyledParagUploadImage>
            </ContainerUploadImageStyled>
            <ContainerInputTitleDateStyled>
               <InputTitleStyled
                  {...register(variant ? 'editTitle' : 'groupName')}
                  type="text"
                  placeholder={
                     variant ? 'Редактировать название' : 'Название курса'
                  }
                  error={!!errors[variant ? 'editTitle' : 'groupName']}
               />
               <BasicDatePicker
                  onDateChange={(date) => {
                     setValue('dateEditModal', date)
                     onDateChange(date)
                  }}
                  value={dateEditModal}
               />
            </ContainerInputTitleDateStyled>
            <InputDescriptionStyled
               {...register(variant ? 'editDescription' : 'description')}
               type="text"
               placeholder={
                  variant ? 'Редактировать описание' : 'Описание курса'
               }
               multiline
               rows={4}
               error={!!errors[variant ? 'editDescription' : 'description']}
            />
            <ContainerButtonsStyled>
               <ButtonCloseStyled variant="outlined" onClick={handleClose}>
                  Отмена
               </ButtonCloseStyled>
               <ButtonAddedStyled type="submit" disabled={isFormEmpty}>
                  {variant ? 'Сохранить' : 'Добавить'}
               </ButtonAddedStyled>
            </ContainerButtonsStyled>
         </form>
      </Modal>
   )
}

const StyledParagUploadImage = styled('p')`
   color: #8d949e;
   width: 16em;
   height: 1.5em;
   text-align: center;
   font-size: 0.875rem;
   font-weight: 400;
   line-height: 130%;
`

const ContainerUploadImageStyled = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 0.375rem;
`

const ContainerInputTitleDateStyled = styled('div')`
   display: flex;
   margin-top: 1.625rem;
   gap: 0.75rem;
`

const InputTitleStyled = styled(Input)`
   width: 17vw;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      height: 4.5vh;
      padding: 0px 1.125rem;
   }
   .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 0.0625rem solid ${({ error }) => (error ? '#f44336' : '#1f6ed4')};
   }
`

const InputDescriptionStyled = styled(Input)`
   width: 100%;
   margin-top: 0.75rem;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      height: 10vh;
      padding: 0px 1.125rem;
   }
   .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 0.0625rem solid ${({ error }) => (error ? '#f44336' : '#1f6ed4')};
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
