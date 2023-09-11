import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Pagination, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../../components/UI/header/Header'
import { getLesson } from '../../../store/lesson/lessonThunk'
import { Isloading } from '../../../components/UI/snackbar/Isloading'
import { NotFound } from '../../../components/UI/not-found/NotFound'
import { getCardsStudentLayout } from '../../../store/studentLayout/studentLayoutThunk'
import { NotificationModal } from './NotificationModal'
import { useToggle } from '../../../utils/hooks/general'
import { dataBell } from '../../../utils/constants/constants'

export const StudentLesson = () => {
   const params = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useSelector((state) => state.auth)
   const { lesson, isLoading } = useSelector((state) => state.lesson)
   const { cards } = useSelector((state) => state.studentLayout)
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
   const lessonsPerPage = 8
   const [page, setPage] = useState(1)

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   const startIndex = (page - 1) * lessonsPerPage
   const endIndex = startIndex + lessonsPerPage
   const displayedLessons = lesson.slice(startIndex, endIndex)

   return (
      <div>
         <Header
            titlePage="Студент"
            clickBellStudent={openModalBellStudent}
            bellTotal={dataBell?.length}
         />
         {isLoading && <Isloading />}
         <SpanStyled>
            <button type="button" onClick={() => navigate('/student')}>
               Мои курсы
            </button>
            <div>
               {`>`}
               <h1>{getCards?.courseName}</h1>
            </div>
         </SpanStyled>
         {lesson && lesson.length > 0 ? (
            <ContainerItem>
               <ContainerMap>
                  {displayedLessons.map((el, i) => (
                     <ContentContainer key={el.lessonId}>
                        <Link to={`${el.lessonId}`}>
                           <h3>Урок: {i + 1}</h3>
                           <h4>{el.lessonName}</h4>
                        </Link>
                     </ContentContainer>
                  ))}
               </ContainerMap>
            </ContainerItem>
         ) : (
            <ContainerNotFound>
               <NotFound content="Нет уроков" />
            </ContainerNotFound>
         )}

         <PaginationContainer>
            <Pagination
               count={Math.ceil(lesson.length / lessonsPerPage)}
               color="primary"
               page={page}
               onChange={handlePageChange}
            />
         </PaginationContainer>
         <NotificationModal
            open={isActive}
            handleClose={() => setActive('')}
            data={dataBell}
         />
      </div>
   )
}
const PaginationContainer = styled('div')`
   position: absolute;
   bottom: 1%;
   left: 0;
   right: 0;
   display: flex;
   justify-content: center;
   padding: 10px 0;
   z-index: 9;
`
const ContainerItem = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 8px;
   position: absolute;
   right: 1%;
   bottom: 1%;
   top: 9.5rem;
   left: 16rem;
`
const ContainerMap = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`

const ContentContainer = styled('div')`
   flex-basis: calc(50% - 10px);
   height: 6rem;
   background-color: #bfd3f86e;
   border-radius: 5px;
   padding: 20px;
   cursor: pointer;
   border: 1px solid #d4d4d4;
   a {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
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
      color: #747d74;
   }
`

const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
