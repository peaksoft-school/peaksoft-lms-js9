import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import { DropDownIcon, ExitIcon, ProfileIcon } from '../assets/icons'
import { IconButtons } from './UI/button/IconButtons'
import { Button } from './UI/button/Button'
import { Tabs } from './UI/tabs/Tabs'

export const Header = ({
   onClick,
   titleButton,
   errorColor,
   conditionButton,
   titleTabs,
   titleTabs2,
   titlePage,
}) => {
   const [state, setState] = useState(false)

   const handleChange = () => {
      setState(!state)
   }
   return (
      <Container>
         <StyledBox>
            <TabsStyle
               labelOne={titleTabs}
               labelTwo={titleTabs2}
               toOne="/"
               toTwo="s"
            />
            <IconButtons ttons>
               <ProfileIcon />
            </IconButtons>
            <p>{titlePage}</p>
            <IconButtons onClick={handleChange}>
               {state && (
                  <StyledDropDown>
                     <IconButtons>
                        <ExitIcon style={{ marginLeft: '1.20rem' }} />
                     </IconButtons>
                     <span>Выйти</span>
                  </StyledDropDown>
               )}
               <DropDownIcon />
            </IconButtons>
         </StyledBox>
         {conditionButton ? (
            <ButtonContainer>
               <Button
                  style={errorColor ? { backgroundColor: 'red' } : null}
                  onClick={onClick}
               >
                  {titleButton}
               </Button>
            </ButtonContainer>
         ) : null}
      </Container>
   )
}

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '5px',
   justifyContent: 'flex-end',
   borderBottom: '1px solid #000',
   height: '4.69rem',
   '& p': {
      fontWeight: '400',
      lineHeight: '1.375rem',
      fontsize: '1rem',
   },
}))
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
const ButtonContainer = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '1.5rem',
}))
