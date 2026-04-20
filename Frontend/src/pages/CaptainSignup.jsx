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
    <div className='py-5 px-5 flex flex-col justify-between min-h-screen'>
      <div>
        <img className='w-16 mb-4' src={uberLogo} alt="Uber Logo" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              type="text"
              placeholder='First name'
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              type="text"
              placeholder='Last name'
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value)
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base focus:border-black outline-none transition'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base focus:border-black outline-none transition'
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base focus:border-black outline-none transition'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg hover:bg-gray-800 transition active:scale-[0.98]'
          >
            Create Captain Account
          </button>
        </form>

        <p className='text-center text-sm mb-4'>
          Already have an account? <Link to='/captain-login' className='text-blue-600 font-semibold'>Login here</Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] leading-tight text-gray-500 text-center mb-4'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
