import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../../components/UI/modal/Modal'
import { Input } from '../../../../components/UI/input/Input'
import MultiSelect from '../../../../components/UI/select/Select'
import { Button } from '../../../../components/UI/button/Button'
import { CancelIcon } from '../../../../assets/icons'

export const ModalSelect = ({
   openModal,
   handleClose,
   array,
   onClick,
   coursesIns,
}) => {
   const [selectedValues, setSelectedValues] = useState([])
   const [value, setValue] = useState(coursesIns)

   const handleMultiSelectChange = (event) => {
      setSelectedValues(event.target.value)
   }
   return (
      <Modal
         title="Назначить учителя"
         open={openModal}
         handleClose={handleClose}
      >
         <Container>
            <InputContainer>
               <InputStyled
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
               />
               <IconContainer>
                  <CancelIcon onClick={() => setValue('')} />
               </IconContainer>
            </InputContainer>
            <MultiSelectStyled
               array={array}
               value={selectedValues}
               onChange={handleMultiSelectChange}
            />
         </Container>
         <ContainerButton>
            <ButtonCloseStyled variant="outlined" onClick={handleClose}>
               Отмена
            </ButtonCloseStyled>
            <ButtonAddedStyled onClick={onClick}>Добавить</ButtonAddedStyled>
         </ContainerButton>
      </Modal>
   )
}
const Container = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`
const InputStyled = styled(Input)`
   margin-top: 0.2rem;
   width: 25.7vw;
   height: 42px;
`
const MultiSelectStyled = styled(MultiSelect)`
   margin-top: 0.1rem;
   width: 25.7vw;
   height: 42px;
   border-radius: 10px;
`
const ContainerButton = styled('div')`
   display: flex;
   justify-content: end;
   gap: 0.6rem;
   margin-top: 0.2rem;
   margin-right: 0.5rem;
`
const ButtonCloseStyled = styled(Button)`
   border-radius: 0.6rem;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
   width: 5.4vw;
   height: 4.5vh;
`

const ButtonAddedStyled = styled(Button)`
   border-radius: 0.6rem;
   text-transform: capitalize;
   width: 5.4vw;
   height: 4.5vh;
`

const InputContainer = styled('div')`
   position: relative;
`
const IconContainer = styled('div')`
   position: absolute;
   top: 58%;
   right: 10px;
   transform: translateY(-50%);
`
