import * as React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DeleteIcon, EditIcon, MeatBallIcon } from '../../assets/icons'

const data = [
   {
      id: 1,
      title: 'EditIcon',
      img: <EditIcon />,
   },
   {
      id: 2,
      title: 'DeleteIcon',
      img: <DeleteIcon />,
   },
]

export default function MeatBall({ menuItems, onClick }) {
   const [openText, setOpen] = React.useState(false)
   const [anchorEl, setAnchorEl] = React.useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
      if (menuItems.length > 0) {
         setOpen(true)
         console.log(openText)
      } else {
         setOpen(false)
      }
   }

   const handleClose = () => {
      setAnchorEl(null)
   }

   return (
      <div>
         <IconButton
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
         >
            <MeatBallIcon />
         </IconButton>
         <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
               'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
         >
            {(menuItems.length ? menuItems : data).map((item) => (
               <StyledMenuItem
                  key={item.id}
                  onClick={() => onClick(item.title)}
               >
                  <div>{item.img}</div>
                  {item.title}
               </StyledMenuItem>
            ))}
         </StyledMenu>
      </div>
   )
}

const StyledMenu = styled((props) => (
   <Menu
      elevation={0}
      anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'right',
      }}
      transformOrigin={{
         vertical: 'top',
         horizontal: 'right',
      }}
      {...props}
   />
))(({ theme }) => ({
   '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
         theme.palette.mode === 'light'
            ? 'rgb(55, 65, 81)'
            : theme.palette.grey[300],
      boxShadow:
         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
         padding: '4px 0',
      },
   },
}))

const StyledMenuItem = styled(MenuItem)(() => ({
   display: 'flex',
   gap: '7px',
   '&:hover': {
      color: '#1F6ED4',
   },
   ':hover div': {
      path: {
         fill: '#1F6ED4',
      },
   },
}))
