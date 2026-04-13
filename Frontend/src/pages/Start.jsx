import React from 'react'
import { Link } from 'react-router-dom'
import uberLogo from '../assets/Uber.png'

// Landing page — shown when user first opens the app
const Start = () => {
  return (
    <div className='overflow-hidden'>
          {/* Full screen hero section with background image */}
          <div className='h-screen w-full flex justify-between flex-col bg-[length:175%_100%] bg-top bg-no-repeat' style={{backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/c5310f182519763.652f3606b64b0.jpg')"}}>
               
               {/* Uber logo at the top */}
               <img src={uberLogo} alt="Uber Logo" className='w-20 mt-5 ml-5' />

               {/* Bottom card with CTA button */}
                <div className='bg-white px-5 py-6 w-full rounded-t-2xl shadow-lg'>
                      <h2 className='text-2xl font-bold mb-1'>Get Started With Uber</h2>
                      <p className='text-sm text-gray-500 mb-3'>Book rides, deliveries and more</p>
                      {/* Navigates to user login page */}
                      <Link to="/login" className='w-full bg-black text-white py-3 mt-1 rounded-xl text-lg font-semibold flex items-center justify-between px-4'>Continue
                        <span className='text-xl'>→</span>
                      </Link>
                </div>
          </div>
    </div>
  )
}

export default Start
