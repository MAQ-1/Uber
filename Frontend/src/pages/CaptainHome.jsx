import React, { useState, useRef } from 'react'
import { Link } from "react-router-dom";
import uberLogo from '../assets/Uber.png'
import Home from '../assets/home.png'
import CaptainDetails from '../components/CaptainDetails.jsx'
import RidePopUp from '../components/RidePopUp.jsx'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup.jsx'



const CaptainHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePopupRef = useRef(null)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)


  // Pop up panel animation
    useGSAP(function () {
      if (ridePopupPanel) {
         gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [ridePopupPanel])
 

  //  confirm ride popup animation
       useGSAP(function () {
      if (ConfirmRidePopupPanel) {
         gsap.to(ConfirmRidePopupRef.current, {
            transform: 'translateY(0)',
         })
      } else {
         gsap.to(ConfirmRidePopupRef.current, {
            transform: 'translateY(100%)',
         })
      }

   }, [ConfirmRidePopupPanel])

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      {/* Header Section */}
      <div className='fixed p-6 top-0 flex items-center justify-between w-full z-10 pointer-events-none'>
        <img className='w-16 pointer-events-auto' src={uberLogo} alt="Uber Logo" />
        <Link to="/captain-login" className='h-10 w-10 bg-white flex items-center justify-center rounded-full z-10 pointer-events-auto shadow-md'>
          <img className='h-6' src={Home} alt="Home" />
        </Link>
      </div>

      {/* Map/Visual Section */}
      <div className='h-3/5 bg-gray-200'>
        <img
          className='w-full h-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Map"
        />
      </div>

      {/* Captain Info & Stats Section */}
      <div className='h-2/5 p-6 flex flex-col bg-white'>
        <CaptainDetails 
        setridePopupPanel={setridePopupPanel} />
      </div> 

    {/* Ride Popup Panel */}
       <div ref={ridePopupPanelRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 pb-4 pt-5 space-y-4">

                <RidePopUp 
                setridePopupPanel={setridePopupPanel}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                />
                
           </div>

           {/* Confirm ride panel  */}

           <div ref={ConfirmRidePopupRef} className= " z-10 h-screen translate-y-full bg-white fixed bottom-0 w-full px-3 pb-4 pt-5 space-y-4">
             <ConfirmRidePopup
             setConfirmRidePopupPanel={setConfirmRidePopupPanel}
             setridePopupPanel={setridePopupPanel}
             />
           </div>
    </div> 
  )
}

export default CaptainHome