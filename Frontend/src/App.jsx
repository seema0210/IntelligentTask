import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/create' element={<CreateUser/>}/>
        <Route path='/updaqte' element={<UpdateUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
