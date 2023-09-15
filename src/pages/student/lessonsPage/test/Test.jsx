import React, { useEffect, useState } from 'react'
import { Pagination, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getTestNameLesson } from '../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const Test = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { testsName } = useSelector((state) => state.studentLayout)
   const linksPerPage = 8
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(getTestNameLesson(+params.lessonId))
   }, [])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   const startIndex = (page - 1) * linksPerPage
   const endIndex = startIndex + linksPerPage
   const displayedLinks = testsName.slice(startIndex, endIndex)

   return (
      <div>
         {testsName && testsName.length > 0 ? (
            <>
               <ContainerMap>
                  {displayedLinks.map((el, i) => (
                     <ContentContainer key={el.testId} to={`${el.testId}`}>
                        <h4>
                           №{i + 1} {el.testName}
                        </h4>
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
      </div>
   )
}

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
