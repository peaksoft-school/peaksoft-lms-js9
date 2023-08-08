// import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component, fallBacPath, isAllowed }) => {
   if (!isAllowed) {
      console.log(
         'Пользователь не имеет доступа. Перенаправление на:',
         fallBacPath
      )
      return <Navigate to={fallBacPath} />
   }
   console.log('Пользователь имеет доступ. Компонент рендеринга.')
   return component
}
