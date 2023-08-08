import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import logo from '../assets/image/logoPeksoft.png'
import {
   GroupsIcon,
   CoursesIcon,
   TeachersIcon,
   StudentsIcon,
} from '../assets/icons/index'
import { reusableRoutesRoles } from '../utils/constants/constants'

export const Sidebar = ({ roles }) => {
   const routes = reusableRoutesRoles.find((route) => route[roles])
   const {
      home,
      courses,
      teachers,
      students,
      myCoursesStudent,
      myCoursesInstructor,
   } = routes[roles]
   return (
      <Container>
         <LogoPeaksoft>
            <img src={logo} alt="logo-peaksoft" />
         </LogoPeaksoft>
         <div>
            {roles === 'admin' && (
               <>
                  <NavLinkStyled to={home} activeClassName="active">
                     <GroupsIcon />
                     <h2>Группы</h2>
                  </NavLinkStyled>
                  <NavLinkStyled to={courses} activeClassName="active">
                     <CoursesIcon />
                     <h2>Курсы</h2>
                  </NavLinkStyled>
                  <NavLinkStyled to={teachers} activeClassName="active">
                     <TeachersIcon />
                     <h2>Учителя</h2>
                  </NavLinkStyled>
                  <NavLinkStyled to={students} activeClassName="active">
                     <StudentsIcon />
                     <h2>Студенты</h2>
                  </NavLinkStyled>
               </>
            )}
            {roles === 'instructor' && (
               <NavLinkStyled to={myCoursesInstructor} activeClassName="active">
                  <CoursesIcon />
                  <h2>Мои курсы</h2>
               </NavLinkStyled>
            )}
            {roles === 'student' && (
               <NavLinkStyled to={myCoursesStudent} activeClassName="active">
                  <CoursesIcon />
                  <h2>Мои курсы</h2>
               </NavLinkStyled>
            )}
         </div>
      </Container>
   )
}

const Container = styled('aside')`
   background-color: #ffffff;
   width: 12.5vw;
   height: 100vh;
   display: flex;
   flex-direction: column;
   gap: 4.125rem;
`

const LogoPeaksoft = styled('div')`
   text-align: center;
   margin-top: 2.3rem;
   img {
      width: 8vw;
      height: 5vh;
   }
`

const NavLinkStyled = styled(NavLink)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'start',
   gap: '1rem',
   width: '11.5vw',
   height: '5vh',
   lineHeight: '2.875rem',
   svg: {
      marginLeft: '20%',
      width: '1.5vw',
      height: '5.5vh',
   },
   h2: {
      fontSize: '1rem',
      fontWeight: '700',
   },
   '&.active': {
      background:
         'linear-gradient(to left, #dde9f9 97%, #dde9f9 97%, #1f6ed4 50%)',
      width: '11.5vw',
      borderTopRightRadius: '0.625em',
      borderBottomRightRadius: '0.625em',
      h2: {
         color: '#1f6ed4',
      },
      path: {
         fill: '#1f6ed4',
      },
   },
}))
