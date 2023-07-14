import { Material } from './components/materials/Material'
import { materialsLesson } from './utils/constants/MaterialsArray'

function App() {
   return (
      <div>
         <h1>Peaksoft lms js9</h1>
         {materialsLesson.map((el) => (
            <Material el={el} />
         ))}
      </div>
   )
}
export default App
