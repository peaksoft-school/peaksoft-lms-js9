import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, styled } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { getTaskLesson } from '../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const Task = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { tasks } = useSelector((state) => state.studentLayout)
   const tasksPerPage = 8
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(getTaskLesson(+params.lessonId))
   }, [])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   const startIndex = (page - 1) * tasksPerPage
   const endIndex = startIndex + tasksPerPage
   const displayedTasks = tasks.slice(startIndex, endIndex)

   return (
      <div>
         {tasks && tasks.length > 0 ? (
            <>
               <ContainerMap>
                  {displayedTasks.map((el, i) => (
                     <ContentContainer key={el.taskId} to={`${el.taskId}`}>
                        <h4>
                           №{i + 1} {el.taskName}
                        </h4>
                     </ContentContainer>
                  ))}
               </ContainerMap>
               <PaginationContainer>
                  <Pagination
                     count={Math.ceil(tasks.length / tasksPerPage)}
                     color="primary"
                     page={page}
                     onChange={handlePageChange}
                  />
               </PaginationContainer>
            </>
         ) : (
            <ContainerNotFound>
               <NotFound content="Нет задач!" />
            </ContainerNotFound>
         )}
      </div>
   )
}

const ContainerMap = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`

const ContentContainer = styled(Link)`
   flex-basis: calc(50% - 10px);
   height: 4rem;
   background-color: #bfd3f86e;
   border-radius: 5px;
   padding: 20px;
   border: 1px solid #d4d4d4;
   cursor: pointer;
   a {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
   }
`
const PaginationContainer = styled('div')`
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   justify-content: center;
   padding: 10px 0;
   z-index: 9;
`

const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
