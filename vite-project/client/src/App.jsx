import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Global from "./styles/Global"
import Home from './pages/Home'
import Login from './pages/Login'
import Country from './pages/Country'

function App() {
  return (
    <BrowserRouter>
      <Global />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/country' element={<Country />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App