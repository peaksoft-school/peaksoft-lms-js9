import React from 'react'
import styled from 'styled-components'

const Table = ({ todosTable }) => {
   return (
      <Container>
         <StyledTable>
            <ColumnNames>
               <th>ID</th>
               <th>Имя Фамилия</th>
               <th>Группа</th>
               <th>Формат</th>
               <th>Номер телефона</th>
               <th>E-mail</th>
            </ColumnNames>

            {todosTable.map((info) => {
               return (
                  <tr>
                     <td>{info.id}</td>
                     <td>{info.name}</td>
                     <td>{info.group}</td>
                     <td>{info.format}</td>
                     <td>{info.number}</td>
                     <td>{info.email}</td>
                  </tr>
               )
            })}
         </StyledTable>
      </Container>
   )
}

export default Table

const Container = styled.div`
   width: 71.25rem;
   padding: 5px 0px;
   border: 1px solid #dddddd;
   border-radius: 6px;
`
const ColumnNames = styled.tr`
   border-bottom: 1px solid #dddddd;
`

const StyledTable = styled.table`
   width: 100%;
   border-collapse: collapse;
   border: none;
   td,
   th {
      text-align: left;
      padding: 8px 30px;
   }
   tr:nth-child(2n) {
      background-color: #f3eded9f;
   }
`
