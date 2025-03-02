import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Login from './user/Login'
import Signup from './user/SignUp'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App