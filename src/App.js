import { AppRoutes } from './routes/AppRoutes'
import Snackbar from './components/UI/snackbar/Snackbar'

// import { GetTaskIns } from './pages/instructor/pages/materials/GetTaskIns'

function App() {
   return (
      <div>
         <AppRoutes />
         <Snackbar />
         {/* <GetTaskIns /> */}
      </div>
   )
}

export default App
