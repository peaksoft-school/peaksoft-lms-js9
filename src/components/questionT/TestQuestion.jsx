import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Input } from '../UI/input/Input'
import QuestionSection from './Question'

export const TestQuestion = () => {
   const [quizItemSections, setQuizItemSections] = useState([
      {
         id: 1,
         question: 'Вопрос',
         options: [{ id: 1, value: 'Вариант 1', isChecked: false }],
         isMultipleChoice: true,
      },
   ])
   const [count, setCount] = useState(1)
   console.log('count: ', count)

   const duplicateContainer = () => {
      setQuizItemSections((prevSections) => {
         const lastSection = prevSections[prevSections.length - 1]
         const newId = lastSection.id + 1

         const newSection = {
            id: newId,
            question: lastSection.question,
            options: lastSection.options.map((option) => ({
               ...option,
               id: option.id + 1,
            })),
            isMultipleChoice: lastSection.isMultipleChoice,
         }

         return [...prevSections, newSection]
      })

      setCount((prevCount) => prevCount + 1)
   }
   const deleteDupHandler = () => {
      setQuizItemSections((prevSections) =>
         prevSections.slice(0, prevSections.length - 1)
      )
   }
   return (
      <>
         <TitleContainer>
            <h2>Название текста</h2>
            <InputFirst placeholder="Введите название теста" />
         </TitleContainer>
         <>
            {quizItemSections.map((section) => (
               <QuestionSection
                  key={section.id}
                  duplicateContainer={duplicateContainer}
                  section={section}
                  deleteDupHandler={deleteDupHandler}
                  answers={section.options}
                  id={section.id}
               />
            ))}
         </>
      </>
   )
}

const TitleContainer = styled('div')(() => ({
   marginTop: '60px',
   width: '1140px',
   height: '124px',
   borderRadius: '10px',
   border: '1px solid #D4D4D4',
   background: ' #FFF',
   marginLeft: '20%',
   h2: {
      color: 'var(--blue, #1F6ED4)',
      fontSize: '18px',
      fontWeight: '600',
      marginTop: '20px',
      marginLeft: '26px',
   },
   '&& :focus': {
      border: 'none',
   },
}))

const InputFirst = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '1080px',
      height: '42px',
      padding: '0px',
      marginLeft: '26px',
      marginTop: '16px',
   },
}))
