import React from 'react'
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

const StyledTable = styled(MuiTable)`
   min-width: 650px;
`
const StyledContainer = styled(TableContainer)`
   width: 71.25rem;
`
const StyledTableRow = styled(TableRow)`
   &:nth-child(even) {
      background-color: #eceaea9f;
   }
`
const StyledTableCell = styled(TableCell)`
   padding: 10px 8px 10px 20px;
`
const StyledTableCellForData = styled(TableCell)`
   padding: 8px 8px 8px 20px;
`

const Table = ({ columns, data }) => {
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
               {data.map((row) => (
                  <StyledTableRow key={row.id}>
                     {columns.map((column) => (
                        <StyledTableCellForData key={column.id}>
                           {column.id === 'actions'
                              ? row.actions
                              : row[column.id]}
                        </StyledTableCellForData>
                     ))}
                  </StyledTableRow>
               ))}
            </TableBody>
         </StyledTable>
      </StyledContainer>
   )
}

export default Table
