import React, { useEffect, useState } from 'react'
import { Pagination, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getTaskLesson } from '../../../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../../../components/UI/not-found/NotFound'
import { Isloading } from '../../../../../../components/UI/snackbar/Isloading'
import { IconButtons } from '../../../../../../components/UI/button/IconButtons'
import { DeleteRedIcon, EditGreenIcon } from '../../../../../../assets/icons'
import { ModalDelete } from '../../../../../admin/courses/courses-modal/ModalDelete'
import { useToggle } from '../../../../../../utils/hooks/general'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { deleteTaskThunk } from '../../../../../../store/test/testThunk'

export const TaskIns = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { tasks, isLoading } = useSelector((state) => state.studentLayout)
   const tasksPerPage = 8
   const [page, setPage] = useState(1)
   const { isActive, setActive } = useToggle('modaldeletetask')
   const [getTaskInfo, setTaskInfo] = useState(null)

   useEffect(() => {
      dispatch(getTaskLesson(+params.lessonid))
   }, [])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   const startIndex = (page - 1) * tasksPerPage
   const endIndex = startIndex + tasksPerPage
   const displayedTasks = tasks.slice(startIndex, endIndex)

   const openModalDelete = (data) => {
      setActive(!isActive)
      setTaskInfo(data)
   }
   const deleteTaskHandler = () => {
      dispatch(
         deleteTaskThunk({
            taskid: getTaskInfo?.taskId,
            lessonid: params.lessonid,
            showSnackbar,
         })
      )
      setActive('')
   }
   return (
      <>
         {isLoading && <Isloading />}
         <Container>
            {tasks && tasks.length > 0 ? (
               <>
                  <ContainerMap>
                     {displayedTasks.map((el, i) => (
                        <ContentContainer key={el.taskId} to={`${el.taskId}`}>
                           <h4>
                              №{i + 1} {el.taskName}
                           </h4>
                           <div>
                              <Link to={`edit/${el.taskId}`}>
                                 <IconButtons>
                                    <EditGreenIcon />
                                 </IconButtons>
                              </Link>
                              <IconButtons
                                 onClick={(e) => {
                                    e.preventDefault()
                                    openModalDelete(el)
                                 }}
                              >
                                 <DeleteRedIcon />
                              </IconButtons>
                           </div>
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
         </Container>
         <ModalDelete
            open={isActive}
            handleClose={() => setActive('')}
            deleteCardHandler={deleteTaskHandler}
            paragraph={`задание ${getTaskInfo?.taskName}`}
         />
      </>
   )
}
const Container = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 0.8rem;
   position: absolute;
   right: 1%;
   left: 16rem;
   bottom: 1%;
   top: 7rem;
`
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
   display: flex;
   align-items: center;
   justify-content: space-between;
   a {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
   }
   div {
      display: flex;
      align-items: center;
      gap: 20px;
      display: none;
   }
   &:hover {
      transition: 1s;
      div {
         display: flex;
      }
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
