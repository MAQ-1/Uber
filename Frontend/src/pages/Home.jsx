import React, { useState, useRef } from 'react'
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


const Home = () => {
   
   const[pickup, setpickup]=useState('')
   const[destination, setdestination]=useState('')
   const [panel, setpanel] = useState(false)
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

   const submithandler =async (e)=>{
    e.preventDefault()
   }
   
   useGSAP(function(){
    if(panel){
        gsap.to(panelRef.current,{
      height: '70vh'
    })
        gsap.to(panelClose.current,{
      opacity: 1
    })
    } else{
      gsap.to(panelRef.current,{
        height: 0
      })
        gsap.to(panelClose.current,{
      
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
           <img src={uberLogo} alt="Uber Logo" className='w-14  absolute' /> 

           <div className='h-screen w-screen'> 
            {/* Temp Image Useage */}
              <img onClick={()=>{
                setvehiclePanel(false)
              }} className='h-full w-full object-fill absolute' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Uber Home"  />
           </div>

           <div className="bg-white absolute bottom-0 w-full p-3">
              {/* Location and Destination Inputs */}
                <div className="bg-white relative"> 
                     
                <h4 className=" text-3xl font-semibold mt-5">Find trip </h4>

                   <h5 
                    ref={panelClose} 
                    onClick={() => { setpanel(false) }} 
                    className='absolute opacity-0 top-2 left-30 text-2xl cursor-pointer '
                    >
                         <img src={downarrow} alt="Close Panel" className='w-6' />
                  </h5>

                  <form className="mt-5 space-y-4"  onSubmit={(e)=>{
                    submithandler(e)
                  }}>
                       <div className=" line absolute h-18 w-1 top-[47%] bg-gray-700 ml-4 rounded-full"></div>
                      <input
                       onClick={()=>{
                        setpanel(true)
                       }}
                       value={pickup}
                       onChange={(e)=>{
                        setpickup(e.target.value)
                       }}
                       className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full mt-5 " 
                        type="text"
                         placeholder='Add a Pick-up Location' />
                      <input
                       value={destination}
                       onChange={(e)=>{
                        setdestination(e.target.value)
                       }}
                       className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full"
                        type="text"
                         placeholder="Enter the Destination" />
                  </form>
                </div>

              {/* Ride Options */}

                <div ref={panelRef} className=" bg-white relative w-full overflow-hidden h-0 pb-2">

                  <LocationSearchPanel 
                  setpanel={setpanel}
                  setvehiclePanel={setvehiclePanel}
                  />
                
                </div>
           </div>

           {/* Pickign vehicle */}
           <div ref={vehiclePanelRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

              <VehiclePanel 
              setConfirmRidePanel={setConfirmRidePanel}
                setvehiclePanel={setvehiclePanel}
              />
                
           </div>

           {/* Selected Ride */}
            <div ref={confirmRidePanelRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

              <ConfirmedRide 
                setConfirmRidePanel={setConfirmRidePanel}
                seTvechileFound={seTvechileFound}
              />
                
           </div>

           {/* Looking for Driver to pickup  */}
            <div ref={vechileFoundRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

              <LookingforDriver 
              setConfirmRidePanel={setConfirmRidePanel}
              seTvechileFound={seTvechileFound}
              setWaitingforDriver={setWaitingforDriver}
              />
                
           </div>

           {/* Waiting for a driver  */}
            <div ref={waitingforDriverRef} className="z-10 translate-y-full bg-white fixed bottom-0 w-full px-3 py-6 pt-12 space-y-4">

                <WaitingforDriver 
                 setWaitingforDriver={setWaitingforDriver}
                />
                
           </div>
    </div>
  )
}

export default Home