import React from 'react'
import { useParams } from 'react-router-dom'

export const CreateTaskPage = () => {
   const params = useParams()
   return (
      <div>
         <h1>CreateTaskPage{params.lessonid}</h1>
      </div>
   )
}
