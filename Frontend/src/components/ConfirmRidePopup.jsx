import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import locationImg from '../assets/location.png'
import moneyImg from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'

const ConfirmRidePopup = (props) => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [otpValidated, setOtpValidated] = useState(false)
    const [startedRide, setStartedRide] = useState(null)
    const [isValidating, setIsValidating] = useState(false)
    const [validationError, setValidationError] = useState('')
    
    console.log('[ConfirmRidePopup] props received:', props)
    console.log('[ConfirmRidePopup] ride data:', props.ride)

    const baseURL = import.meta.env.VITE_BASE_URL
    const token = localStorage.getItem('token')

    const validateOtp = async (e) => {
        e.preventDefault()
        const rideId = props.ride?.rideId || props.ride?._id
        
        if (!otp || otp.trim().length === 0) {
            setValidationError('Please enter OTP')
            return
        }

        if (!rideId) {
            setValidationError('Ride ID missing. Please accept ride again.')
            return
        }

        setIsValidating(true)
        setValidationError('')
        
        try {
            console.log('[ConfirmRidePopup] Validating OTP for rideId:', rideId)
            const response = await axios.get(
                `${baseURL}/rides/start-ride`,
                {
                    params: {
                        rideId,
                        otp: otp.trim()
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            console.log('[ConfirmRidePopup] OTP validated successfully:', response.data)
            setStartedRide(response?.data?.ride || null)
            setOtpValidated(true)
        } catch (error) {
            console.error('[ConfirmRidePopup] OTP validation error:', error)
            const errorMsg = error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.message || error?.message || 'Invalid OTP'
            console.log('[ConfirmRidePopup] Error details:', errorMsg)
            setValidationError(errorMsg)
            setOtpValidated(false)
        } finally {
            setIsValidating(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    const handleConfirmRide = () => {
        if (!otpValidated) {
            setValidationError('Please validate OTP first')
            return
        }

        props.setConfirmRidePopupPanel(false)
        props.setridePopupPanel(false)
        localStorage.setItem('activeCaptainRideData', JSON.stringify(startedRide || props.ride || null))
        navigate('/captain-riding', {
            state: {
                ride: startedRide || props.ride
            }
        })
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
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqboo_LRufxKbdTBhRpbYUKzie6N1UeAb-Hw&s" alt="User Profile" />
                    <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.ride?.distance || 'N/A'} KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <img className='h-8' src={locationImg} alt="Pickup Location" />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <img className='h-8' src={locationImg} alt="Destination Location" />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <img className='h-8' src={moneyImg} alt="Fare" />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-5 w-full'>
                    <form onSubmit={submitHandler}>
                        <input
                            value={otp}
                            type="text"
                            onChange={(e) => {
                                setOtp(e.target.value)
                                setValidationError('')
                            }}
                            disabled={otpValidated}
                            className='w-full p-3 border-2 rounded-lg mb-3 disabled:bg-gray-100'
                            placeholder='Enter OTP'
                        />
                        
                        {validationError && (
                            <p className='text-red-500 text-sm mb-3'>{validationError}</p>
                        )}
                        
                        {!otpValidated ? (
                            <button
                                onClick={validateOtp}
                                disabled={isValidating || !otp}
                                className='flex justify-center bg-blue-600 w-full text-white font-semibold p-2 px-10 rounded-lg mb-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            >
                                {isValidating ? 'Validating...' : 'Validate OTP'}
                            </button>
                        ) : (
                            <button
                                type='button'
                                onClick={handleConfirmRide}
                                className='w-full bg-green-600 text-white font-semibold p-2 px-10 rounded-lg mb-2'
                            >
                                Confirm Ride
                            </button>
                        )}

                        <button
                            onClick={() => {
                                props.setridePopupPanel(false)
                                props.setConfirmRidePopupPanel(false)
                            }}
                            className='mt-2 w-full bg-red-500 text-white font-semibold p-2 px-10 rounded-lg'
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup