import React from 'react'
import car from '../assets/car.webp'
import location from '../assets/location.png'
import money from '../assets/money.png'
import Downarrow from '../assets/arrow-down-double-fill.png'


function WaitingforDriver(props) {
  return (
     
     <div>
                {/* Dropdown Dismiss Icon */}
                <h5 onClick={() => {
                    props.setWaitingforDriver(false)
                }} className='p-1 text-center w-[93%] absolute top-13 left-53'>
                    <img src={Downarrow} alt="Close Panel" loading="lazy" className='w-6 h-6  ' />
                </h5>
            
                
               <div className="flex items-center justofy-between ">
                 <img className='h-29' src={car} alt="Confirm Vehicle" loading="lazy" />
                  <div className='text-right'>
                      <h2 className="text-lg font-semibold">Tanmay</h2>
                      <h4 className="text-md font-semibold">DL8005</h4>
                      <h4 className="text-md font-semibold text-gray-700">Maruti Suzuki Swift</h4>

                  </div>
               </div>


            
                <div className='flex gap-2 justify-between flex-col items-center'>
                    {/* Vehicle Preview Image */}
                    
            
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

export default WaitingforDriver