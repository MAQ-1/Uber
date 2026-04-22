import React from 'react'
import { Link } from 'react-router-dom'
import locationImg from '../assets/location.png'
import moneyImg from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate=useNavigate()

   async function endride() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride?._id || props.ride?.rideId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        
        if (response.status === 200) {
            props.setFinishRidePanel(false)
            navigate('/captain-home')
        }
    } catch (error) {
        console.error("Error ending ride:", error)
    }
   }








    return (
        <div className='flex flex-col h-full'>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}>
                <img src={Downarrow} className='mx-auto pt-5 cursor-pointer' alt="Close" />
            </h5>
            <h3 className='text-2xl font-bold mb-3 mt-4 text-gray-800'>Finish this Ride</h3>
            
            <div className='flex items-center justify-between p-4 bg-yellow-400 rounded-xl mt-2 shadow-sm'>
                <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm'>
                        <img className='h-full w-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqboo_LRufxKbdTBhRpbYUKzie6N1UeAb-Hw&s" alt="Passenger" />
                    </div>
                    <h2 className='text-lg font-bold text-gray-800'>{props.passengerName}</h2>
                </div>
                <h5 className='text-lg font-bold text-gray-800'>{props.distanceText}</h5>
            </div>
            
            <div className='flex flex-col grow justify-between'>
                <div className='w-full mt-4 bg-white rounded-xl shadow-sm border border-gray-100'>
                    <div className='flex items-center gap-5 p-4 border-b border-gray-100'>
                        <img className='h-6 opacity-80' src={locationImg} alt="Pickup" />
                        <div>
                            <p className='text-sm font-medium text-gray-700 leading-tight'>{props.pickupText}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-4 border-b border-gray-100'>
                        <img className='h-6 opacity-80' src={locationImg} alt="Destination" />
                        <div>
                            <p className='text-sm font-medium text-gray-700 leading-tight'>{props.destinationText}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-4'>
                        <img className='h-6 opacity-80' src={moneyImg} alt="Fare" />
                        <div>
                            <h3 className='text-xl font-bold text-gray-800'>₹{props.ride?.fare}</h3>
                            <p className='text-xs font-medium text-gray-500 mt-1'>Cash / Online Payment</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-6 w-full pb-2'>
                    <button onClick={endride}
                     className='flex justify-center bg-green-600 hover:bg-green-700 transition-colors w-full text-lg text-white font-bold p-3 rounded-xl shadow-md'>
                        Complete Ride
                    </button>
                    <p className='pt-3 text-red-500 text-xs font-medium text-center uppercase tracking-wide'>
                        Confirm payment before completing
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide
