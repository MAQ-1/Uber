import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'
const LookingforDriver = (props) => {

    const simulateDriverFound = () => {
        props.setWaitingforDriver(true)
        props.seTvechileFound(false)
    }

  return (
        <div>
            {/* Dropdown Dismiss Icon */}
            <h5 onClick={() => {
                props.seTvechileFound(false)
            }} className='p-1 text-center w-[93%] absolute top-13 -right-50'>
                <img src={Downarrow} alt="Close Panel" loading="lazy" className='w-6 h-6  ' />
            </h5>
        
            {/* Main Heading */}
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>
        
            <div className='flex gap-2 justify-between flex-col items-center'>
                {/* Vehicle Preview Image */}
                <img onClick={simulateDriverFound} className='h-29 cursor-pointer active:scale-95 transition-transform' src={car} alt="Confirm Vehicle" loading="lazy" />
        
                {/* Ride Details Summary Area */}
                <div className='w-full mt-5'>
                
                {/* Pickup Address Section */}
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <img src={location} alt="Pickup Location" loading="lazy" />
                    <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Ahmedabad</p>
                    </div>
                </div>
        
                {/* Destination address */}
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <img src={location} alt="Destination Location" loading="lazy" />
                    <div>
                    <h3 className='text-lg font-medium'>Main Road-11/6</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Main city-110064, Ahmedabad</p>
                    </div>
                </div>
        
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
  )
}

export default LookingforDriver