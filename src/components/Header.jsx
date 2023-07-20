import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Box, Select } from '@mui/material'
import { DropDownIcon, ExitIcon, ProfileIcon } from '../assets/icons'
import { IconButtons } from './UI/button/IconButtons'
import { Button } from './UI/button/Button'
import { Tabs } from './UI/tabs/Tabs'
import { ReactComponent as PlusIcon } from '../assets/icons/plusIcon.svg'
import { ReactComponent as ExelExport } from '../assets/icons/exportExel.svg'

export const Header = ({
   onClick,
   conditionButton,
   titlePage,
   courses,
   buttonContent,
}) => {
   const [state, setState] = useState(false)
   const dropdownRef = useRef(null)

   const handleChange = () => {
      setState(!state)
   }

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setState(false)
      }
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   return (
      <Container>
         <StyledBox>
            {courses === 'Courses' && (
               <TabsStyle
                  labelOne="Учителя"
                  labelTwo="Студенты"
                  toOne="/"
                  toTwo="s"
               />
            )}
            <BoxLogOut ref={dropdownRef} onClick={handleChange}>
               <ProfileIcon />
               <p>{titlePage}</p>
               <DropDownIcon />
            </BoxLogOut>
            <IconButtons>
               {state && (
                  <StyledDropDown>
                     <ExitIcon style={{ marginLeft: '1.20rem' }} />
                     <span>Выйти</span>
                  </StyledDropDown>
               )}
            </IconButtons>
         </StyledBox>
         <ButtonContainer>
            {conditionButton === 'Students' ? (
               <StudentsButtonDiv>
                  <Select
                     sx={{
                        width: '15%',
                        border: '1px solid',
                        borderColor: '#3772FF',
                     }}
                  />
                  <ImportExelButton>
                     <Button
                        style={{
                           display: 'flex',
                           background: '#fff',
                           color: '#3772FF',
                           textTransform: 'capitalize',
                           gap: '8px',
                           height: '40px',
                           fontFamily: 'Open Sans',
                           fontSize: '0.875rem',
                           fontStyle: 'normal',
                           fontWeight: 600,
                           lineHeight: '1.25rem',
                           letterSpacing: '0.0009rem',
                           border: '1px solid',
                        }}
                        onClick={onClick}
                     >
                        <ExelExport />
                        Импорт Exel
                     </Button>
                     <Button
                        style={{
                           display: 'flex',
                           gap: '8px',
                           textTransform: 'capitalize',
                        }}
                        onClick={onClick}
                     >
                        <PlusIcon />
                        {buttonContent}
                     </Button>
                  </ImportExelButton>
               </StudentsButtonDiv>
            ) : (
               <Button
                  style={{
                     display: 'flex',
                     gap: '8px',
                     textTransform: 'capitalize',
                  }}
                  onClick={onClick}
               >
                  <PlusIcon />
                  {buttonContent}
               </Button>
            )}
         </ButtonContainer>
      </Container>
   )
}

const StyledBox = styled(Box)(() => ({
   width: '100%',
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
   width: 100%;
   .css-js2pjb {
      margin-top: 27px;
   }
`

const TabsStyle = styled(Tabs)`
   color: red;
   margin-top: 27px;
   margin: 0 auto;
`
const ButtonContainer = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '1.5rem',
}))

const BoxLogOut = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
   gap: '0.875rem',
}))

const StudentsButtonDiv = styled('div')(() => ({
   width: '100%',
   height: '40px',
   display: 'flex',
   justifyContent: 'space-between',
}))
const ImportExelButton = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
}))
