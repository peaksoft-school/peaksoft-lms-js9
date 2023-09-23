import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../../../../components/UI/header/Header'

export const LessonLayoutInstrutor = () => {
   return (
      <div>
         <Header titlePage="Инструктор" />
         <Outlet />
      </div>
   )
}
