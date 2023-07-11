import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material'
import { MeatBallIcon } from '../../assets/icons'

export default function MeatBall({ menuItems, handleClick, open, onClick }) {
   const titleHandler = (event) => {
      onClick(event)
   }
   return (
      <div>
         {open ? (
            <Paper sx={{ width: '10.30rem', height: 'auto' }}>
               <MenuList>
                  {menuItems.map((item) => (
                     <MenuItem key={item.id}>
                        <img src={item.img} alt="not found" />
                        <LisItemTexts onClick={() => titleHandler(item.title)}>
                           {item.title}
                        </LisItemTexts>
                     </MenuItem>
                  ))}
               </MenuList>
            </Paper>
         ) : (
            <button type="button" onClick={handleClick}>
               <MeatBallIcon />
            </button>
         )}
      </div>
   )
}

const LisItemTexts = styled(ListItemText)(() => ({
   fontFamily: 'Open Sans',
   fontSize: '0.875rem',
   fontWeight: 400,
   lineHeight: '1.5rem',
}))
