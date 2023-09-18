import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../../components/UI/header/Header'
import { TabsStudents } from '../../../components/UI/tabs/TabsStudents'
import { getLesson } from '../../../store/lesson/lessonThunk'
import { getCardsStudentLayout } from '../../../store/studentLayout/studentLayoutThunk'
import { dataBell } from '../../../utils/constants/constants'

export const LessonLayout = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useSelector((state) => state.auth)
   const { lesson } = useSelector((state) => state.lesson)
   const { cards } = useSelector((state) => state.studentLayout)

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])
   useEffect(() => {
      dispatch(getCardsStudentLayout(id))
   }, [])

   const getCards = cards.find((el) => el.id === +params.id)
   const getName = lesson.find((el) => el.lessonId === +params.lessonId)

   return (
      <>
         <div>
            <Header
               titlePage="Студент"
               dataBell={dataBell}
               bellTotal={dataBell?.length}
            />
            <SpanStyled>
               <button type="button" onClick={() => navigate('/student')}>
                  Мои курсы
               </button>
               <div>
                  {`>`}
                  <button
                     type="button"
                     className="button"
                     onClick={() =>
                        navigate(`/student/mycoursesstu/${params.id}`)
                     }
                  >
                     {getCards?.courseName}
                  </button>
                  {`>`}
                  <h1>{getName?.lessonName}</h1>
               </div>
            </SpanStyled>
         </div>
         <Container>
            <div>
               <TabsStudents />
            </div>
            <div className="outlet">
               <Outlet />
            </div>
         </Container>
      </>
   )
}
const Container = styled('div')`
   position: absolute;
   right: 1%;
   bottom: 1%;
   top: 9.5rem;
   left: 16rem;
   background-color: #fff;
   padding: 20px;
   border-radius: 8px;
   .outlet {
      margin-top: 2rem;
   }
`
const SpanStyled = styled('p')`
   font-size: 0.875rem;
   margin-bottom: 1.5rem;
   display: flex;
   gap: 1rem;
   align-items: end;
   button {
      cursor: pointer;
      border: none;
      color: var(--black, #000);
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
   }
   div {
      display: flex;
      gap: 0.5rem;
      align-items: center;
   }
   h1 {
      font-size: 0.875rem;
      color: #8d949e;
   }
   .button {
      cursor: pointer;
      font-size: 0.875rem;
      color: #8d949e;
   }
`
