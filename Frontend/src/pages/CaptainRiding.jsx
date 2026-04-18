import React from 'react'
import { Link } from 'react-router-dom'
import uberLogo from '../assets/Uber.png'
import HomeNavImg from '../assets/home.png'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide.jsx'
const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)


      useGSAP(function () {
      if (finishRidePanel) {
         gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)',
         })
      }


   }, [finishRidePanel])


  return (
       <div className='h-screen flex flex-col overflow-hidden relative'>
      {/* Header Section */}
      <div className='fixed p-6 top-0 flex items-center justify-between w-full z-10 pointer-events-none'>
        <img className='w-16 pointer-events-auto' src={uberLogo} alt="Uber Logo" />
        <Link to="/captain-home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full z-10 pointer-events-auto shadow-md'>
          <img className='h-6' src={HomeNavImg} alt="Home" />
        </Link>
      </div>

      {/* Map/Visual Section */}
      <div className='h-4/5 bg-gray-200'>
        <img
          className='w-full h-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Map"
        />
      </div>

      <div className='flex flex-col items-center justify-between  p-5 h-1/5 space-y-2 bg-amber-600'
      onClick={()=>{
        setfinishRidePanel(true)
      }}>
          <h4 className='text-xl font-semibold'>4-Km away </h4>
          <button className='bg-green-600 text-white font-semibold p-2 px-10 rounded-lg'>Start Ride</button>
      </div>

      <div ref={finishRidePanelRef} className= " z-10 h-4/5 translate-y-full bg-white fixed bottom-0 w-full px-3 pb-4 pt-5 space-y-4">
             <FinishRide
                setFinishRidePanel={setfinishRidePanel}
             />
           </div>

      


    </div> 
  )
}

export default CaptainRiding