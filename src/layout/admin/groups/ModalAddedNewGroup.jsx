import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { UploadImage } from '../../../components/UI/modal/UploadImage'
import { Button } from '../../../components/UI/button/Button'
import { Input } from '../../../components/UI/input/Input'

export const ModalAddedNewGroup = ({ handleClose, openModal, onSubmit }) => {
   const onImageUpload = () => {}
   return (
      <Modal
         header
         title="Создание группы"
         open={openModal}
         handleClose={handleClose}
      >
         <form onSubmit={onSubmit}>
            <ContainerUploadImageStyled>
               <UploadImage onImageUpload={onImageUpload} />
               <StyledParagUploadImage>
                  Нажмите на иконку чтобы загрузить или перетащите фото
               </StyledParagUploadImage>
            </ContainerUploadImageStyled>
            <ContainerInputTitleDateStyled>
               <InputTitleStyled type="text" placeholder="Название курса" />
               <InputDateStyled type="date" />
            </ContainerInputTitleDateStyled>
            <InputDescriptionStyled
               type="text"
               placeholder="Описание курса"
               multiline
               rows={4}
            />
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
const StyledParagUploadImage = styled('p')`
   color: #8d949e;
   width: 241px;
   height: 36px;
   text-align: center;
   font-size: 14px;
   font-weight: 400;
   line-height: 130%;
`
const ContainerUploadImageStyled = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 6px;
`
const ContainerInputTitleDateStyled = styled('div')`
   display: flex;
   margin-top: 26px;
   gap: 12px;
   height: 42px;
`
const InputTitleStyled = styled(Input)`
   width: 327px;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      height: 42px;
      padding: 0px 18px;
   }
   .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #1f6ed4;
   }
`
const InputDescriptionStyled = styled(Input)`
   width: 100%;
   margin-top: 12px;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      height: 123px;
      padding: 0px 18px;
   }
   .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #1f6ed4;
   }
`
const InputDateStyled = styled(Input)`
   width: 149px;
   .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
      color: #8d949e;
      height: 42px;
      padding: 0px 18px;
   }
   .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #1f6ed4;
   }
`
const ContainerButtonsStyled = styled('div')`
   display: flex;
   justify-content: end;
   align-items: center;
   gap: 10px;
   margin-top: 20px;
`
const ButtonCloseStyled = styled(Button)`
   border-radius: 8px;
   border: 1px solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 103px;
   height: 40px;
`
const ButtonAddedStyled = styled(Button)`
   border-radius: 8px;
   text-transform: capitalize;
   width: 103px;
   height: 40px;
`
