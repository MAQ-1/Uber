import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
function App() {
  

  return (
    <>  
      {/* Routes to Login pages  */}
         <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/login" element={<UserLogin/>} />
             <Route path="/Signup" element={<UserSignup/>} />
             <Route path="/Captain-login" element={<CaptainLogin/>} />
             <Route path="/Captain-Signup" element={<CaptainSignup/>} />
         </Routes>
    
    </>

  )
}

export default App
