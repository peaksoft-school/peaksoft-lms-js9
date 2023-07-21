import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { DropDownIcon, ProfileIcon, ExitBlueIcon } from '../../assets/icons'
import { Button } from '../../components/UI/button/Button'
import { IconButtons } from '../../components/UI/button/IconButtons'
import { Tabs } from '../../components/UI/tabs/Tabs'

export const Dashboard = ({
   onClick,
   titleButton,
   colorButton,
   showButton,
   showTabs,
   roles,
   toTwo,
   toOne,
   labelTwo,
   labelOne,
}) => {
   const [state, setState] = useState(false)

   const handleChange = () => {
      setState(!state)
   }
   return (
      <Container>
         <StyledBox>
            {showTabs && (
               <TabsStyle
                  labelOne={labelOne}
                  labelTwo={labelTwo}
                  toOne={toOne}
                  toTwo={toTwo}
               />
            )}

            <IconButtons>
               <ProfileIcon />
            </IconButtons>
            <p>{roles}</p>
            <IconButtons onClick={handleChange}>
               {state && (
                  <StyledDropDown>
                     <IconButtons>
                        <ExitBlueIcon style={{ marginLeft: '1.20rem' }} />
                     </IconButtons>
                     <span>Выйти</span>
                  </StyledDropDown>
               )}
               <DropDownIcon />
            </IconButtons>
         </StyledBox>
         {showButton && (
            <ContainerButton>
               <Button
                  style={colorButton ? { backgroundColor: 'red' } : null}
                  onClick={onClick}
               >
                  {titleButton}
               </Button>
            </ContainerButton>
         )}
      </Container>
   )
}

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '5px',
   justifyContent: 'flex-end',
   borderBottom: '1px solid #C4C4C4',
   height: '4.69rem',
   '& p': {
      fontWeight: '400',
      lineHeight: '1.375rem',
      fontSize: '1rem',
   },
}))
// const RolesStyled = styled('p')``
const StyledDropDown = styled('h3')({
   display: 'flex',
   zIndex: 1,
   position: 'absolute',
   top: '40px',
   right: '10px',
   width: '13.31rem',
   height: '3.5rem',
   background: '#DDE9F9',
   cursor: 'pointer',
   border: '1px solid #3772FF',
   borderRadius: '10px',
   justifyContent: 'start',
   alignItems: 'center',
   '& span': {
      fontSize: '18px',
      color: '#3772FF',
      marginLeft: '6px',
   },
})

const Container = styled(Box)`
   .css-js2pjb {
      margin-top: 27px;
   }
`

const TabsStyle = styled(Tabs)`
   margin-top: 27px;
   color: red;
`
const ContainerButton = styled('div')`
   display: flex;
   justify-content: end;
   margin-top: 24px;
   button {
      text-transform: capitalize;
   }
`
