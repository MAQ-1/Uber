import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'


function WaitingforDriver(props) {
  console.log('[WaitingforDriver] props received:', props)
  console.log('[WaitingforDriver] ride data:', props.ride)
  
  return (
     
     <div>
        {/* Dropdown Dismiss Icon */}
        <h5 onClick={() => {
            props.setWaitingforDriver(false)
        }} className='p-1 text-center w-full absolute top-0 -mt-2 cursor-pointer'>
            <img src={Downarrow} alt="Close Panel" loading="lazy" className='w-6 h-6 mx-auto' />
        </h5>
    
        <div className="flex items-center justify-between mt-5">
            <img className='h-24 drop-shadow-md' src={props.vechile === 'auto' ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/58/c207b0-c12d-47be-a739-d7ee8139d33b/original/UberAuto_v1.png" : props.vechile === 'moto' || props.vechile === 'motorcycle' ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8600796f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" : "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"} alt="Confirm Vehicle" loading="lazy" />
            <div className='text-right'>
                <p className="text-sm text-gray-500 font-medium -mb-1">Captain</p>
                <h2 className="text-lg font-semibold capitalize">{props.ride?.captain?.name || 'Driver'}</h2>
                <h4 className="text-sm font-bold bg-yellow-300 px-2 py-0.5 rounded-sm inline-block mt-0.5">{props.ride?.captain?.vehicle?.plate || 'N/A'}</h4>
                <h4 className="text-sm font-medium text-gray-700 mt-0.5">{props.ride?.captain?.vehicle?.color} {props.ride?.captain?.vehicle?.vehicleType}</h4>
                <h1 className="text-lg font-semibold mt-1 text-green-700">{props.ride?.otp}</h1>
            </div>
        </div>
    
        <div className='flex gap-2 justify-between flex-col items-center mt-2'>
            <div className='w-full'>
            
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <img src={location} alt="Pickup Location" loading="lazy" />
                <div>
                <p className='text-xs text-gray-800 font-medium'>Pickup</p>
                <p className='text-sm -mt-0.5 text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>
    
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <img src={location} alt="Destination Location" loading="lazy" />
                <div>
                <p className='text-xs text-gray-800 font-medium'>Dropoff</p>
                <p className='text-sm -mt-0.5 text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>
    
            <div className='flex items-center gap-5 p-3'>
                <img src={money} alt="Fare Details" loading="lazy" />
                <div>
                <h3 className='text-lg font-medium'>₹{props.ride?.fare ?? '--'}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash / Online payment</p>
                </div>
            </div>
            </div>
        </div>
     </div>
  )
}

export default WaitingforDriver