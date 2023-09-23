import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from '../../../../../components/UI/input/Input'
import { Button } from '../../../../../components/UI/button/Button'
import { IconButtons } from '../../../../../components/UI/button/IconButtons'
import {
   CancelIcon,
   DeleteIcon,
   LargePlusIcon,
} from '../../../../../assets/icons'
import { Radio } from '../../../../../components/UI/checkbox-radio/Radio'
import { CheckBox } from '../../../../../components/UI/checkbox-radio/CheckBox'
import { postTestThunk } from '../../../../../store/test/testThunk'
import { showSnackbar } from '../../../../../components/UI/snackbar/Snackbar'

const questionsArray = [
   {
      id: 1,
      value: '',
      type: 'SINGLE',
      variants: [
         {
            id: 1,
            value: '',
            isStatus: false,
         },
      ],
   },
]

export const CreateTestPage = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [title, setTitle] = useState('')
   const [questions, setQuestions] = useState(questionsArray)

   const cancelHandler = () => {
      navigate(`/instructor/mycoursesins/${params.id}/materials`)
   }

   const handleRadioChange = (e, id) => {
      const updatedQuestions = questions.map((el) => {
         if (el.id === id) {
            return { ...el, type: e.target.value }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const changeHandler = (e, index) => {
      const newValue = e.target.value
      const updatedQuestions = [...questions]
      updatedQuestions[index].value = newValue
      setQuestions(updatedQuestions)
   }
   const variantChangeHandler = (e, questionId, variantId) => {
      const updatedQuestions = questions.map((el) => {
         if (el.id === questionId) {
            const updatedVariant = el.variants.map((item) => {
               if (item.id === variantId) {
                  return { ...item, value: e.target.value }
               }
               return item
            })
            return { ...el, variants: updatedVariant }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const addedQuestion = () => {
      const newQuestion = {
         id: Math.random(),
         value: '',
         type: 'SINGLE',
         variants: [
            {
               id: 2,
               value: '',
               isStatus: false,
            },
         ],
      }
      setQuestions([...questions, newQuestion])
   }

   const deleteHandler = (id) => {
      setQuestions(questions.filter((el) => el.id !== id))
   }
   const deleteOptionHandler = (variantId, questionId) => {
      const updateQuestion = questions.map((el) => {
         if (el.id === questionId) {
            const deleteVariant = el.variants.filter(
               (del) => del.id !== variantId
            )
            return { ...el, variants: deleteVariant }
         }
         return el
      })
      setQuestions(updateQuestion)
   }

   const addedOption = (id) => {
      const newVariant = {
         id: Math.random(),
         value: '',
         isStatus: false,
      }
      const updatedQuestions = questions.map((el) => {
         if (el.id === id) {
            return { ...el, variants: [...el.variants, newVariant] }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const saveTestHandler = () => {
      const data = {
         testName: title,
         questionRequests: questions.map((question) => ({
            questionId: question.id,
            question: question.value,
            questionType: question.type,
            optionRequests: question.variants.map((variant) => ({
               optionId: variant.id,
               option: variant.value,
               isStatus: variant.isStatus,
            })),
         })),
      }
      dispatch(
         postTestThunk({
            data,
            id: params.lessonid,
            showSnackbar,
            cancelHandler,
         })
      )
   }

   const toggleCheckbox = (variantId, questionId) => {
      const updatedVariants = questions?.map((el) => {
         if (el.id === questionId) {
            const updateChecked = el.variants?.map((item) => {
               if (item.id === variantId) {
                  return { ...item, isStatus: !item.isStatus }
               }
               return item
            })
            return { ...el, variants: updateChecked }
         }
         return el
      })
      setQuestions(updatedVariants)
   }

   const toggleRadioBox = (variantId, questionId) => {
      const updateQuestions = questions?.map((el) => {
         if (el.id === questionId) {
            const updateVariants = el.variants?.map((item) => {
               if (item.id === variantId) {
                  return {
                     ...item,
                     isStatus: true,
                  }
               }
               return {
                  ...item,
                  isStatus: false,
               }
            })
            return { ...el, variants: updateVariants }
         }
         return el
      })
      setQuestions(updateQuestions)
   }

   return (
      <div>
         <ContainerHeader>
            <h3>Название теста</h3>
            <Input
               value={title}
               placeholder="Введите название теста"
               onChange={(e) => setTitle(e.target.value)}
            />
         </ContainerHeader>
         {questions.map((question, qIndex) => (
            <ContainerMain key={question.id}>
               <ContainerTitle>
                  <h3>{qIndex + 1}</h3>
                  <Input
                     value={question.value}
                     placeholder="Вопрос"
                     onChange={(e) => changeHandler(e, qIndex)}
                  />
                  <main>
                     <Radio
                        label=" Один из списка"
                        value="SINGLE"
                        checked={question.type === 'SINGLE'}
                        onChange={(e) => handleRadioChange(e, question.id)}
                     />
                     <Radio
                        label=" Несколько из списка"
                        value="MULTIPLE"
                        checked={question.type === 'MULTIPLE'}
                        onChange={(e) => handleRadioChange(e, question.id)}
                     />
                  </main>
               </ContainerTitle>
               {question.variants?.map((variant, vIndex) => {
                  return (
                     <ContainerVariant key={variant.id}>
                        {question.type === 'SINGLE' ? (
                           <Radio
                              key={variant.id}
                              value={variant.id}
                              checked={variant.isStatus}
                              onChange={() =>
                                 toggleRadioBox(variant.id, question.id)
                              }
                           />
                        ) : (
                           <CheckBox
                              checked={variant.isStatus}
                              onClick={() =>
                                 toggleCheckbox(variant.id, question.id)
                              }
                              el={variant}
                           />
                        )}
                        <header>
                           <Input
                              value={variant.value}
                              placeholder={`Вариант ${vIndex + 1}`}
                              onChange={(e) =>
                                 variantChangeHandler(
                                    e,
                                    question.id,
                                    variant.id
                                 )
                              }
                           />
                        </header>
                        <IconButtons
                           onClick={() =>
                              deleteOptionHandler(variant.id, question.id)
                           }
                        >
                           <CancelIcon />
                        </IconButtons>
                     </ContainerVariant>
                  )
               })}
               <ContainerAddOptionDelete>
                  <div>
                     <button
                        type="button"
                        onClick={() => addedOption(question.id)}
                     >
                        Добавить вариант
                     </button>
                  </div>
                  <IconButtons onClick={() => deleteHandler(question.id)}>
                     <DeleteIcon />
                  </IconButtons>
               </ContainerAddOptionDelete>
            </ContainerMain>
         ))}
         <ContainerFooter>
            <div>
               <Button onClick={cancelHandler} variant="outlined">
                  Отмена
               </Button>
               <Button onClick={saveTestHandler}>Сохранить</Button>
            </div>
            <IconButtons onClick={addedQuestion} variant="round">
               <LargePlusIcon />
            </IconButtons>
         </ContainerFooter>
      </div>
   )
}

const ContainerHeader = styled('header')`
   background-color: #fff;
   padding: 20px;
   border-radius: 10px;
   border: 1px solid #d4d4d4;
   display: flex;
   flex-direction: column;
   gap: 20px;
   div {
      width: 100%;
   }
   h3 {
      color: #1f6ed4;
   }
`
const ContainerTitle = styled('div')`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 20px;
   h3 {
      color: #1f6ed4;
   }
   div {
      width: 100%;
   }
   main {
      display: flex;
      gap: 24px;
      width: 600px;
   }
`
const ContainerMain = styled('main')`
   background-color: #fff;
   padding: 20px;
   border-radius: 10px;
   margin: 20px 0;
`
const ContainerFooter = styled('footer')`
   div {
      display: flex;
      justify-content: end;
      align-items: center;
      margin-bottom: 150px;
      margin-top: 15px;
      gap: 20px;
   }
`
const ContainerVariant = styled('div')`
   position: relative;
   display: flex;
   align-items: center;
   margin-top: 20px;
   input {
      margin-right: 1.13rem;
   }
   header {
      width: 100%;
      div {
         width: 100%;
      }
   }
   .css-mzmt93-MuiFormControlLabel-root {
      margin-right: 0%;
      height: 1rem;
   }
   button {
      position: absolute;
      right: 0.5rem;
      top: 0px;
   }
`
const ContainerAddOptionDelete = styled('div')`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 20px;
   div {
      display: flex;
      align-items: center;
      gap: 1rem;
   }
   button {
      background-color: #fff;
      border: none;
      font-size: 18px;
      color: #258aff;
   }
`
