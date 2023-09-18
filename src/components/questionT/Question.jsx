import { styled } from '@mui/material'
import React, { useState } from 'react'
import { CancelIcon, DeleteIcon, DuplicateIcon } from '../../assets/icons/index'
import { Input } from '../UI/input/Input'
import { Radio } from '../UI/checkbox-radio/Radio'
import { Button } from '../UI/button/Button'
import { CheckBox } from '../UI/checkbox-radio/CheckBox'

const selectedIdFromLocalStorage = localStorage.getItem('selectedId')
const selectedId = selectedIdFromLocalStorage
   ? JSON.parse(selectedIdFromLocalStorage)
   : ''
export const QuetionSection = ({
   duplicateContainer,
   section,
   deleteDupHandler,
}) => {
   const [selectedRadioValue, setSelectedRadioValue] = useState('')
   const [check, setCheck] = useState(false)
   const [isChecked, setIsChecked] = useState(false)
   const [answers, setAnswers] = useState([
      { id: 1, value: 'Вариант 1', isChecked: false, check: 'teo' },
   ])
   const [radioCheck, setRadioCheck] = useState(true)
   const [checkboxAndRadio, setCheckboxAndRadio] = useState(true)

   const dublicateHandler = () => {
      duplicateContainer()
   }
   const handleDeleteSection = () => {
      deleteDupHandler(section.id)
   }

   const checkboxFunc = () => {
      setCheckboxAndRadio(false)
   }

   const radioFunc = () => {
      const updatedAnswers = answers.map((answer) =>
         answer.id === selectedId
            ? { ...answer, isChecked: true }
            : { ...answer, isChecked: false }
      )
      setAnswers(updatedAnswers)
      setCheckboxAndRadio(true)
      setSelectedRadioValue('one')
   }

   const inputChangeHandler = (e, id) => {
      const updatedAnswers = answers.map((answer) =>
         answer.id === id ? { ...answer, value: e.target.value } : answer
      )
      setAnswers(updatedAnswers)
      console.log('nurislam')
   }

   const addDruAnswer = () => {
      const newOtherId = answers.length + 1
      const newOtherAnswer = {
         id: newOtherId,
         value: `вариант “Другое” `,
         isChecked: false,
      }

      setAnswers([...answers, newOtherAnswer])
      setRadioCheck(false)
   }

   const toggleCheckbox = (param) => {
      setIsChecked(param.event)
      const updatedAnswers = answers.map((answer) =>
         answer.id === param.id
            ? { ...answer, isChecked: !answer.isChecked }
            : answer
      )
      setAnswers(updatedAnswers)

      const checkedCount = updatedAnswers.filter(
         (answer) => answer.isChecked
      ).length
      if (checkedCount > 0) {
         setSelectedRadioValue(checkedCount >= 2 ? 'multiple' : 'one')
      } else {
         setSelectedRadioValue('')
      }
   }

   const toggleRadioBox = (selectedId) => {
      localStorage.setItem('selectedId', JSON.stringify(selectedId))
      const updatedAnswers = answers.map((answer) =>
         answer.id === selectedId
            ? { ...answer, isChecked: true }
            : { ...answer, isChecked: false }
      )
      setAnswers(updatedAnswers)
      setSelectedRadioValue('one')
   }

   const cancelClickHandler = (id) => {
      const isRadioSelected =
         selectedRadioValue !== '' &&
         answers.find((answer) => answer.id === id)?.isChecked

      if (isRadioSelected) {
         setSelectedRadioValue('')
      }

      const updatedAnswers = answers.filter((answer) => answer.id !== id)
      setAnswers(updatedAnswers)
   }
   console.log('check: ', check)

   const addNewAnswer = () => {
      const newId = answers.length + 1
      const newAnswer = {
         id: newId,
         value: `Вариант ${newId}`,
         isChecked: false,
      }

      setAnswers([...answers, newAnswer])
      setCheck(true)
   }

   return (
      <QuizItemSection key={section.id}>
         <QuizItemContent>
            <div className="block">
               <QuizItemNumber>{section.id}</QuizItemNumber>
               <QuizItemQuestionInput placeholder="Вопрос" />
            </div>
            <QuizItemOptions>
               <DupBtn type="submit" onClick={radioFunc}>
                  <Radio
                     label="Один из списка"
                     value="one"
                     checked={selectedRadioValue === 'one'}
                  />
               </DupBtn>

               <DupBtn type="submit" onClick={checkboxFunc}>
                  <Radio
                     label="Несколько из списка"
                     value="multiple"
                     checked={selectedRadioValue === 'multiple'}
                  />
               </DupBtn>
            </QuizItemOptions>
            <h1>{isChecked}</h1>
         </QuizItemContent>

         {answers.map((answer) => (
            <QuizItemAnswers
               key={answer.id}
               checkboxAndRadio={checkboxAndRadio}
            >
               {checkboxAndRadio ? (
                  <Radio
                     key={answer.id}
                     value={answer.id}
                     checked={answer.isChecked}
                     onChange={() => toggleRadioBox(answer.id)}
                  />
               ) : (
                  <StyledCheckBox
                     value={answer.isChecked}
                     el={answer}
                     onClick={toggleCheckbox}
                  />
               )}

               <QuizItemAnswerInput
                  onChange={(e) => inputChangeHandler(e, answer.id)}
                  placeholder={answer.value}
               />
               <StyledCancelIcon
                  onClick={() => cancelClickHandler(answer.id)}
               />
            </QuizItemAnswers>
         ))}
         <AdditionalOptions>
            <div>
               <AddOptionButton onClick={addNewAnswer}>
                  Добавить вариант⠀
               </AddOptionButton>
               {radioCheck && (
                  <div>
                     <p>или⠀</p>
                     <AddOtherOptionButton onClick={addDruAnswer}>
                        добавить вариант “Другое”
                     </AddOtherOptionButton>
                  </div>
               )}
            </div>

            <StyledOptions>
               <DuplicateIcon onClick={dublicateHandler} />
               <DeleteIcon onClick={handleDeleteSection} />
            </StyledOptions>
         </AdditionalOptions>
      </QuizItemSection>
   )
}

