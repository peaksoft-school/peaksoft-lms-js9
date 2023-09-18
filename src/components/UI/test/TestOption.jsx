import React from 'react'
import { Checkbox, Radio, styled } from '@mui/material'
import {
   ErrorIconCheckbox,
   ErrorIconRadio,
   SuccessIconCheckbox,
   SuccessIconRadio,
} from '../../../assets/icons'

export const TestSend = ({
   i,
   el,
   passed,
   handleOptionChange,
   selectedOptions,
   selectedRadio,
   handleRadioChange,
}) => {
   return (
      <Container>
         <ContainerTitle>
            <div>
               <p>№ {i + 1}</p>
               <p>{el.question}</p>
            </div>
            {passed && <p>{el.point} баллов из 10</p>}
         </ContainerTitle>
         <div>
            {el.optionResponses.map((item) => (
               <ContainerQuestions>
                  {el.questionType === 'SINGLE' ? (
                     <div>
                        {passed ? (
                           <RadioStyled
                              variant="radio"
                              checked={item.chosen}
                              checkedIcon={
                                 item.true ? (
                                    <SuccessIconRadio checked />
                                 ) : (
                                    <ErrorIconRadio checked />
                                 )
                              }
                           />
                        ) : (
                           <RadioStyled
                              variant="radio"
                              value={item.optionId}
                              checked={selectedRadio[el.id] === item.optionId}
                              onChange={(e) =>
                                 handleRadioChange(e, el.id, item.optionId)
                              }
                           />
                        )}
                     </div>
                  ) : (
                     <div>
                        {!passed ? (
                           <Checkbox
                              variant="checkbox"
                              value={item.optionId}
                              checked={selectedOptions[el.id]?.[item.optionId]}
                              onChange={(e) =>
                                 handleOptionChange(e, el.id, item.optionId)
                              }
                           />
                        ) : (
                           <CheckboxStyled
                              variant="checkbox"
                              checked={item.chosen}
                              checkedIcon={
                                 item.true ? (
                                    <SuccessIconCheckbox checked />
                                 ) : (
                                    <ErrorIconCheckbox checked />
                                 )
                              }
                           />
                        )}
                     </div>
                  )}
                  <h3>{item.option}</h3>
               </ContainerQuestions>
            ))}
         </div>
      </Container>
   )
}
const RadioStyled = styled(Radio)`
   width: 40px;
`
const CheckboxStyled = styled(Checkbox)`
   width: 45px;
`
const ContainerTitle = styled('div')`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding-top: 1.5rem;
   margin-bottom: 1rem;
   div {
      display: flex;
      align-items: center;
      gap: 1rem;
   }
   p {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 1rem;
   }
`
const Container = styled('div')`
   border-radius: 5px;
`
const ContainerQuestions = styled('div')`
   height: 3rem;
   display: flex;
   align-items: center;
   gap: 0.5rem;
   &:last-child {
      margin-bottom: 1rem;
   }
`
