import React, { useState } from 'react'
import { FormControl, MenuItem, Select, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
   // const [videoIdState, setVideoIdState] = useState()
   const { lesson } = useSelector((state) => state.lesson)
   console.log('lesson: ', lesson)

   const saveLessonCrudHandler = (item) => {
      clickSaveHandlerLessons({ lesson: el, data: item })
   }

   const editLessonCrudHandler = (item) => {
      clickEditHandlerLessons({ lesson: el, data: item })
      dispatch(getLinkLessonThunk(el.lessonId))
      dispatch(getVideoLessonThunk(el?.lessonId))
   }

   const [selectedValues, setSelectedValues] = useState({})
   const handleChange = (id, value) => {
      setSelectedValues((prevState) => ({
         ...prevState,
         [id]: value,
      }))
   }
   // useEffect(() => {
   //    setVideoIdState(videoId)
   // }, [])

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
               <h1>{el.lessonName}</h1>
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
                           key={item.id}
                           value={item.value}
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
                  to={item.route}
                  activeClassName="active"
                  className="nav-link"
               >
                  <div className="containerTitleIcon">
                     {item.icon}
                     <h2>{item.title}</h2>
                  </div>
                  <div className="buttons">
                     {el.videoLesson === true ? (
                        <StyledButton
                           key={item.lessonId}
                           className="button"
                           onClick={(e) => {
                              e.preventDefault()
                              console.log(item, 'efeffef')
                              editLessonCrudHandler(item)
                           }}
                        >
                           <EditGreenIcon />
                           Редактировать
                        </StyledButton>
                     ) : null}

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
               </NavLink>
            ))}
         </div>
      </Container>
   )
}

const Container = styled('div')(({ theme }) => ({
   backgroundColor: '#ffffff',
   margin: '1.25rem',
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

         // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
         // {
         //    borderColor: '#EBEBEB',
         // },
         // '.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
         // {
         //    border: '1px solid #EBEBEB',
         //    width: '4vw',
         // },
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
