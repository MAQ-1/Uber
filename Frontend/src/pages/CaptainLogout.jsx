import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext.jsx'

const CaptainLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        setCaptain({
          email: '',
          Fullname: {
            Firstname: '',
            Lastname: ''
          },
          vehicle: {
            color: '',
            plate: '',
            capacity: 0,
            vehicleType: ''
          }
        })
        navigate('/captain-login')
      }
    }).catch((error) => {
      console.error(error)
      localStorage.removeItem('token')
      navigate('/captain-login')
    })
  }, [token, navigate, setCaptain])

  return <div>CaptainLogout</div>
}

export default CaptainLogout
