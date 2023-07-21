import React from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Table from '../../../../components/UI/table/Table'
import { Header } from '../../../../components/UI/header/Header'

export const GroupsTable = () => {
   const params = useParams()
   const navigate = useNavigate()
   const navigateGoBackGroups = () => {
      navigate('/home')
   }
   return (
      <>
         <div>
            <Header titlePage="Администратор" />
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Группы
            </button>
            \ {params.details}
         </SpanStyled>
         <Table />
      </>
   )
}

const SpanStyled = styled('p')`
   font-size: 0.875rem;
   margin-top: 2.75rem;
   margin-bottom: 1.5rem;
   display: flex;
   gap: 0.3125rem;
   align-items: center;
   button {
      border: none;
      font-size: 0.875rem;
      color: #747d74;
   }
`
