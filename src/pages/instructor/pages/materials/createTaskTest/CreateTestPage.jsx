import React from 'react'
import { useParams } from 'react-router-dom'
import { TestQuestion } from '../../../../../components/questionT/TestQuestion'

export const CreateTestPage = () => {
   const params = useParams()
   console.log(params)
   return (
      <div>
         <TestQuestion />
      </div>
   )
}
