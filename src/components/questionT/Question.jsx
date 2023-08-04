import { styled } from '@mui/material'
import React, { useState } from 'react'
import { CancelIcon, DeleteIcon, DuplicateIcon } from '../../assets/icons/index'
import { Input } from '../UI/input/Input'
import { Radio } from '../UI/checkbox-radio/Radio'
import { Button } from '../UI/button/Button'
import { CheckBox } from '../UI/checkbox-radio/CheckBox'

const QuestionSection = ({
   duplicateContainer,
   section,
   deleteDupHandler,
   id,
}) => {
   const [selectedRadioValue, setSelectedRadioValue] = useState('')
   const [check, setCheck] = useState(false)

   const [isChecked, setIsChecked] = useState(false)
   const [answers, setAnswers] = useState([
      { id: 1, value: 'Вариант 1', isChecked: false },
   ])
   const [radioCheck, setRadioCheck] = useState(true)
   const [checkboxAndRadio, setCheckboxAndRadio] = useState(true)
   const dublicateHandler = () => {
      duplicateContainer()
   }
   const checkboxFunc = () => {
      setCheckboxAndRadio(false)
   }

   const radioFunc = () => {
      setCheckboxAndRadio(true)
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

   const toogleRadioBox = () => {
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
               <QuizItemNumber>{id}</QuizItemNumber>
               <QuizItemQuestionInput placeholder="вопрос" />
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
                     value={answer.isChecked}
                     onChange={toogleRadioBox}
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
               <DeleteIcon onClick={deleteDupHandler} />
            </StyledOptions>
         </AdditionalOptions>
      </QuizItemSection>
   )
}

export default QuestionSection
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
   marginLeft: '473px',
   gap: '17px',
}))
const AdditionalOptions = styled('div')(() => ({
   fontSize: '18px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginTop: '20px',
   marginLeft: '75px',
   marginRight: '46px',
   marginBottom: '20px',
   div: {
      display: 'flex',
      aliginItems: 'center',
      p: {
         marginTop: '4px',
      },
   },
}))
const StyledCancelIcon = styled(CancelIcon)(() => ({
   marginLeft: '1045px',
   position: 'absolute',
   zIndex: '10',
}))
const QuizItemOptions = styled('div')(() => ({
   display: 'block ruby',
   justifyContent: 'center',
   aliginItems: 'center',
   gap: '24px',

   '&& label': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '9px',
      fontWeight: '400',
      marginRight: '15px',
   },
}))

const QuizItemContent = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'centre',
   gap: '19px',
   '.block': {
      display: 'flex',
      aliginItems: 'center',
      gap: '13px',
   },
}))
const QuizItemNumber = styled('span')(() => ({
   margin: '33px 13px 33px 26px',
   color: 'var(--blue, #1F6ED4)',
   fontSize: '20px',
   fontWeight: '600',
}))

const QuizItemSection = styled('div')(() => ({
   width: '1140px',
   height: 'auto',
   border: '1px solid #D4D4D4',
   background: '#FFF',
   borderRadius: '10px',
   marginTop: '1.25rem',
   marginLeft: '20%', //
   '&& :focus': {
      border: 'none',
   },
}))
const QuizItemQuestionInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '659px',
      height: '42px',
      borderRadius: ' 10px',
      marginTop: '26px',
      paddingTop: '10px',
      paddingBottom: '10px',
   },
}))
const QuizItemAnswers = styled('div')(({ checkboxAndRadio }) => ({
   marginLeft: '17px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
   marginBottom: '20px',

   label: {
      marginRight: checkboxAndRadio ? '1.5rem' : '0.3rem',
      marginLeft: checkboxAndRadio ? '10px' : '0px',
   },
}))

const StyledCheckBox = styled(CheckBox)(() => ({
   backgroundColor: 'red',
}))

const QuizItemAnswerInput = styled(Input)(() => ({
   width: '1039px',
   height: '42px',
}))
const DupBtn = styled('button')(() => ({
   background: 'none',
   padding: '0',
   margin: '0',
   fontSize: '15px',
   textDecoration: 'none',

   '&:hover': {
      backgroundColor: 'white',
   },
   border: 'none',
}))
