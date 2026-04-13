import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import uberLogo from '../assets/Uber.png'

// Captain signup page — allows new captains to create an account
const CaptainSignup = () => {
  // State for each form field
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('car')
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      Fullname: {
        Firstname: firstname,
        Lastname: lastname
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      )

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        console.log('Captain signup successful')
        localStorage.setItem('token', data.token);
        navigate('/captain-login')
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
    setfirstname('')
    setlastname('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('car')
  }

  return (
    <div className='h-screen flex flex-col justify-between px-7 py-10'>

      <div>
        {/* Uber logo */}
        <img src={uberLogo} alt="Uber Logo" className='w-14 mb-6' />
        <h2 className='text-3xl font-bold mb-1'>Register as Captain</h2>
        <p className='text-sm text-gray-500 mb-6'>Start earning by driving with Uber</p>

        {/* Captain registration form */}
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

          <h3 className='text-sm font-bold text-gray-700 mb-2'>Vehicle Color</h3>
          <input required
            type="text"
            placeholder='e.g. White'
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black focus:bg-white transition' />

          <h3 className='text-sm font-bold text-gray-700 mb-2'>Vehicle Plate</h3>
          <input required
            type="text"
            placeholder='e.g. MH12AB1234'
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black focus:bg-white transition' />

          <h3 className='text-sm font-bold text-gray-700 mb-2'>Vehicle Capacity</h3>
          <input required
            type="number"
            min="1"
            placeholder='e.g. 4'
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-base outline-none focus:border-black focus:bg-white transition' />

          <h3 className='text-sm font-bold text-gray-700 mb-2'>Vehicle Type</h3>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 mb-6 text-base outline-none focus:border-black focus:bg-white transition'
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
          </select>

          <button className='w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition'>Create Account</button>
        </form>

        {/* Link to captain login for existing captains */}
        <p className='text-center mt-4 text-sm text-gray-600'>Already have an account? <Link to="/captain-login" className='text-black font-bold underline'>Login</Link></p>
      </div>

      {/* Privacy policy notice at the bottom */}
      <div className='bg-gray-50 px-5 py-4 rounded-2xl shadow-inner'>
        <p className='text-xs text-gray-500 text-center leading-relaxed'>By creating an account, you agree to our <span className='underline font-medium text-gray-700'>Terms of Service</span> and <span className='underline font-medium text-gray-700'>Privacy Policy</span>. We may send you ride updates and account notifications via email or SMS.</p>
      </div>

    </div>
  )
}

export default CaptainSignup
