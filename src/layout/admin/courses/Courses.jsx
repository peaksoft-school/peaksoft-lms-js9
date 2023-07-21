import React from 'react'
import { Dashboard } from '../../dashboardHeader/Dashboard'

export const Courses = () => {
   return (
      <div>
         <div>
            <Dashboard
               roles="Администратор"
               showButton
               titleButton="+ Создать курс"
            />
         </div>
         <h1>Courses</h1>
      </div>
   )
}
