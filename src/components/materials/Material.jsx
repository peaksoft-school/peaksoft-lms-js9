import React from 'react'
import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { materialsLesson } from '../../utils/constants/MaterialsArray'
import {
   LessonVideo,
   Task,
   Test,
   Link as LinkMaterial,
   Presentation,
   LogoLesson,
   DeleteRedIcon,
} from '../../assets'

export const Material = () => {
   return (
      <Container>
         {materialsLesson.map((el) => (
            <div key={el.id} className="container">
               <div className="containerHeader">
                  <div>
                     <LogoLesson />
                     <h1>Lesson-1</h1>
                  </div>
                  <div className="containerDeleteIconButton">
                     <select value="asdfasdf">
                        <option value="Видеоурок">Видеоурок</option>
                        <option value="Презентация">Презентация</option>
                        <option value="">Задание</option>
                        <option value="">Ссылка</option>
                        <option value="">Тест</option>
                     </select>
                     <DeleteRedIcon />
                  </div>
               </div>
               <div className="containerItem">
                  <NavLink
                     to="/asd"
                     activeClassName="active"
                     className="nav-link"
                  >
                     <LessonVideo />
                     <h2>{el.lessonVideo}</h2>
                     <div className="buttons">
                        <button type="button" className="button">
                           Редактировать
                        </button>
                        <button type="button" className="button">
                           Удалить
                        </button>
                     </div>
                  </NavLink>
                  <NavLink to="/sde" activeClassName="active">
                     <Presentation />
                     <h2>{el.presentation}</h2>
                  </NavLink>
                  <NavLink to="/sfd" activeClassName="active">
                     <Task />
                     <h2>{el.task}</h2>
                  </NavLink>
                  <NavLink to="/sd" activeClassName="active">
                     <LinkMaterial />
                     <h2>{el.link}</h2>
                  </NavLink>
                  <NavLink to="/sdv" activeClassName="active">
                     <Test />
                     <h2>{el.test}</h2>
                  </NavLink>
               </div>
            </div>
         ))}
      </Container>
   )
}

const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
   '.container': {
      backgroundColor: theme.palette.primary.light,
      margin: '20px',
      width: '560px',
      height: '320px',
      borderRadius: '10px',
      '.containerHeader': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         height: '80px',
         borderBottom: `1px solid ${theme.palette.secondary.border}`,
         '& div': {
            display: 'flex',
            alignItems: 'center',
            gap: '17px',
            padding: '20px',
            '& h1': {
               fontSize: '18px',
               fontWeight: '600',
            },
         },
         '.containerDeleteIconButton': {
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            '& select': {
               padding: ' 10px 16px 10px 24px',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '8px',
               borderRadius: '8px',
               border: '1px solid #EBEBEB',
               width: '144px',
               height: '44px',
            },
         },
      },
      '.containerItem': {
         padding: '17px 20px',
         display: 'flex',
         flexDirection: 'column',
         gap: '19px',
         '& a': {
            display: 'flex',
            alignItems: 'center',
            gap: '26px',
            '& svg': {
               width: '24px',
               height: '24px',
            },
            '& h2': {
               fontSize: '16px',
               fontWeight: '600',
               color: '#000',
            },
         },
         '& .nav-link .buttons': {
            display: 'none',
         },
         '& .nav-link:hover .buttons': {
            display: 'flex',
         },
         '& .button': {
            marginRight: '10px',
         },
      },
   },
}))
