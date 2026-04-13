import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import uberLogo from '../assets/Uber.png'

// Captain login page — allows existing captains to sign in
const CaptainLogin = () => {
  // State for form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      email,
      password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      )

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        console.log('Captain login successful')
        localStorage.setItem('token', data.token);
        navigate('/captain-home')
      }
      
    } catch (error) {
      console.error(error)
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        'Something went wrong'
      alert(errMsg)
    }

    // Reset form fields after submission
    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex flex-col justify-between px-7 py-10'>

      <div>
        {/* Uber logo */}
        <img src={uberLogo} alt="Uber Logo" className='w-14 mb-6' />
        <h2 className='text-3xl font-bold mb-1'>Welcome back, Captain</h2>
        <p className='text-sm text-gray-500 mb-6'>Login to manage your rides and earnings</p>

        {/* Captain login form */}
        <form onSubmit={submitHandler} className='max-w-md w-full mx-auto'>
          <h3 className='text-sm font-semibold text-gray-700 mb-2'>Email Address</h3>
          <input required
           type="email"
           placeholder='captain@example.com'
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black focus:bg-white transition' />

          <h3 className='text-sm font-semibold text-gray-700 mb-2'>Password</h3>
          <input required
           type="password"
           placeholder='Enter your password'
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-6 text-base outline-none focus:border-black focus:bg-white transition' />

          <button className='w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition'>Login as Captain</button>
        </form>

        {/* Link to captain signup for new captains */}
        <p className='text-center mt-4 text-sm text-gray-600'>New captain? <Link to="/captain-signup" className='text-black font-bold underline'>Create an account</Link></p>
      </div>

      {/* User login section at the bottom */}
      <div className='bg-gray-50 px-5 py-4 rounded-2xl shadow-inner'>
        <Link to="/login" className='w-full bg-orange-500 text-white py-3 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition'>🚗 Sign in as User</Link>
        <p className='text-center text-xs text-gray-400 mt-3'>Looking for a ride? Switch to user login.</p>
      </div>

    </div>
  )
}

export default CaptainLogin
