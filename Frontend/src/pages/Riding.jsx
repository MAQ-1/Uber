import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import Home from '../assets/home.png'
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className='h-screen overflow-hidden flex flex-col'>

        <div className='mt-3  right-2 fixed h-8 w-10 bg-white flex item-center justify-center rounded-full z-10'>
            
            <Link to="login"> 
            <img src={Home} alt="Home" />
            </Link>

        </div>
      <div className='h-1/2 relative bg-gray-200'>
        <img
          className='w-full h-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber Home"
        />
      </div>

      <div className='h-1/2 p-2 flex flex-col justify-between overflow-y-auto'>
        <div>
          <div className="flex items-center justify-between">
            <img className='h-20' src={car} alt="Confirm Vehicle" loading="lazy" />
            <div className='text-right'>
              <h2 className="text-lg font-semibold -mb-1">Tanmay</h2>
              <h4 className="text-xl font-bold -mb-1">DL8005</h4>
              <h4 className="text-sm text-gray-600">Maruti Suzuki Swift</h4>
            </div>
          </div>

          <div className='flex gap-2 flex-col items-center mt-5'>
            <div className='w-full'>
              {/* Pickup Address Section */}
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <img src={location} alt="Pickup Location" loading="lazy" />
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                </div>
              </div>

              {/* Destination address */}
              {/* <div className='flex items-center gap-5 p-3 border-b-2'>
                <img src={location} alt="Destination Location" loading="lazy" />
                <div>
                  <h3 className='text-lg font-medium'>Main Road-11/6</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Main city-110064, Ahmedabad</p>
                </div>
              </div> */}

              {/* Fare and Payment Summary Section */}
              <div className='flex items-center gap-5 p-3'>
                <img src={money} alt="Fare Details" loading="lazy" />
                <div>
                  <h3 className='text-lg font-medium'>₹193.20 </h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding