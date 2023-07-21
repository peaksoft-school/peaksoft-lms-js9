import React from 'react'
import { Checkbox, Radio, styled } from '@mui/material'
import { resultTest } from '../../utils/constants/testResult'
import {
   ErrorIconCheckbox,
   ErrorIconRadio,
   SuccessIconRadio,
} from '../../assets/icons'

export const TestResult = ({ variant }) => {
   return (
      <Container>
         {resultTest.map((el) => (
            <SecondContainer>
               <div>
                  <ContainerTitle>
                     <p>{el.question}</p>
                     <p>{el.point} баллов из 1</p>
                  </ContainerTitle>
                  <div>
                     {el.result.map((item) => (
                        <ContainerQuestions key={item.answer}>
                           {variant === 'radio' ? (
                              <RadioStyled
                                 variant="radio"
                                 checked={item.status}
                                 color={item.status ? 'success' : 'error'}
                                 icon={<ErrorIconRadio />}
                                 checkedIcon={<SuccessIconRadio checked />}
                              />
                           ) : (
                              <Checkbox
                                 variant="checkbox"
                                 checked={item.status}
                                 color={item.status ? 'success' : 'error'}
                                 icon={<ErrorIconCheckbox />}
                              />
                           )}

                           <h3>{item.answer}</h3>
                        </ContainerQuestions>
                     ))}
                  </div>
               </div>
            </SecondContainer>
         ))}
      </Container>
   )
}
const RadioStyled = styled(Radio)`
   color: red;
   width: 40px;
`
const ContainerTitle = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-top: 1rem;
   p {
      color: var(--black, #292929);
      font-size: 1.2rem;
      font-weight: 600;
   }
`
const Container = styled('div')`
   width: 71.25rem;
   padding: 0 1.25rem 0rem 1.25rem;
   background-color: #fff;
   border-radius: 5px;
`
const ContainerQuestions = styled('div')`
   width: 4rem;
   height: 3.5rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
`
const SecondContainer = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 68.75rem;
   flex-shrink: 0;
   border-bottom: 2px solid #c4c4c4;
   &:last-child {
      border-bottom: none;
   }
`
