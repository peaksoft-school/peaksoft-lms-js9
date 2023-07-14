import React, { useState } from 'react'
import { FormControl, MenuItem, Select, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { menuItem } from '../../utils/constants/MaterialsArray'
import { Button } from '../UI/button/Button'
import { reusableRoutesLesson } from '../../utils/constants/routes'
import {
   LessonVideoIcon,
   TaskIcon,
   TestIcon,
   PresentationIcon,
   LogoLessonIcon,
   DeleteRedIcon,
   EditGreenIcon,
   LinkIcon,
} from '../../assets/icons'

export const Material = ({
   clickEditHandler,
   clickDeleteHandler,
   clickDeleteAll,
   el,
}) => {
   const [selectedValues, setSelectedValues] = useState({})

   const handleChange = (id, value) => {
      setSelectedValues((prevState) => ({
         ...prevState,
         [id]: value,
      }))
   }

   return (
      <Container key={el.id}>
         <div className="containerHeader">
            <div>
               <LogoLessonIcon />
               <h1>{el.lesson}</h1>
            </div>
            <div className="containerDeleteIconButton">
               <FormControl size="small">
                  <Select
                     className="outlinedInputHover"
                     labelId="demo-select-small-label"
                     id="demo-select-small"
                     value={selectedValues[el.id] || ''}
                     onChange={(e) => handleChange(el.id, e.target.value)}
                     sx={{
                        '&:hover': {
                           '& .MuiOutlinedInput-notchedOutline ': {
                              borderColor: '#EBEBEB',
                           },
                        },
                     }}
                     renderValue={() => 'Добавить'}
                     displayEmpty
                     placeholder="Добавить"
                  >
                     {menuItem.map((item) => (
                        <MenuItem
                           value={item.value}
                           sx={{
                              borderBottom: '1px solid #ECECEC',
                              '&:hover': {
                                 backgroundColor: '#1a227e11',
                                 color: '#3772FF',
                              },
                           }}
                        >
                           {item.title}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <DeleteRedIcon onClick={() => clickDeleteAll(el.id)} />
            </div>
         </div>
         <div className="containerItem">
            <NavLink
               to={reusableRoutesLesson.videolesson}
               activeClassName="active"
               className="nav-link"
            >
               <div className="containerTitleIcon">
                  <LessonVideoIcon />
                  <h2>{el.lessonVideo}</h2>
               </div>
               <div className="buttons">
                  <StyledButton
                     className="button"
                     onClick={() => clickEditHandler(el.id)}
                  >
                     <EditGreenIcon />
                     Редактировать
                  </StyledButton>
                  <StyledButton
                     className="button"
                     onClick={() => clickDeleteHandler(el.id)}
                  >
                     <DeleteRedIcon />
                     Удалить
                  </StyledButton>
               </div>
            </NavLink>
            <NavLink
               to={reusableRoutesLesson.presentation}
               activeClassName="active"
               className="nav-link"
            >
               <div className="containerTitleIcon">
                  <PresentationIcon />
                  <h2>{el.presentation}</h2>
               </div>
               <div className="buttons">
                  <StyledButton
                     className="button"
                     onClick={() => clickEditHandler(el.id)}
                  >
                     <EditGreenIcon />
                     Редактировать
                  </StyledButton>
                  <StyledButton
                     className="button"
                     onClick={() => clickDeleteHandler(el.id)}
                  >
                     <DeleteRedIcon />
                     Удалить
                  </StyledButton>
               </div>
            </NavLink>
            <NavLink
               to={reusableRoutesLesson.task}
               activeClassName="active"
               className="nav-link"
            >
               <div className="containerTitleIcon">
                  <TaskIcon />
                  <h2>{el.task}</h2>
               </div>
               <div className="buttons">
                  <StyledButton
                     className="button"
                     onClick={() => clickEditHandler(el.id)}
                  >
                     <EditGreenIcon />
                     Редактировать
                  </StyledButton>
                  <StyledButton
                     className="button"
                     onClick={() => clickDeleteHandler(el.id)}
                  >
                     <DeleteRedIcon />
                     Удалить
                  </StyledButton>
               </div>
            </NavLink>
            <NavLink
               to={reusableRoutesLesson.link}
               activeClassName="active"
               className="nav-link"
            >
               <div className="containerTitleIcon">
                  <LinkIcon />
                  <h2>{el.link}</h2>
               </div>
               <div className="buttons">
                  <StyledButton
                     className="button"
                     onClick={() => clickEditHandler(el.id)}
                  >
                     <EditGreenIcon />
                     Редактировать
                  </StyledButton>
                  <StyledButton
                     className="button"
                     onClick={() => clickDeleteHandler(el.id)}
                  >
                     <DeleteRedIcon />
                     Удалить
                  </StyledButton>
               </div>
            </NavLink>
            <NavLink
               to={reusableRoutesLesson.test}
               activeClassName="active"
               className="nav-link"
            >
               <div className="containerTitleIcon">
                  <TestIcon />
                  <h2>{el.test}</h2>
               </div>
               <div className="buttons">
                  <StyledButton
                     className="button"
                     onClick={() => clickEditHandler(el.id)}
                  >
                     <EditGreenIcon />
                     Редактировать
                  </StyledButton>
                  <StyledButton
                     className="button"
                     onClick={() => clickDeleteHandler(el.id)}
                  >
                     <DeleteRedIcon />
                     Удалить
                  </StyledButton>
               </div>
            </NavLink>
         </div>
      </Container>
   )
}

const Container = styled('div')(({ theme }) => ({
   backgroundColor: theme.palette.primary.light,
   margin: '1.25rem',
   width: '29vw',
   height: '33.7vh',
   borderRadius: '0.5rem',
   overflow: 'hidden',
   '.containerHeader': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '8.5vh',
      borderBottom: `1px solid ${theme.palette.secondary.border}`,
      padding: '1.25rem',
      '& div': {
         display: 'flex',
         alignItems: 'center',
         gap: '1.06rem',
         '& h1': {
            fontSize: '1.125rem',
            fontWeight: '600',
         },
      },
      '.containerDeleteIconButton': {
         display: 'flex',
         alignItems: 'center',
         gap: '1.88rem',

         '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
               borderColor: '#EBEBEB',
            },

         '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
            {
               border: '1px solid #EBEBEB',
               width: '4vw',
            },
      },
   },
   '.containerItem': {
      display: 'flex',
      flexDirection: 'column',
      '& a': {
         padding: '0 1.25rem',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         height: '5vh',
         '&:hover': {
            backgroundColor: 'rgba(26, 35, 126, 0.07)',
         },
         '.containerTitleIcon': {
            display: 'flex',
            alignItems: 'center',
            gap: '1.56rem',
         },
         '& svg': {
            height: '2.5vh',
         },
         '& h2': {
            fontSize: '1rem',
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
      '.buttons': {
         display: 'flex',
         alignItems: 'center',
         gap: '0.94rem',
      },
   },
}))

const StyledButton = styled(Button)(({ theme }) => ({
   backgroundColor: 'rgba(255, 255, 255, 0)',
   height: '2.25rem',
   color: '#292929',
   fontSize: '1rem',
   fontWeight: '400',
   padding: '0.38rem 0.63rem',
   display: 'flex',
   gap: '0.25rem',
   '&:hover': {
      backgroundColor: theme.palette.secondary.light,
   },
}))
