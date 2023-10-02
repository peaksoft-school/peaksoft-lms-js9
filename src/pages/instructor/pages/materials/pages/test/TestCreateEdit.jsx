import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '../../../../../../components/UI/input/Input'
import {
   getTestResultPass,
   postTestThunk,
   updateTestThunk,
} from '../../../../../../store/test/testThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { Radio } from '../../../../../../components/UI/checkbox-radio/Radio'
import { CheckBox } from '../../../../../../components/UI/checkbox-radio/CheckBox'
import { IconButtons } from '../../../../../../components/UI/button/IconButtons'
import {
   CancelIcon,
   DeleteIcon,
   LargePlusIcon,
} from '../../../../../../assets/icons'
import { Button } from '../../../../../../components/UI/button/Button'

const questionResponses = [
   {
      id: 1,
      question: '',
      questionType: 'SINGLE',
      optionResponses: [
         {
            optionId: 1,
            option: '',
            true: false,
         },
      ],
   },
]

export const TestEdit = ({ variant }) => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { passTest: data } = useSelector((state) => state.test)
   const [title, setTitle] = useState('')
   const [questions, setQuestions] = useState([])

   useEffect(() => {
      if (variant) {
         dispatch(getTestResultPass(params.testid))
      }
   }, [])

   useEffect(() => {
      setTitle(variant ? data.testName : '')
      setQuestions(variant ? data.questionResponses : questionResponses)
   }, [data])

   const cancelHandler = () => {
      navigate(
         `/instructor/mycoursesins/${params.id}/materials${
            variant ? `/5/${params.lessonid}` : ''
         }`
      )
   }

   const handleRadioChange = (e, id) => {
      const updatedQuestions = questions?.map((el) => {
         if (el.id === id) {
            return { ...el, questionType: e.target.value }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const changeQuestionHnadler = (e, questionId) => {
      const updateQuestions = questions?.map((el) => {
         if (el.id === questionId) {
            return { ...el, question: e.target.value }
         }
         return el
      })
      setQuestions(updateQuestions)
   }

   const variantChangeHandler = (e, questionId, variantId) => {
      const updatedQuestions = questions?.map((el) => {
         if (el.id === questionId) {
            const updatedVariant = el.optionResponses.map((item) => {
               if (item.optionId === variantId) {
                  return { ...item, option: e.target.value }
               }
               return item
            })
            return { ...el, optionResponses: updatedVariant }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const addedQuestion = () => {
      const newQuestion = {
         id: Math.random(),
         question: '',
         questionType: 'SINGLE',
         optionResponses: [
            {
               optionId: 2,
               option: '',
               true: false,
            },
         ],
      }
      setQuestions([...questions, newQuestion])
   }

   const deleteHandler = (id) => {
      setQuestions(questions.filter((el) => el.id !== id))
   }

   const deleteOptionHandler = (variantId, questionId) => {
      const updateQuestion = questions?.map((el) => {
         if (el.id === questionId) {
            const deleteVariant = el.optionResponses.filter(
               (del) => del.optionId !== variantId
            )
            return { ...el, optionResponses: deleteVariant }
         }
         return el
      })
      setQuestions(updateQuestion)
   }

   const addedOption = (id) => {
      const newVariant = {
         optionId: Math.random(),
         option: '',
         true: false,
      }
      const updatedQuestions = questions?.map((el) => {
         if (el.id === id) {
            return {
               ...el,
               optionResponses: [...el.optionResponses, newVariant],
            }
         }
         return el
      })
      setQuestions(updatedQuestions)
   }

   const saveTestHandler = () => {
      const data = {
         testName: title,
         questionRequests: questions?.map((question) => ({
            questionId: question.id,
            question: question.question,
            questionType: question.questionType,
            optionRequests: question.optionResponses?.map((variant) => ({
               optionId: variant.optionId,
               option: variant.option,
               isStatus: variant.true,
            })),
         })),
      }
      dispatch(
         variant
            ? updateTestThunk({
                 data,
                 showSnackbar,
                 testid: params.testid,
                 cancelHandler,
              })
            : postTestThunk({
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
            const updateChecked = el.optionResponses?.map((item) => {
               if (item.optionId === variantId) {
                  return { ...item, true: !item.true }
               }
               return item
            })
            return { ...el, optionResponses: updateChecked }
         }
         return el
      })
      setQuestions(updatedVariants)
   }

   const toggleRadioBox = (variantId, questionId) => {
      const updateQuestions = questions?.map((el) => {
         if (el.id === questionId) {
            const updateVariants = el.optionResponses?.map((item) => {
               if (item.optionId === variantId) {
                  return {
                     ...item,
                     true: true,
                  }
               }
               return {
                  ...item,
                  true: false,
               }
            })
            return { ...el, optionResponses: updateVariants }
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
         {questions?.map((question, qIndex) => (
            <ContainerMain key={question.id}>
               <ContainerTitle>
                  <h3>{qIndex + 1}</h3>
                  <Input
                     value={question.question}
                     placeholder="Вопрос"
                     onChange={(e) => changeQuestionHnadler(e, question.id)}
                  />
                  <main>
                     <Radio
                        label=" Один из списка"
                        value="SINGLE"
                        checked={question.questionType === 'SINGLE'}
                        onChange={(e) => handleRadioChange(e, question.id)}
                     />
                     <Radio
                        label=" Несколько из списка"
                        value="MULTIPLE"
                        checked={question.questionType === 'MULTIPLE'}
                        onChange={(e) => handleRadioChange(e, question.id)}
                     />
                  </main>
               </ContainerTitle>
               {question.optionResponses?.map((variant, vIndex) => {
                  return (
                     <ContainerVariant key={variant.optionId}>
                        {question.questionType === 'SINGLE' ? (
                           <Radio
                              key={variant.optionId}
                              value={variant.optionId}
                              checked={variant.true}
                              onChange={() =>
                                 toggleRadioBox(variant.optionId, question.id)
                              }
                           />
                        ) : (
                           <CheckBox
                              value={variant.true}
                              checked={variant.true}
                              onClick={() =>
                                 toggleCheckbox(variant.optionId, question.id)
                              }
                              el={variant}
                           />
                        )}
                        <header>
                           <Input
                              value={variant.option}
                              placeholder={`Вариант ${vIndex + 1}`}
                              onChange={(e) =>
                                 variantChangeHandler(
                                    e,
                                    question.id,
                                    variant.optionId
                                 )
                              }
                           />
                        </header>
                        <IconButtons
                           onClick={() =>
                              deleteOptionHandler(variant.optionId, question.id)
                           }
                        >
                           <CancelIcon />
                        </IconButtons>
                     </ContainerVariant>
                  )
               })}
               <ContainerAddOptionDelete>
                  <div>
                     {!variant ? (
                        <button
                           type="button"
                           onClick={() => addedOption(question.id)}
                        >
                           Добавить вариант
                        </button>
                     ) : (
                        ''
                     )}
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
            {!variant ? (
               <main>
                  <IconButtons onClick={addedQuestion} variant="round">
                     <LargePlusIcon />
                  </IconButtons>
               </main>
            ) : (
               ''
            )}
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
      margin: 15px 0;
      gap: 20px;
   }
   main {
      margin: 150px 0;
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
