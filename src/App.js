import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Landingpage from './Components/Landingpage'
import Form from './Components/Form'
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Landingpage />}/>
      <Route path='Form' element={<Form />} />
    </Routes>
     
  )
}

export default App