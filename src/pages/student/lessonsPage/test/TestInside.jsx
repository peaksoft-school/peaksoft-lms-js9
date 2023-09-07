/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
   getTestLesson,
   getTestResultLesson,
   postTestLesson,
} from '../../../../store/studentLayout/studentLayoutThunk'
import { Button } from '../../../../components/UI/button/Button'
import { TestSend } from '../../../../components/UI/test/TestOption'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const TestInside = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { tests, testResult, isLoading } = useSelector(
      (state) => state.studentLayout
   )
   const [selectedOptions, setSelectedOptions] = useState({})
   const [selectedRadio, setSelectedRadio] = useState({})

   useEffect(() => {
      dispatch(getTestLesson(+params.testid))
      dispatch(getTestResultLesson(+params.testid))
   }, [])

   const handleOptionChange = (e, questionId, optionId) => {
      setSelectedOptions((prevSelectedOptions) => ({
         ...prevSelectedOptions,
         [questionId]: {
            ...(prevSelectedOptions[questionId] || {}),
            [optionId]: e.target.checked,
         },
      }))
   }

   const handleRadioChange = (e, questionId, optionId) => {
      setSelectedRadio((prevSelectedRadio) => ({
         ...prevSelectedRadio,
         [questionId]: optionId,
      }))
   }
   const sendTestHandler = () => {
      const combinedData = tests.questionResponses.map((question) => {
         const questionId = question.id
         const checkboxOptions = selectedOptions[questionId] || {}
         const radioOption = selectedRadio[questionId]
         const combinedOptions = []
         if (radioOption !== undefined && radioOption !== null) {
            combinedOptions.push(radioOption)
         }
         const selectedCheckboxOptions = Object.entries(checkboxOptions)
            .filter(([_, isSelected]) => isSelected)
            .map(([optionId, _]) => parseInt(optionId))
         combinedOptions.push(...selectedCheckboxOptions)
         return {
            questionId,
            optionId: combinedOptions,
         }
      })
      dispatch(
         postTestLesson({
            data: combinedData,
            id: +params.testid,
            showSnackbar,
         })
      )
   }

   return (
      <Container>
         {isLoading && <Isloading />}
         <header>
            {!tests.passed ? (
               <h1>{tests.testName}</h1>
            ) : (
               <h1>
                  Набрано баллов {testResult.totalPoint} из{' '}
                  {testResult?.questionResponses?.length * 10}
               </h1>
            )}
         </header>
         <ContainerMap>
            <div>
               {(tests.passed ? testResult : tests).questionResponses?.map(
                  (el, i) => (
                     <main key={el.id}>
                        <TestSend
                           el={el}
                           i={i}
                           passed={tests.passed}
                           handleRadioChange={handleRadioChange}
                           handleOptionChange={handleOptionChange}
                           selectedRadio={selectedRadio}
                           selectedOptions={selectedOptions}
                        />
                     </main>
                  )
               )}
            </div>
         </ContainerMap>
         {!tests.passed && (
            <ContainerButton>
               <Button onClick={sendTestHandler}>Отправить</Button>
            </ContainerButton>
         )}
      </Container>
   )
}

const Container = styled('div')`
   header {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
   }
`
const ContainerMap = styled('div')`
   background-color: #fff;
   padding: 0 20px;
   border-radius: 5px;
   margin: 1rem 0;
   padding-bottom: 0.5rem;
   main {
      border-bottom: 1px solid #c4c4c4;
      &:last-child {
         border-bottom: none;
      }
   }
`
const ContainerButton = styled('div')`
   display: flex;
   justify-content: end;
   margin: 1.5rem 0;
`
