import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'
const ConfirmedRide = (props) => {
  const selectedFare = props.fares && props.vechile ? props.fares[props.vechile] : null

  return (
    <div>
      {/* Dropdown Dismiss Icon */}
      <h5 onClick={() => {
        props.setConfirmRidePanel(false)
      }} className='p-1 text-center w-[93%] absolute top-0'>
        <img src={Downarrow} alt="Close Panel" loading="lazy" className='w-6 h-6 mx-auto opacity-70 cursor-pointer' />
      </h5>

      {/* Main Heading */}
      <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        {/* Vehicle Preview Image */}
        <img className='h-29 drop-shadow-md' src={props.vechile === 'auto' ? "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" : props.vechile === 'moto' || props.vechile === 'motorcycle' ? "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" : "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"} alt="Confirm Vehicle" loading="lazy" />

        {/* Ride Details Summary Area */}
        <div className='w-full mt-5 bg-white rounded-xl shadow-[0_0px_10px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden'>
          
          {/* Pickup Address Section */}
          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-100'>
            <div className='flex-shrink-0'>
              <img className='h-9 w-9 object-contain bg-gray-100/80 p-2 rounded-full shadow-sm' src={location} alt="Pickup Location" loading="lazy" />
            </div>
            <div className='flex-1 overflow-hidden'>
              <p className='text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5 leading-none'>Pickup</p>
              <p className='text-lg -mt-1 font-medium text-gray-800 truncate'>{props.pickup || 'Loading...'}</p>
            </div>
          </div>

          {/* Destination address */}
          <div className='flex items-center gap-4 p-3 border-b-2 border-gray-100'>
            <div className='flex-shrink-0'>
              <img className='h-9 w-9 object-contain bg-gray-100/80 p-2 rounded-full shadow-sm' src={location} alt="Destination Location" loading="lazy" />
            </div>
            <div className='flex-1 overflow-hidden'>
              <p className='text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5 leading-none'>Drop-off</p>
              <p className='text-lg -mt-1 font-medium text-gray-800 truncate'>{props.destination || 'Loading...'}</p>
            </div>
          </div>

          {/* Fare and Payment Summary Section */}
          <div className='flex items-center gap-4 p-3'>
            <div className='flex-shrink-0'>
              <img className='h-9 w-9 object-contain bg-green-50 p-2 rounded-full shadow-sm' src={money} alt="Fare Details" loading="lazy" />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-medium text-green-700 leading-tight'>₹{selectedFare ?? '--'} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash / Online Payment</p>
            </div>
          </div>
        </div>

        {/* Final Confirmation Action */}
        <button
        onClick={()=>{
          props.seTvechileFound(true)
          props.setConfirmRidePanel(false)
          props.createRide() // Call createRide when confirming the ride
        }} 
        className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmedRide
