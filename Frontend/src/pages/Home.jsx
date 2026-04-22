import React, { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import uberLogo from '../assets/Uber.png'
import downarrow from '../assets/arrow-down-double-fill.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import VehiclePanel from '../components/VehiclePanel.jsx'
import ConfirmedRide from '../components/ConfirmedRide.jsx'
import 'remixicon/fonts/remixicon.css'
import { LocationSearchPanel } from '../components/LocationSearchPanel.jsx'
import LookingforDriver from '../components/LookingforDriver.jsx'
import WaitingforDriver from '../components/WaitingforDriver.jsx'
import { SocketDataContext } from '../context/SocketContext.jsx'
import { UserdataContext } from '../context/UserContext.jsx'
import LiveTracking from '../components/LiveTracking.jsx'
import { Link } from 'react-router-dom'
import HomeIcon from '../assets/home.png'

const Home = () => {
   console.log('[Home] component mounted')
   const navigate = useNavigate()
   
   const[pickup, setpickup]=useState('')
   const[destination, setdestination]=useState('')
   const [panel, setpanel] = useState(false)
   const [activeInput, setActiveInput] = useState(null) // Track which input is active
   const panelRef = useRef(null)
   const vechileFoundRef = useRef(null)
   const panelClose = useRef(null)
   const vehiclePanelRef = useRef(null)
   const waitingforDriverRef = useRef(null)
   const confirmRidePanelRef = useRef(null)
   const[vehiclePanel, setvehiclePanel] = useState(false)
   const [confirmRidePanel, setConfirmRidePanel] = useState(false)
   const [vechileFound, seTvechileFound] = useState(false)
   const [waitingforDriver, setWaitingforDriver] = useState(false)
   const [fares, setFares] = useState(null)
   const [faresLoading, setFaresLoading] = useState(false)
   const [faresError, setFaresError] = useState(null)
   const [vechile, setvechile] = useState(null)
   const [ride, setRide] = useState(null)



   const { sendMessage, onMessage, isConnected } = useContext(SocketDataContext)
   const { user } = useContext(UserdataContext)
  


   const token = localStorage.getItem('token')
   const baseURL = import.meta.env.VITE_BASE_URL
   
   // socket usage
    useEffect(() => {
       console.log('[Home] socket useEffect triggered')
       const userId = user?._id || user?.id || null
       console.log('[Home] socket effect:', { isConnected, userId, userExists: !!user })

       if (!isConnected || !userId) {
          console.log('[Home] socket waiting:', { isConnected, userId })
          return
       }

       console.log('[Home] socket joining with userId:', userId)
       const sent = sendMessage('join', { userType: 'user', userId })
       console.log('[Home] socket join sent:', { userId, sent })

       const unsubscribe = onMessage('ride-confirmed', (payload) => {
          console.log('[Home] ride-confirmed received:', payload)
          console.log('[Home] payload structure:', JSON.stringify(payload, null, 2))
          console.log('[Home] setting vechileFound to false and waitingforDriver to true')
          seTvechileFound(false)
          setWaitingforDriver(true)
          setRide(payload)
       })

       const unsubscribeRideStarted = onMessage('ride-started', (payload) => {
          console.log('[Home] ride-started received:', payload)
          console.log('[Home] ride has started, navigating to /riding')
          setRide(payload)
          localStorage.setItem('activeRideData', JSON.stringify(payload))
          
          // Navigate to riding page after a short delay to ensure data is set
          setTimeout(() => {
             navigate('/riding', { state: { rideData: payload } })
          }, 500)
       })
        

        
       
       return () => {
          console.log('[Home] socket listener cleanup: ride-confirmed and ride-started')
          unsubscribe()
          unsubscribeRideStarted()
       }
   }, [isConnected, user])
   


   const submithandler = async (e) => {
    e.preventDefault()
   }

    const fetchFares = async () => {
      if (!pickup || pickup.length < 3 || !destination || destination.length < 3) {
         return
      }

     
      if (!token || !baseURL) {
         return
      }

      setFaresLoading(true)
      setFaresError(null)

      try {
         const response = await axios.get(`${baseURL}/rides/get-fares`, {
            params: {
               pickup,
               destination
            },
            headers: {
               Authorization: `Bearer ${token}`
            }
         })

         setFares(response.data?.fares || null)
      } catch (error) {
         setFares(null)
         setFaresError(error?.response?.data?.message || error.message)
      } finally {
         setFaresLoading(false)
      }
    }


   //  create ride


   async function createRide() {
    if (!vechile) {
       return null
    }

    console.log('Creating ride with token:', token ? 'Token exists' : 'No token')
    console.log('User context:', user)
    
    if (!token) {
       console.error('No authentication token found')
       return null
    }

    const response=  await axios.post(`${baseURL}/rides/create`, {
         pickup,
         destination,
         vehicleType: vechile
      }, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      console.log('Ride created:', response.data)
      return response.data
   }
   
   
   // Handle location selection from suggestions
   const handleSelectLocation = (location) => {
     if (activeInput === 'pickup') {
       setpickup(location.main_text)
     } else if (activeInput === 'destination') {
       setdestination(location.main_text)
     }
     setActiveInput(null)
   }

   useGSAP(function(){
    if(panel){
        gsap.to(panelRef.current,{
      height: '70%',
      padding: 24
    })
        gsap.to(panelClose.current,{
      opacity: 1
    })
    } else{
      gsap.to(panelRef.current,{
        height: 0,
        padding: 0
      })
        gsap.to(panelClose.current,{
         opacity: 0
    })
    }
  
   },[panel])

   // vehicle selection panel
   useGSAP(function () {
      if (vehiclePanel) {
         gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [vehiclePanel])
  
  // ride confirmation panel
      useGSAP(function () {
      if (confirmRidePanel) {
         gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(confirmRidePanelRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [confirmRidePanel])
  
  //  Looking for driver
  useGSAP(function () {
      if (vechileFound) {
         gsap.to(vechileFoundRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(vechileFoundRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [vechileFound])

  //  waiting for driver 
  useGSAP(function () {
      if (waitingforDriver) {
         gsap.to(waitingforDriverRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(waitingforDriverRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [waitingforDriver])


  return (
    <div className='h-screen w-screen relative overflow-hidden'>
         <div className='z-10 flex flex-col pointer-events-none'>
           <img src={uberLogo} alt="Uber Logo" className='w-16 left-5 top-5 absolute z-50 pointer-events-auto' /> 
           <Link to="/home" className='left-5 top-20 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full z-50 shadow-md cursor-pointer pointer-events-auto'>
            <img className='h-6 w-6' src={HomeIcon} alt="Home" />
          </Link>
         </div>

           <div className='h-screen w-screen z-0 absolute top-0 left-0'> 
            {/* Temp Image Useage */}
              <LiveTracking onClick={() => {
                setvehiclePanel(false)
                setpanel(true)
                setconfirmRidePanel(false)
              }} className='h-full w-full object-fill absolute'   />
           </div>

           <div className={`flex flex-col justify-end h-screen absolute bottom-0 w-full`}>
                <div className='h-[30%] p-6 bg-white relative '>
                    <h5 ref={panelClose} onClick={() => {
                        setpanel(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <img src={downarrow} alt="Close Panel" className='w-6' />
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submithandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-[50%] left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setpanel(true)
                                setActiveInput('pickup')
                            }}
                            value={pickup}
                            onChange={(e) => {
                                setpickup(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                            type="text"
                            placeholder='Add a pick-up location' />
                        <input
                            onClick={() => {
                                setpanel(true)
                                setActiveInput('destination')
                            }}
                            value={destination}
                            onChange={(e) => {
                                setdestination(e.target.value)
                            }}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                  <button
                     onClick={async () => {
                        setvehiclePanel(true)
                        setpanel(false)
                        await fetchFares()
                     }}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3  w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0 '>
                    <LocationSearchPanel
                        setPanelOpen={setpanel}
                        setVehiclePanel={setvehiclePanel}
                        inputValue={activeInput === 'pickup' ? pickup : activeInput === 'destination' ? destination : ''}
                        onSelectLocation={handleSelectLocation}
                    />
                </div>
            </div>

           {/* Pickign vehicle */}
            <div ref={vehiclePanelRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-10 pt-12">
              <VehiclePanel 
              setvechile={setvechile}
              setConfirmRidePanel={setConfirmRidePanel}
               setvehiclePanel={setvehiclePanel}
               fares={fares}
               faresLoading={faresLoading}
               faresError={faresError}
              />
                
           </div>

           {/* Selected Ride */}
            <div ref={confirmRidePanelRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

              <ConfirmedRide 
                pickup={pickup}
                destination={destination}
                setConfirmRidePanel={setConfirmRidePanel}
                seTvechileFound={seTvechileFound}
                createRide={createRide}
                fares={fares}
                vechile={vechile}
              />
                
           </div>

           {/* Looking for Driver to pickup  */}
            <div ref={vechileFoundRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

              <LookingforDriver 
              pickup={pickup}
              destination={destination}
              fares={fares}
             vechile={vechile}
              setConfirmRidePanel={setConfirmRidePanel}
              seTvechileFound={seTvechileFound}
              setWaitingforDriver={setWaitingforDriver}
              />
                
           </div>

           {/* Waiting for a driver  */}
            <div ref={waitingforDriverRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

                <WaitingforDriver 
                  ride={ride}
                  seTvechileFound={seTvechileFound}
                  setWaitingforDriver={setWaitingforDriver}
                 waitingforDriver={waitingforDriver}
                />
                
           </div>
    </div>
  )
}

export default Home