const AddOtherOptionButton = styled(Button)(() => ({
   color: 'var(--blue, #258AFF)',
   background: 'none',
   padding: '0',
   margin: '0',
   fontSize: '18px',
   textDecoration: 'none',

   '&:hover': {
      backgroundColor: 'white',
   },
}))
const AddOptionButton = styled(Button)(() => ({
   color: 'var(--blue, #258AFF)',
   background: 'none',
   padding: '0',
   margin: '0',
   fontSize: '18px',
   textDecoration: 'none',

   '&:hover': {
      backgroundColor: 'white',
   },
}))
const StyledOptions = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   gap: '0.5vw',
   cursor: 'pointer',
}))
const AdditionalOptions = styled('div')(() => ({
   fontSize: '16px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   margin: '20px 28px 20px 75px',
   div: {
      display: 'flex',
      aliginItems: 'center',
      p: {
         marginTop: '4px',
      },
   },
}))
const StyledCancelIcon = styled(CancelIcon)(() => ({
   position: 'absolute',
   right: '5rem',
   cursor: 'pointer',
}))
const QuizItemOptions = styled('div')(() => ({
   display: 'ruby',
   cursor: 'pointer',

   '&& label': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.64vw',
      fontWeight: '400',
      marginRight: '0.88vw',
      cursor: 'pointer',
   },
}))

const QuizItemContent = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '0.9vw',
   width: '100%',
   '.block': {
      Input: {
         width: '100%',
      },
      display: 'flex',
      aliginItems: 'center',
      gap: '0.69vw',
   },
}))
const QuizItemNumber = styled('span')(() => ({
   margin: '33px 13px 33px 26px',
   color: 'var(--blue, #1F6ED4)',
   fontSize: '20px',
   fontWeight: '600',
}))

const QuizItemSection = styled('div')(() => ({
   height: 'auto',
   border: '1px solid #D4D4D4',
   background: '#FFF',
   borderRadius: '0.625rem',
   marginTop: '1.25rem',
   '&& :focus': {
      border: 'none',
   },
}))
const QuizItemQuestionInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '45vw',
      height: '42px',
      marginTop: '1.5rem',
      paddingTop: '0.7vw',
      paddingBottom: '10px',
      marginLeft: '3px',
   },
}))
const QuizItemAnswers = styled('div')(({ checkboxAndRadio }) => ({
   marginLeft: '1vw',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   marginBottom: '1.5vw',
   width: '100%',
   paddingRight: '50px',
   '& .css-dmmspl-MuiFormGroup-root': {
      marginRight: '23px',
      width: '1.5rem',
   },
   div: {
      width: '100%',
   },
   label: {
      marginRight: checkboxAndRadio ? '1.5rem' : '0.3rem',
      marginLeft: checkboxAndRadio ? '10px' : '0vw',
   },
}))

const StyledCheckBox = styled(CheckBox)(() => ({}))

const QuizItemAnswerInput = styled(Input)(() => ({
   width: '100%',
   height: '42px',
}))
const DupBtn = styled('button')(() => ({
   cursor: 'pointer',

   background: 'none',
   padding: '0',
   margin: '0',
   fontSize: '0.9vw',
   textDecoration: 'none',

   '&:hover': {
      backgroundColor: 'white',
   },
   border: 'none',
}))
