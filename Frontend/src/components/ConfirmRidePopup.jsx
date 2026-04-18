import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import locationImg from '../assets/location.png'
import moneyImg from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'

const ConfirmRidePopup = (props) => {
    const [otp, setOtp] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePopupPanel(false)
            }}>
                
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 bg-yellow-400 rounded-lg mt-4'>
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
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>

                        <input
                         value={otp}
                         type="text"
                        onChange={
                            (e)=>{
                                setOtp(e.target.value)
                            }
                        } className='w-full p-3 border-2 rounded-lg mb-3' placeholder='Enter OTP' />

                        <Link to='/captain-riding' onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.setridePopupPanel(false)
                    }} className='flex justify-center bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Confirm</Link>

                    <button onClick={() => {
                        props.setridePopupPanel(false)
                        props.setConfirmRidePopupPanel(false)
                    }} className='mt-2 w-full bg-red-500 text-white font-semibold p-2 px-10 rounded-lg '>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup