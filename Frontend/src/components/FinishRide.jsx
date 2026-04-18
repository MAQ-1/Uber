import React from 'react'
import { Link } from 'react-router-dom'
import locationImg from '../assets/location.png'
import moneyImg from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'

const FinishRide = (props) => {
    return (
         <div>
                    <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                        props.setFinishRidePanel(false)
                    }}>
                    <img src={Downarrow} className='mx-auto pt-5' />
                    </h5>
                    <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
                    <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                        <div className='flex items-center gap-3 '>
                            <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqboo_LRufxKbdTBhRpbYUKzie6N1UeAb-Hw&s" alt="" />
                            <h2 className='text-lg font-medium'>Harsh Patidar</h2>
                        </div>
                        <h5 className='text-lg font-semibold'>2.2 KM</h5>
                    </div>
                    <div className='flex gap-2 justify-between flex-col items-center'>
                        <div className='w-full mt-5'>
                            <div className='flex items-center gap-5 p-3 border-b-2'>
                                <img className='h-8' src={locationImg} alt="" />
                                <div>
                                    <h3 className='text-lg font-medium'>562/11-A</h3>
                                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 p-3 border-b-2'>
                                <img className='h-8' src={locationImg} alt="" />
                                <div>
                                    <h3 className='text-lg font-medium'>562/11-A</h3>
                                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 p-3'>
                                <img className='h-8' src={moneyImg} alt="" />
                                <div>
                                    <h3 className='text-lg font-medium'>₹193.20 </h3>
                                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 w-full  '>
                            <Link to='/captain-home' onClick={() => {
                                // Logic for finishing ride
                            }} className='flex justify-center bg-green-600 w-full text-xl text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</Link>
        
                            <p className='pt-4 text-red-400 text-sm font-semibold mx-auto'> Click on the Complete Ride if You completed the Payment</p>
                        </div>
                    </div>
                </div>
    )
}

export default FinishRide
