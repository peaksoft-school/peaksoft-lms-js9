import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material'
import { DeleteIcon, EditIcon, MeatCardIcon } from '../../assets/icons'

export default function MeatBall() {
   const [open, setOpen] = React.useState(false)
   const handleClick = () => {
      setOpen(!open)
   }
   return (
      <div>
         {open ? (
            <Paper sx={{ width: '10.25rem', height: '6rem' }}>
               <MenuList>
                  <MenuItem>
                     <EditIcon
                        style={{ width: '1.115rem', marginRight: '0.60rem' }}
                     />
                     <ListItemTexts>Редактировать</ListItemTexts>
                  </MenuItem>
                  <MenuItem>
                     <DeleteIcon
                        style={{ width: '1.115rem', marginRight: '0.60rem' }}
                     />
                     <ListItemTexts>Удалить</ListItemTexts>
                  </MenuItem>
               </MenuList>
            </Paper>
         ) : (
            <button type="button" onClick={handleClick}>
               <MeatCardIcon />
            </button>
         )}
      </div>
   )
}
const ListItemTexts = styled(ListItemText)(() => ({
   fontFamily: 'Open Sans',
   fontSize: '0.875rem',
   fontWeight: 400,
   lineHeight: '1.5rem',
}))
