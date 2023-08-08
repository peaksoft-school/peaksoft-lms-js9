import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../../../components/UI/table/Table'
import { Header } from '../../../../components/UI/header/Header'
import { getGroupUsers } from '../../../../store/group/AdminThunk'
import { columnsTableGroup } from '../../../../utils/constants/constants'

export const GroupsTable = () => {
   const params = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { cards, users } = useSelector((state) => state.cards)
   const getGroupName = cards.find((item) => item.id === +params.details)

   const navigateGoBackGroups = () => {
      navigate('/admin/home')
   }
   useEffect(() => {
      dispatch(getGroupUsers(params.details))
   }, [])

   return (
      <>
         <div>
            <Header titlePage="Администратор" />
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Группы
            </button>
            \ {getGroupName?.groupName}
         </SpanStyled>
         <Table data={users} columns={columnsTableGroup} />
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
