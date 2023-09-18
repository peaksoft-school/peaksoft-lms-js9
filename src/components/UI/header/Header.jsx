import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Box, Select } from '@mui/material'
import { useDispatch } from 'react-redux'
import { IconButtons } from '../button/IconButtons'
import {
   AddGroupToCourse,
   AppointIconWhite,
   BellIcon,
   DropDownIcon,
   ExelExport,
   ExitIcon,
   PlusIcon,
   ProfileIcon,
} from '../../../assets/icons'
import { Button } from '../button/Button'
import { Tabs } from '../tabs/Tabs'
import { logout } from '../../../store/signIn/signInThunk'
import { ModalLogout } from './ModalLogout'
import { NotificationModal } from '../../../pages/student/home-page/NotificationModal'
import { useToggle } from '../../../utils/hooks/general'

export const Header = ({
   onClick,
   conditionButton,
   titlePage,
   courses,
   buttonContent,
   labelOne,
   toOne,
   icon,
   dangerButton,
   bellTotal,
   dataBell,
}) => {
   const [state, setState] = useState(false)
   const dropdownRef = useRef(null)
   const { isActive: open, setActive: close } = useToggle('modallogout')
   const { isActive, setActive } = useToggle('openmodalbellstudent')

   const openModalBellStudent = () => {
      setActive(!isActive)
   }

   const dispatch = useDispatch()
   const handleChange = () => {
      setState(!state)
   }
   const logoutHandler = () => {
      dispatch(logout())
      close('')
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
            <TabsStyle>
               {courses === 'Courses' && (
                  <Tabs
                     labelOne={labelOne}
                     labelTwo="Студенты"
                     toOne={toOne}
                     toTwo="students"
                  />
               )}
            </TabsStyle>
            <Div>
               {titlePage === 'Студент' && (
                  <ContainerNotification>
                     <IconButtons onClick={openModalBellStudent}>
                        <BellIcon />
                     </IconButtons>
                     <p>{bellTotal}</p>
                  </ContainerNotification>
               )}
               <BoxLogOut ref={dropdownRef} onClick={handleChange}>
                  <ProfileIcon />
                  <button type="button">{titlePage}</button>
                  <DropDownIcon />
                  {state && (
                     <StyledDropDown onClick={() => close(!open)}>
                        <ExitIcon style={{ marginLeft: '1.20rem' }} />
                        <span>Выйти</span>
                     </StyledDropDown>
                  )}
               </BoxLogOut>
            </Div>
         </StyledBox>
         <ModalLogout
            open={open}
            handleClose={() => close('')}
            logoutHandler={logoutHandler}
         />
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
                        }}
                        onClick={onClick}
                     >
                        <PlusIcon />
                        {buttonContent}
                     </Button>
                  </ImportExelButton>
               </StudentsButtonDiv>
            ) : (
               <div>
                  {buttonContent && (
                     <Button
                        style={{
                           display: 'flex',
                           gap: '8px',
                        }}
                        onClick={onClick}
                     >
                        {buttonContent === 'Назначить учителя' ? (
                           <AppointIconWhite />
                        ) : icon ? (
                           <AddGroupToCourse />
                        ) : (
                           <PlusIcon />
                        )}
                        {buttonContent}
                     </Button>
                  )}
               </div>
            )}
            {dangerButton && (
               <Button
                  variant={
                     dangerButton === 'Создать урок' ? 'contained' : 'danger'
                  }
                  style={{
                     display: 'flex',
                     gap: '8px',
                  }}
                  onClick={onClick}
               >
                  {dangerButton === 'Создать урок' && <PlusIcon />}
                  {dangerButton}
               </Button>
            )}
         </ButtonContainer>
         <NotificationModal
            open={isActive}
            handleClose={() => setActive('')}
            data={dataBell}
         />
      </Container>
   )
}

const StyledBox = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   gap: '5px',
   justifyContent: 'flex-end',
   borderBottom: '1px solid #C4C4C4',
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
   top: '65px',
   right: '40px',
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

const TabsStyle = styled('div')`
   display: flex;
   justify-content: end;
   width: 60%;
`
const Div = styled('div')`
   display: flex;
   justify-content: end;
   gap: 1rem;
   width: 50%;
`

const ButtonContainer = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '1.5rem',
}))

const BoxLogOut = styled(Box)`
   display: flex;
   align-items: center;
   cursor: pointer;
   gap: 0.875rem;
   button {
      background-color: #eff0f4;
      border: none;
      font-size: 1rem;
      cursor: pointer;
   }
`

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
const ContainerNotification = styled('div')`
   position: relative;
   p {
      background-color: #fa8900;
      position: absolute;
      color: #fff;
      border-radius: 12rem;
      padding: 0 0.5rem;
      top: -0.4rem;
      right: 0;
      font-size: small;
   }
`
