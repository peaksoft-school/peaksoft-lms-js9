import { styled } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Tabs = ({ labelOne, labelTwo, toOne, toTwo }) => {
   return (
      <Container>
         <NavLink to={toOne} className="activee">
            <h2>{labelOne}</h2>
            <p />
         </NavLink>
         <NavLink to={toTwo} className="activee">
            <h2>{labelTwo}</h2>
            <p />
         </NavLink>
      </Container>
   )
}

const Container = styled('div')`
   display: flex;
   justify-content: center;
   width: 71.25rem;
   flex-shrink: 0;

   h2 {
      font-family: Open Sans;
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
   }

   .activee {
      color: black;
      text-align: center;
      width: 9.3125rem;
   }
   .active {
      color: #3772ff;
      border: none;

      p {
         margin-top: 1.37rem;
         width: 9.3125rem;
         height: 0.25rem;
         background: var(--button, #3772ff);
         border-radius: 0.3125rem 0.3125rem 0rem 0rem;
      }
   }
`
