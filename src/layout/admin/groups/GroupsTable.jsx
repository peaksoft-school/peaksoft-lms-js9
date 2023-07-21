import React from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Table from '../../../components/UI/table/Table'
import { Dashboard } from '../../dashboardHeader/Dashboard'

export const GroupsTable = () => {
   const params = useParams()
   const navigate = useNavigate()
   const navigateGoBackGroups = () => {
      navigate('/home')
   }
   return (
      <>
         <div>
            <Dashboard roles="Администратор" />
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
   font-size: 14px;
   margin-top: 44px;
   margin-bottom: 24px;
   display: flex;
   gap: 5px;
   align-items: center;
   button {
      border: none;
      font-size: 14px;
      color: #747d74;
   }
`
