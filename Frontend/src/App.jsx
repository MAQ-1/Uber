import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'




function App() {
  

  return (
    <>  
      {/* Routes to Login pages  */}
         <Routes>
             <Route path="/" element={<Start/>} />
             <Route path="/login" element={<UserLogin/>} />
             <Route path="/signup" element={<UserSignup/>} />
           <Route path="/captain-login" element={<CaptainLogin/>} />
           <Route path="/captain-signup" element={<CaptainSignup/>} />
           <Route path="/home" element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
           } />

           <Route path='/users/logout' element={
            <UserProtectedWrapper>
             <UserLogout />
            </UserProtectedWrapper>
           }
           />

           <Route path='/captains/logout' element={
            <CaptainProtectedWrapper>
             <CaptainLogout />
            </CaptainProtectedWrapper>
           }
           />

           <Route path="/captain-home" element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
           } />
         </Routes>
    
    </>

  )
}

export default App
