/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import {
   styled,
   Table as MuiTable,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from '@mui/material'

const Table = ({ columns, data, itemsPerPage }) => {
   const [currentPage, setCurrentPage] = useState(0)
   const pageCount = Math.ceil(data.length / itemsPerPage)

   const handlePreviousPage = () => {
      if (currentPage > 0) {
         setCurrentPage(currentPage - 1)
      }
   }

   const handleNextPage = () => {
      if (currentPage < pageCount - 1) {
         setCurrentPage(currentPage + 1)
      }
   }
   const offset = currentPage * itemsPerPage

   const currentData = data.slice(offset, offset + itemsPerPage)

   return (
      <StyledContainer component={Paper}>
         <StyledTable>
            <TableHead>
               <StyledTableRow>
                  {columns.map((column) => (
                     <StyledTableCell key={column.id}>
                        {column.label}
                     </StyledTableCell>
                  ))}
               </StyledTableRow>
            </TableHead>
            <TableBody>
               {currentData.map((row) => (
                  <StyledTableRow key={row.id}>
                     {columns?.map((column) => {
                        if (column.render) {
                           return column.render(row)
                        }
                        return (
                           <StyledTableCellForData
                              key={column.id}
                              title={String(row[column.id])}
                           >
                              {column.id === 'password' &&
                              row[column.id].length > 10
                                 ? `${row[column.id].substring(0, 10)}...`
                                 : row[column.id]}
                           </StyledTableCellForData>
                        )
                     })}
                  </StyledTableRow>
               ))}
            </TableBody>
         </StyledTable>
         <PaginationContainer>
            <button
               type="submit"
               onClick={handlePreviousPage}
               disabled={currentPage === 0}
            >
               Предыдущая
            </button>
            <button
               type="submit"
               onClick={handleNextPage}
               disabled={currentPage === pageCount - 1}
            >
               Следующая
            </button>
         </PaginationContainer>
      </StyledContainer>
   )
}

export default Table
const StyledTable = styled(MuiTable)`
   min-width: 650px;
`
const StyledContainer = styled(TableContainer)`
   width: 100%;
   margin-top: 10px;
`
const StyledTableRow = styled(TableRow)`
   height: 10px;
   &:nth-of-type(even) {
      background-color: #eceaea9f;
   }
`
const StyledTableCell = styled(TableCell)`
   padding: 10px 8px 10px 20px;
   font-weight: 900;
   color: black;
`
const StyledTableCellForData = styled(TableCell)`
   padding: 0px 0px 0px 20px;
   position: relative;
   max-width: 200px;
   white-space: nowrap;
   /* text-overflow: ellipsis; */
`
const PaginationContainer = styled('div')`
   display: flex;
   justify-content: center;
   margin-top: 20px;
   gap: 10px;
`
