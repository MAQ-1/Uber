import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import {CaptainDataContext} from '../context/CaptainContext.jsx'
import { useContext } from 'react'


const CaptainDetails = (props) => {
  const {captain} = useContext(CaptainDataContext)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqboo_LRufxKbdTBhRpbYUKzie6N1UeAb-Hw&s" alt="Captain Avatar" />
          <h2 className='text-lg font-medium capitalize'>{captain?.Fullname?.Firstname} {captain?.Fullname?.Lastname}</h2>
        </div>
        <div className='text-right'>
          <h4 className='text-xl font-bold'>₹295.20</h4>
          <p className='text-xs text-gray-500 uppercase tracking-tight'>Earned Today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='flex p-3 mt-6 bg-gray-100 rounded-xl justify-between items-center gap-5'>
        <div className='text-center'>
          <img className='h-8 mx-auto mb-1' src={car} alt="Total Rides" />
          <h5 className='text-lg font-semibold'>10.2</h5>
          <p className='text-[10px] text-gray-600 uppercase'>Hours Online</p>
        </div>
        <div className='text-center'>
          <img className='h-8 mx-auto mb-1' src={location} alt="Total Distance" />
          <h5 className='text-lg font-semibold'>10.2</h5>
          <p className='text-[10px] text-gray-600 uppercase'>Hours Online</p>
        </div>
        <div className='text-center'>
          <img className='h-8 mx-auto mb-1' src={money} alt="Total Earnings" />
          <h5 className='text-lg font-semibold'>10.2</h5>
          <p className='text-[10px] text-gray-600 uppercase'>Hours Online</p>
        </div>

         
      </div>
      {/* <div className='flex justify-center mt-2'>
         <button
       onClick={()=>{
        props.setridePopupPanel(true)
       }}
       className='bg-green-500 text-white font-semibold p-2 px-10 rounded-lg'>
         Search
       </button>
      </div> */}
       
      
     
    </div>
  )
}

export default CaptainDetails