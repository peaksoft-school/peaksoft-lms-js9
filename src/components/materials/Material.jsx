import React, { useState } from 'react'
import { FormControl, MenuItem, Select, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { materialsLesson } from '../../utils/constants/MaterialsArray'
import { Button } from '../UI/button/Button'
import {
   LessonVideo,
   Task,
   Test,
   Presentation,
   LinkMaterial,
   LogoLesson,
   DeleteRedIcon,
   EditGreenIcon,
} from '../../assets'
import { reusableRoutesLesson } from '../../utils/constants/routes'

export const Material = ({
   clickEditHandler,
   clickDeleteHandler,
   clickDeleteAll,
}) => {
   const [selectedValues, setSelectedValues] = useState({})

   const handleChange = (id, value) => {
      setSelectedValues((prevState) => ({
         ...prevState,
         [id]: value,
      }))
   }

   return (
      <Container>
         {materialsLesson.map((el) => (
            <div key={el.id} className="container">
               <div className="containerHeader">
                  <div>
                     <LogoLesson />
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
                           <MenuItem
                              value="videolesson"
                              sx={{
                                 borderBottom: '1px solid #ECECEC',
                                 '&:hover': {
                                    backgroundColor: '#1a227e11',
                                    color: '#3772FF',
                                 },
                              }}
                           >
                              Видеоурок
                           </MenuItem>
                           <MenuItem
                              value="presentation"
                              sx={{
                                 borderBottom: '1px solid #ECECEC',
                                 '&:hover': {
                                    backgroundColor: '#1a227e11',
                                    color: '#3772FF',
                                 },
                              }}
                           >
                              Презентация
                           </MenuItem>
                           <MenuItem
                              value="task"
                              sx={{
                                 borderBottom: '1px solid #ECECEC',
                                 '&:hover': {
                                    backgroundColor: '#1a227e11',
                                    color: '#3772FF',
                                 },
                              }}
                           >
                              Задание
                           </MenuItem>
                           <MenuItem
                              value="link"
                              sx={{
                                 borderBottom: '1px solid #ECECEC',
                                 '&:hover': {
                                    backgroundColor: '#1a227e11',
                                    color: '#3772FF',
                                 },
                              }}
                           >
                              Ссылка
                           </MenuItem>
                           <MenuItem
                              value="test"
                              sx={{
                                 '&:hover': {
                                    backgroundColor: '#1a227e11',
                                    color: '#3772FF',
                                 },
                              }}
                           >
                              Тест
                           </MenuItem>
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
                        <LessonVideo />
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
                        <Presentation />
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
                        <Task />
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
                        <LinkMaterial />
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
                        <Test />
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
      height: '315px',
      borderRadius: '10px',
      '.containerHeader': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         height: '80px',
         borderBottom: `1px solid ${theme.palette.secondary.border}`,
         padding: '20px',
         '& div': {
            display: 'flex',
            alignItems: 'center',
            gap: '17px',
            '& h1': {
               fontSize: '18px',
               fontWeight: '600',
            },
         },
         '.containerDeleteIconButton': {
            display: 'flex',
            alignItems: 'center',
            gap: '30px',

            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
               {
                  borderColor: '#EBEBEB',
               },

            '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
               {
                  border: '1px solid #EBEBEB',
                  width: '93px',
               },
            '& select': {
               padding: '10px 16px 10px 24px',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '8px',
               borderRadius: '8px',
               width: '144px',
               height: '44px',
               '& option': {
                  width: '147px',
                  height: '43px',
                  backgroundColor: 'red',
                  margin: '20px',
               },
            },
         },
      },
      '.containerItem': {
         display: 'flex',
         flexDirection: 'column',
         '& a': {
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '46px',
            '&:hover': {
               backgroundColor: 'rgba(26, 35, 126, 0.07)',
            },
            '.containerTitleIcon': {
               display: 'flex',
               alignItems: 'center',
               gap: '25px',
            },
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
         '.buttons': {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
         },
      },
   },
}))

const StyledButton = styled(Button)(({ theme }) => ({
   backgroundColor: 'rgba(255, 255, 255, 0)',
   height: '36px',
   color: '#292929',
   fontSize: '16px',
   fontWeight: '400',
   padding: '6px 10px',
   display: 'flex',
   gap: '4px',
   '&:hover': {
      backgroundColor: theme.palette.secondary.light,
   },
}))
