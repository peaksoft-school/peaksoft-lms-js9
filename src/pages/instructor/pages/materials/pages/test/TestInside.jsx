import React, { useEffect, useState } from 'react'
import { Pagination, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTestNameLesson } from '../../../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../../../components/UI/not-found/NotFound'
import { getByIdInstructor } from '../../../../../../store/courses/coursesThunk'
import { DeleteRedIcon, EditGreenIcon } from '../../../../../../assets/icons'
import { IconButtons } from '../../../../../../components/UI/button/IconButtons'
import { ModalDelete } from '../../../../../admin/courses/courses-modal/ModalDelete'
import { useToggle } from '../../../../../../utils/hooks/general'
import { deleteTestThunk } from '../../../../../../store/test/testThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../../../components/UI/snackbar/Isloading'

export const TestInsideInstrutors = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useSelector((state) => state.auth)
   const { courses } = useSelector((state) => state.courses)
   const { testsName, isLoading } = useSelector((state) => state.studentLayout)
   const { isActive, setActive } = useToggle('modaldeletetest')
   const [getTestInfo, setTestInfo] = useState(null)

   const linksPerPage = 8
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(getTestNameLesson(params.lessonid))
      dispatch(getByIdInstructor(id))
   }, [])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   const getCourseName = courses.find((el) => el.id === +params.id)

   const startIndex = (page - 1) * linksPerPage
   const endIndex = startIndex + linksPerPage
   const displayedLinks = testsName.slice(startIndex, endIndex)

   const openModalDelete = (data) => {
      setActive(!isActive)
      setTestInfo(data)
   }
   const deleteTestHandler = () => {
      dispatch(
         deleteTestThunk({
            testid: getTestInfo?.testId,
            lessonid: params.lessonid,
            showSnackbar,
         })
      )
      setActive('')
   }

   // const openEditPage = () => {}

   return (
      <>
         {isLoading && <Isloading />}
         <ContainerNavigate>
            <button
               className="buttonOne"
               onClick={() => navigate('/')}
               type="button"
            >
               Мои курсы
            </button>
            <button
               onClick={() =>
                  navigate(
                     `/instructor/mycoursesins/${getCourseName?.id}/materials`
                  )
               }
               type="button"
            >
               \ {getCourseName?.courseName} \ Тест
            </button>
         </ContainerNavigate>
         <Container>
            {testsName && testsName.length > 0 ? (
               <>
                  <ContainerMap>
                     {displayedLinks.map((el, i) => (
                        <ContentContainer key={el.testId} to={`${el.testId}`}>
                           <h4>
                              №{i + 1} {el.testName}
                           </h4>
                           <div>
                              <Link to={`edit/${el.testId}`}>
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
                        count={Math.ceil(testsName.length / linksPerPage)}
                        color="primary"
                        page={page}
                        onChange={handlePageChange}
                     />
                  </PaginationContainer>
               </>
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет тестов!" />
               </ContainerNotFound>
            )}
         </Container>
         <ModalDelete
            open={isActive}
            handleClose={() => setActive('')}
            deleteCardHandler={deleteTestHandler}
            paragraph={`тест ${getTestInfo?.testName}`}
         />
      </>
   )
}
const ContainerNavigate = styled('div')`
   display: flex;
   align-items: end;
   gap: 5px;
   button {
      cursor: pointer;
      font-size: 0.9rem;
      background-color: none;
      border: none;
      color: #000;
   }
   .buttonOne {
      cursor: pointer;
      background-color: none;
      border: none;
      font-size: large;
      color: #747d74;
   }
`
const Container = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 0.8rem;
   position: absolute;
   right: 1%;
   left: 16rem;
   bottom: 1%;
   top: 9rem;
`

const ContainerMap = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`

const ContentContainer = styled(Link)`
   position: relative;
   flex-basis: calc(50% - 10px);
   height: 4rem;
   background-color: #bfd3f86e;
   border-radius: 5px;
   padding: 20px;
   cursor: pointer;
   border: 1px solid #d4d4d4;
   display: flex;
   justify-content: space-between;
   align-items: center;
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
