import { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
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

  const updateCaptain = (captainData) => {
    setCaptain(captainData)
  }

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
