import React from 'react'
import { Sidebar } from '../../../../layout/Sidebar'
import { Header } from '../../../../components/UI/header/Header'

export const GetInstructor = () => {
   return (
      <div>
         <Header />
         <Sidebar roles="instructor" />
      </div>
   )
}
