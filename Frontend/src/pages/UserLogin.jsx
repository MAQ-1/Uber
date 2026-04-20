import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserdataContext} from '../context/UserContext.jsx'
import axios from 'axios'
import uberLogo from '../assets/Uber.png'
// User login page — allows existing users to sign in
const UserLogin = () => {
   // State for form fields
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const { setUser } = useContext(UserdataContext)
  const navigate = useNavigate()


   const submithandler = async (e) => {
    e.preventDefault()

    // Build data object and store in state
    const userData = {
      email,
      password
    }

     try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/Login`, userData
         );
     
         if (response.status === 200) {
           const data = response.data;
     
           setUser(data.user);
     
           console.log("Login successful 🎉");
           localStorage.setItem('token', data.token);
           navigate('/home');
         }
     
       } catch (error) {
         console.error(error);
     
           const errMsg =
           error?.response?.data?.message ||
           error?.response?.data?.errors?.[0]?.msg ||
           "Something went wrong";
     
         alert(errMsg);
       }
     
    
    

    // Reset form fields after submission
    setEmail('')
    setPassword('')
   }

  return (
    <div className='h-screen flex flex-col justify-between px-7 py-10'>

      <div>
        {/* Uber logo */}
        <img src={uberLogo} alt="Uber Logo" className='w-14 mb-8' />

        {/* Login form */}
        <form onSubmit={submithandler} className='max-w-md w-full mx-auto'>
          <h3 className='text-lg font-semibold mb-2'>What's your email</h3>
          <input required
           type="email"
           placeholder='email@example.com'
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className='w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black' />

          <h3 className='text-lg font-semibold mb-2'>Enter Password</h3>
          <input required
           type="password"
           placeholder='password'
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className='w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-6 text-base outline-none focus:border-black' />

          <button className='w-full bg-black text-white py-3 rounded-xl text-lg font-semibold'>Login</button>
        </form>

        {/* Link to signup page for new users */}
        <p className='text-center mt-4 text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600 font-semibold'>Sign Up</Link></p>
      </div>

      {/* Captain login section at the bottom */}
      <div className='bg-gray-50 px-5 py-4 rounded-2xl shadow-inner'>
        <Link to="/captain-login" className='w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2'>🚗 Sign in as Captain</Link>
        <p className='text-center text-xs text-gray-400 mt-3'>Want to earn with Uber? Join as a captain today.</p>
      </div>

    </div>
  )
}

export default UserLogin
