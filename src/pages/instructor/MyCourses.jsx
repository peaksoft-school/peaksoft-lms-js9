import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { Material } from '../../components/UI/cards/Material'
import { deleteCourse, getLesson } from '../../store/lesson/lessonThunk'
// import { materialsLesson } from '../../utils/constants/MaterialsArray'
// import { deleteCourse, getLesson } from '../../store/lesson/lessonThunk'

export const MyCoursesIns = () => {
   const data = useSelector((state) => state.lesson)
   console.log('data: ', data)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getLesson(2))
   }, [])

   const clickDeleteAll = (courseId) => {
      console.log('nurislam', courseId)
      dispatch(deleteCourse(courseId))
   }
   return (
      <Div>
         {data.lesson.map((el) => (
            <Material key={el.id} el={el} clickDeleteAll={clickDeleteAll} />
         ))}
      </Div>
   )
}

const Div = styled('div')(() => ({
   // display: 'flex',
}))
