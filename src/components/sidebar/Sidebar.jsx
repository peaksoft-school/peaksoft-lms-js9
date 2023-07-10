import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/image/logoPeksoft.png'
import { ReactComponent as GroupIcon } from '../../assets/icons/Property 1=Группы.svg'
import { ReactComponent as CoursesIcon } from '../../assets/icons/Без заливки.svg'
import { ReactComponent as TeachersIcon } from '../../assets/icons/Без заливки2.svg'
import { ReactComponent as StudentsIcon } from '../../assets/icons/Без заливки3.svg'

export const Sidebar = ({ roles }) => {
   return (
      <Container>
         <LogoPeaksoft src={logo} alt="logo-peaksoft" />
         {(() => {
            switch (roles) {
               case 'admin':
                  return (
                     <div>
                        <NavLinkStyled to="/" activeClassName="active">
                           <GroupIcon />
                           <h2>Группы</h2>
                        </NavLinkStyled>
                        <NavLinkStyled to="/courses" activeClassName="active">
                           <CoursesIcon />
                           <h2>Курсы</h2>
                        </NavLinkStyled>
                        <NavLinkStyled to="/teachers" activeClassName="active">
                           <TeachersIcon />
                           <h2>Учителя</h2>
                        </NavLinkStyled>
                        <NavLinkStyled to="/students" activeClassName="active">
                           <StudentsIcon />
                           <h2>Студенты</h2>
                        </NavLinkStyled>
                     </div>
                  )
               case 'instructor':
                  return (
                     <NavLinkStyled to="/" activeClassName="active">
                        <CoursesIcon />
                        <h2>Мои курсы</h2>
                     </NavLinkStyled>
                  )
               case 'students':
                  return (
                     <NavLinkStyled to="/" activeClassName="active">
                        <CoursesIcon />
                        <h2>Мои курсы</h2>
                     </NavLinkStyled>
                  )
               default:
                  return null
            }
         })()}
      </Container>
   )
}
const Container = styled('div')`
   background-color: #ffffff;
   width: 15em;
   height: 100vh;
   display: flex;
   flex-direction: column;
   gap: 4.125rem;
`

const LogoPeaksoft = styled('img')`
   margin: 2.375rem 0 0 3.125rem;
   height: 2.625rem;
   width: 8.875rem;
`

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'start',
   gap: '1rem',
   width: '14rem',
   height: '3.125rem',
   lineHeight: '1.875rem',
   svg: {
      marginLeft: '2.625rem',
      width: '1.5rem',
      height: '1.5rem',
   },
   h2: {
      fontSize: '1rem',
      fontWeight: '600',
   },
   '&.active': {
      background:
         'linear-gradient(to left, #dde9f9 97%, #dde9f9 97%, #1f6ed4 50%)',
      width: '14rem',
      borderTopRightRadius: '0.625rem',
      borderBottomRightRadius: '0.625rem',
      h2: {
         color: theme.palette.primary.blue,
      },
      path: {
         fill: theme.palette.primary.blue,
      },
   },
}))
