import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// User signup page — allows new users to create an account
const UserSignup = () => {
  // State for each form field
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // State to store submitted user data
  const [userdata, setUserdata] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    // Build data object matching backend Fullname structure
    const data = {
      Fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
    }

    setUserdata(data)
    console.log(data)

    // Reset form fields after submission
    setfirstname('')
    setlastname('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex flex-col justify-between px-7 py-10'>

      <div>
        {/* Uber logo */}
        <img src='../src/assets/Uber.png' alt="Uber Logo" className='w-14 mb-6' />
        <h2 className='text-3xl font-bold mb-1'>Create Account</h2>
        <p className='text-sm text-gray-500 mb-6'>Sign up to get started with Uber</p>

        {/* Registration form */}
        <form onSubmit={submitHandler} className='max-w-md w-full mx-auto'>

          {/* First and last name side by side */}
          <h3 className='text-sm font-bold text-gray-700 mb-2'>Full Name</h3>
          <div className='flex gap-3 mb-5'>
            <input required
              type="text"
              placeholder='First name'
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              className='w-1/2 border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-base outline-none focus:border-black focus:bg-white transition' />
            {/* Lastname is optional */}
            <input
              type="text"
              placeholder='Last name'
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              className='w-1/2 border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-base outline-none focus:border-black focus:bg-white transition' />
          </div>

          <h3 className='text-sm font-bold text-gray-700 mb-2'>Email Address</h3>
          <input required
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black focus:bg-white transition' />

          {/* Minimum 6 characters required by backend */}
          <h3 className='text-sm font-bold text-gray-700 mb-2'>Password</h3>
          <input required
            type="password"
            placeholder='Min. 6 characters'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-6 text-base outline-none focus:border-black focus:bg-white transition' />

          <button className='w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition'>Create Account</button>
        </form>

        {/* Link to login for existing users */}
        <p className='text-center mt-4 text-sm text-gray-600'>Already have an account? <Link to="/login" className='text-black font-bold underline'>Login</Link></p>
      </div>

      {/* Privacy policy notice at the bottom */}
      <div className='bg-gray-50 px-5 py-4 rounded-2xl shadow-inner'>
        <p className='text-xs text-gray-500 text-center leading-relaxed'>By creating an account, you agree to our <span className='underline font-medium text-gray-700'>Terms of Service</span> and <span className='underline font-medium text-gray-700'>Privacy Policy</span>. We may send you ride updates and account notifications via email or SMS.</p>
      </div>

    </div>
  )
}

export default UserSignup
