import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLesson } from '../../../../store/lesson/lessonThunk'
import { Header } from '../../../../components/UI/header/Header'
import { TaskPage } from './TaskPage'
import { getCardsStudentLayout } from '../../../../store/studentLayout/studentLayoutThunk'
import { useToggle } from '../../../../utils/hooks/general'
import { NotificationModal } from '../../home-page/NotificationModal'
import { dataBell } from '../../../../utils/constants/constants'

export const TaskSend = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { lesson } = useSelector((state) => state.lesson)
   const { cards } = useSelector((state) => state.studentLayout)
   const { id } = useSelector((state) => state.auth)
   const { isActive, setActive } = useToggle('openmodalbellstudent')
   const openModalBellStudent = () => {
      setActive(!isActive)
   }

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])
   useEffect(() => {
      dispatch(getCardsStudentLayout(id))
   }, [])

   const getCards = cards.find((el) => el.id === +params.id)
   const getName = lesson.find((el) => el.lessonId === +params.lessonId)
   return (
      <div>
         <Header
            titlePage="Студент"
            clickBellStudent={openModalBellStudent}
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
                  onClick={() => navigate(`/student/mycoursesstu/${params.id}`)}
               >
                  {getCards?.courseName}
               </button>
               {`>`}
               <button
                  type="button"
                  className="button"
                  onClick={() =>
                     navigate(
                        `/student/mycoursesstu/${params.id}/${params.lessonId}/taskStudent`
                     )
                  }
               >
                  {getName?.lessonName}
               </button>
            </div>
         </SpanStyled>
         <div>
            <TaskPage />
         </div>
         <NotificationModal
            open={isActive}
            handleClose={() => setActive('')}
            data={dataBell}
         />
      </div>
   )
}
const SpanStyled = styled('p')`
   font-size: 0.875rem;
   margin-bottom: 1.5rem;
   display: flex;
   gap: 1rem;
   align-items: end;
   button {
      cursor: pointer;
      border: none;
      color: var(--black, #292929);
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
      color: #4f504f;
   }
   .button {
      cursor: pointer;
      font-size: 0.875rem;
      color: #4f504f;
   }
`
