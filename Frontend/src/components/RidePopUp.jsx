import React from 'react'

import location from '../assets/location.png'
import money from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setridePopupPanel(false)
            }}>
                <img className='w-6 mx-auto rotate-180' src={Downarrow} alt="" />
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-xl mt-4 shadow-sm'>
                <div className='flex items-center gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqboo_LRufxKbdTBhRpbYUKzie6N1UeAb-Hw&s" alt="User Profile" />
                    <div>
                        <h2 className='text-lg font-medium text-gray-800'>{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}</h2>
                        <p className='text-sm text-gray-700 font-semibold'>★ 4.9</p>
                    </div>
                </div>
                <div className='text-right'>
                    <h5 className='text-xl font-bold text-gray-800'>2.2 KM</h5>
                    <p className='text-xs text-gray-700 font-semibold'>away</p>
                </div>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-4 bg-white rounded-xl'>
                    <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
                        <div className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0'>
                            <img className='h-5' src={location} alt="Pickup" />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-500 font-medium tracking-wide uppercase'>Pickup</p>
                            <h3 className='text-base font-medium text-gray-800 line-clamp-2 leading-tight'>{props.ride?.pickup}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
                        <div className='h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0'>
                            <img className='h-5' src={location} alt="Destination" />
                        </div>
                        <div className='flex-1'>
                            <p className='text-xs text-gray-500 font-medium tracking-wide uppercase'>Drop-off</p>
                            <h3 className='text-base font-medium text-gray-800 line-clamp-2 leading-tight'>{props.ride?.destination}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-3'>
                        <div className='h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
                            <img className='h-5' src={money} alt="Fare" />
                        </div>
                        <div>
                            <p className='text-xs text-gray-500 font-medium tracking-wide uppercase'>Estimated Fare</p>
                            <div className='flex items-baseline gap-1'>
                                <h3 className='text-xl font-bold text-gray-800'>₹{props.ride?.fare} </h3>
                                <p className='text-sm text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded-md'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full flex items-center gap-3'>
                    <button onClick={() => {
                        props.setridePopupPanel(false)
                        props.confirmRide()
                    }} className='w-1/2 bg-gray-200 text-gray-700 font-semibold p-3 rounded-xl hover:bg-gray-300 transition-colors'>Ignore</button>
                    
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.setridePopupPanel(false)
                    }} className='w-1/2 bg-green-600 text-white font-semibold p-3 rounded-xl hover:bg-green-700 transition-colors'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp