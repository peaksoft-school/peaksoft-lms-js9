/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { FormControl, MenuItem, Select, styled } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { menuItem, navLink } from '../../../utils/constants/constants'
import { Button } from '../button/Button'

import {
   LogoLessonIcon,
   DeleteRedIcon,
   EditGreenIcon,
} from '../../../assets/icons'
import { IconButtons } from '../button/IconButtons'
import {
   getLinkLessonThunk,
   getPresentationLessonThunk,
   getVideoLessonThunk,
} from '../../../store/lessonCrud/lessonCrudThunk'

export const Material = ({
   clickDeleteHandler,
   clickEditHandlerLessons,
   clickEditHandler,
   openModalDeleteHandler,
   clickSaveHandlerLessons,
   el,
}) => {
   const dispatch = useDispatch()

   const saveLessonCrudHandler = (item) => {
      clickSaveHandlerLessons({ lesson: el, data: item })
   }

   const editLessonCrudHandler = (item) => {
      clickEditHandlerLessons({ lesson: el, data: item })
      dispatch(getLinkLessonThunk(el.lessonId))
      dispatch(getVideoLessonThunk(el.lessonId))
   }

   const [selectedValues, setSelectedValues] = useState({})
   const handleChange = (id, value) => {
      setSelectedValues((prevState) => ({
         ...prevState,
         [id]: value,
      }))
   }

   const submit = () => {
      dispatch(getLinkLessonThunk(el.lessonId))
      dispatch(getVideoLessonThunk(el.lessonId))
      dispatch(getPresentationLessonThunk(el.lessonId))
   }

   return (
      <Container key={el.id} onClick={submit}>
         <div className="containerHeader">
            <div>
               <IconButtons onClick={() => clickEditHandler(el)}>
                  <LogoLessonIcon />
               </IconButtons>
               <h1>
                  {el.lessonName?.length > 25
                     ? `${el.lessonName.substring(0, 25)}...`
                     : el.lessonName}
               </h1>
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
                        <Link
                           to={
                              item.id === 3
                                 ? `createtask/${el.lessonId}`
                                 : item.id === 5
                                 ? `createtest/${el.lessonId}`
                                 : '#'
                           }
                        >
                           <MenuItem
                              key={item.id}
                              value={item.value}
                              disabled={
                                 item.id === 1
                                    ? el.videoLesson
                                    : item.id === 2
                                    ? el.presentation
                                    : item.id === 4
                                    ? el.link
                                    : ''
                              }
                              onClick={() => saveLessonCrudHandler(item)}
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
                        </Link>
                     ))}
                  </Select>
               </FormControl>
               <div key={el.id}>
                  <IconButtons
                     onClick={() =>
                        openModalDeleteHandler({
                           name: el.lessonName,
                           id: el.lessonId,
                        })
                     }
                  >
                     <DeleteRedIcon />
                  </IconButtons>
               </div>
            </div>
         </div>
         <div className="containerItem">
            {navLink.map((item) => (
               <NavLink
                  key={item.id}
                  to={`${item.id}/${el.lessonId}`}
                  activeClassName="active"
                  className="nav-link"
               >
                  <div className="containerTitleIcon">
                     {item.icon}
                     <h2>{item.title}</h2>
                  </div>
                  {((item.id === 1 && el.videoLesson) ||
                     (item.id === 2 && el.presentation) ||
                     (item.id === 4 && el.link)) && (
                     <div className="buttons">
                        <StyledButton
                           key={item.lessonId}
                           className="button"
                           onClick={(e) => {
                              e.preventDefault()
                              editLessonCrudHandler(item)
                           }}
                        >
                           <EditGreenIcon />
                           Редактировать
                        </StyledButton>
                        <StyledButton
                           className="button"
                           onClick={(e) => {
                              e.preventDefault()
                              clickDeleteHandler({
                                 data: item.title,
                                 actionType: item.id,
                              })
                           }}
                        >
                           <DeleteRedIcon />
                           Удалить
                        </StyledButton>
                     </div>
                  )}
               </NavLink>
            ))}
         </div>
      </Container>
   )
}

const Container = styled('div')(({ theme }) => ({
   backgroundColor: '#ffffff',
   width: '39vw',
   height: '34.7vh',
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
         gap: '1.06rem',
         alignItems: 'center',
         '& h1': {
            fontSize: '1.125rem',
            fontWeight: '600',
         },
      },
      '.containerDeleteIconButton': {
         display: 'flex',
         alignItems: 'center',
         gap: '1.88rem',
      },
   },
   '.containerItem': {
      display: 'flex',
      flexDirection: 'column',
      '& a': {
         display: 'flex',
         padding: '0 1.25rem',
         justifyContent: 'space-between',
         alignItems: 'center',
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
