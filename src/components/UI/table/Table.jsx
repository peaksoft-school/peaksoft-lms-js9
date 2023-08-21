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

const Table = ({ data, columns }) => {
   return (
      <StyledContainer component={Paper}>
         <StyledTable>
            <TableHead>
               <StyledTableRow>
                  {columns?.map((column) => (
                     <StyledTableCell key={column.id}>
                        {column.label}
                     </StyledTableCell>
                  ))}
               </StyledTableRow>
            </TableHead>
            <TableBody>
               {data?.map((row) => (
                  <StyledTableRow key={row.id}>
                     {columns?.map((column) => {
                        if (column.render) {
                           return column.render(row)
                        }
                        return (
                           <StyledTableCellForData key={column.id}>
                              {row[column.id]}
                           </StyledTableCellForData>
                        )
                     })}
                  </StyledTableRow>
               ))}
            </TableBody>
         </StyledTable>
      </StyledContainer>
   )
}

export default Table
const StyledTable = styled(MuiTable)`
   min-width: 650px;
`
const StyledContainer = styled(TableContainer)`
   width: 100%;
   border-radius: 10px;
`
const StyledTableRow = styled(TableRow)`
   &:nth-child(even) {
      width: 100px;
      background-color: #1a227e1a;
   }
`
const StyledTableCell = styled(TableCell)`
   padding: 10px 8px 10px 20px;
   font-weight: 900;
   color: black;
`
const StyledTableCellForData = styled(TableCell)`
   padding: 8px 8px 8px 20px;
   border: none;
`
