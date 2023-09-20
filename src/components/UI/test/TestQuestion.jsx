import React, { useState } from 'react'
import { styled } from '@mui/material'
import { Input } from '../input/Input'
import { QuetionSection } from './Question'
import { Button } from '../button/Button'
import { IconButtons } from '../button/IconButtons'
import { LargePlusIcon } from '../../../assets/icons'

export const TestQuestion = () => {
   const [quizItemSections, setQuizItemSections] = useState([
      {
         id: 1,
         question: 'Вопрос',
         options: [{ id: 1, value: 'Вариант 1', isChecked: false }],
         isMultipleChoice: true,
      },
   ])

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
   }
   const deleteDupHandler = (idToDelete) => {
      setQuizItemSections((prevSections) =>
         prevSections.filter((section) => section.id !== idToDelete)
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
               <QuetionSection
                  key={section.id}
                  duplicateContainer={duplicateContainer}
                  section={section}
                  deleteDupHandler={deleteDupHandler}
                  answers={section.options}
                  id={section.id}
               />
            ))}
         </>
         <ContainerButtonsStyled>
            <div>
               <Button variant="outlined">Отмена</Button>
               <Button>Сохранить</Button>
            </div>
            <IconButtonsStyled variant="round">
               <LargePlusIcon />
            </IconButtonsStyled>
         </ContainerButtonsStyled>
      </>
   )
}
const ContainerButtonsStyled = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: end;
   div {
      margin-top: 24px;
      display: flex;
      gap: 10px;
   }
`
const IconButtonsStyled = styled(IconButtons)`
   margin-top: 150px;
   margin-bottom: 20px;
`

const TitleContainer = styled('div')(() => ({
   borderRadius: '10px',
   border: '1px solid #D4D4D4',
   background: ' #FFF',
   padding: '2rem',
   h2: {
      color: 'var(--blue, #1F6ED4)',
      fontSize: '18px',
      fontWeight: '600',
   },
   '&& :focus': {
      border: 'none',
   },
}))

const InputFirst = styled(Input)(() => ({
   width: '100%',
   '& .MuiInputBase-root': {
      width: '100%',
      height: '42px',
      padding: '0px',
      marginTop: '16px',
   },
}))
