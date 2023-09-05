import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { Button } from '../../../components/UI/button/Button'
import { CustomSelect } from './SelectGroup'

export const ModalAddGroupToCourse = ({
   open,
   array,
   onSubmit,
   handleClose,
   selectedOption,
   handleSelectChange,
}) => {
   return (
      <Modal
         title="Добавить студентов группы в курс"
         open={open}
         handleClose={handleClose}
      >
         <MultiSelectStyled>
            <CustomSelect
               options={array}
               selectedOption={selectedOption}
               handleSelectChange={handleSelectChange}
            />
         </MultiSelectStyled>
         <ContainerButtonsStyled>
            <ButtonCloseStyled variant="outlined" onClick={handleClose}>
               Отмена
            </ButtonCloseStyled>
            <ButtonAddedStyled onClick={onSubmit}>Добавить</ButtonAddedStyled>
         </ContainerButtonsStyled>
      </Modal>
   )
}
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
const MultiSelectStyled = styled('div')`
   .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
      width: 25.7vw;
      padding: 15px;
   }
`
