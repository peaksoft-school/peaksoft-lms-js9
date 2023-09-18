import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {
   LessonVideoIcon,
   TaskIcon,
   TestIcon,
   PresentationIcon,
   LinkIcon,
} from '../../../assets/icons'

export const navLink = [
   {
      route: 'videolessonStudent',
      icon: <LessonVideoIcon />,
      title: 'Видеоурок',
   },
   {
      route: 'presentationStudent',
      icon: <PresentationIcon />,
      title: 'Презентация',
   },
   {
      route: 'taskStudent',
      icon: <TaskIcon />,
      title: 'Задания',
   },
   {
      route: 'linkStudent',
      icon: <LinkIcon />,
      title: 'Ссылка',
   },
   {
      route: 'testStudent',
      icon: <TestIcon />,
      title: 'Тест',
   },
]
export const TabsStudents = () => {
   return (
      <Container>
         {navLink.map((el) => (
            <NavLink to={el.route} key={el.route} activeClassName="activee">
               <div>
                  {el.icon}
                  <h2>{el.title}</h2>
               </div>
               <p />
            </NavLink>
         ))}
      </Container>
   )
}

const Container = styled('div')`
   display: flex;
   gap: 2rem;
   border-bottom: 1px solid #d4d4d4;
   a {
      div {
         display: flex;
         align-items: center;
         gap: 1rem;
         svg {
            path {
               fill: #898989;
            }
         }
      }
   }
   h2 {
      text-align: start;
      font-size: 1rem;
      color: #898989;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
   }
   .activee {
      color: black;
      text-align: center;
      width: 9.3125rem;
   }
   .active {
      h2 {
         color: #3772ff;
      }
      border: none;
      svg {
         path {
            fill: #3772ff;
         }
      }
      p {
         margin-top: 1rem;
         height: 0.1rem;
         width: 105%;
         background: var(--button, #3772ff);
         border-radius: 0.3125rem 0.3125rem 0rem 0rem;
      }
   }
`
