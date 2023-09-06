import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Modal } from '../../../../components/UI/modal/Modal'
import { Input } from '../../../../components/UI/input/Input'
import MultiSelect from '../../../../components/UI/select/Select'
import { Button } from '../../../../components/UI/button/Button'
import { CancelIcon } from '../../../../assets/icons'
import { IconButtons } from '../../../../components/UI/button/IconButtons'
import { ModalDelete } from './ModalDelete'
import { useToggle } from '../../../../utils/hooks/general'
import { deleteAllTeacherCourse } from '../../../../store/instructor/instructorThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'

export const ModalSelect = ({
   openModal,
   handleClose,
   array,
   onClick,
   handleMultiSelectChange,
   selectedItems,
   coursesIns,
   courseId,
}) => {
   const [value, setValue] = useState([])
   const dispatch = useDispatch()
   const { isActive, setActive } = useToggle('modaldeleteallteachersbycourse')

   useEffect(() => {
      const allFullNames = coursesIns.map((course) => course.fullName)
      setValue(allFullNames)
   }, [coursesIns])

   const openModalDelete = () => {
      setActive(!isActive)
      handleClose()
   }
   const deleteHandler = () => {
      dispatch(deleteAllTeacherCourse({ showSnackbar, id: courseId.id }))
      setActive('')
   }
   return (
      <div>
         <Modal
            title="Назначить учителя"
            open={openModal}
            handleClose={handleClose}
         >
            <Container>
               <InputContainer>
                  <InputStyled
                     placeholder="В этом курсе нет учителей."
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                  />
                  <IconContainer>
                     <IconButtons onClick={openModalDelete}>
                        <CancelIcon />
                     </IconButtons>
                  </IconContainer>
               </InputContainer>
               <MultiSelectStyled
                  array={array}
                  value={selectedItems}
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
         <div>
            <ModalDelete
               open={isActive}
               handleClose={() => setActive('')}
               deleteCardHandler={deleteHandler}
               paragraph={`учителей ${value}`}
            />
         </div>
      </div>
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
   margin-right: 0.5rem;
   margin-top: 0.2rem;
`
const ButtonCloseStyled = styled(Button)`
   border-radius: 0.6rem;
   width: 5.4vw;
   border: 0.0625rem solid var(--button, #3772ff);
   text-transform: capitalize;
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
   /* width: 32rem; */
   /* overflow: hidden; */
   display: flex;
   align-items: center;
`
const IconContainer = styled('div')`
   position: absolute;
   right: 5px;
   background-color: #fff;
   border-radius: 99%;
   height: 2.3rem;
   width: 2.3rem;
`
