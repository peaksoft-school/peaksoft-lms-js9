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
      </StyledContainer>
   )
}

const StyledTable = styled(MuiTable)`
   min-width: 650px;
`
const StyledContainer = styled(TableContainer)`
   width: 100%;
`
const StyledTableRow = styled(TableRow)`
   &:nth-child(even) {
      background-color: #eceaea9f;
   }
`
const StyledTableCell = styled(TableCell)`
   font-weight: 900;
   padding: 10px 8px 10px 20px;
   color: black;
`
const StyledTableCellForData = styled(TableCell)`
   padding: 8px 8px 8px 20px;
`
export default Table
