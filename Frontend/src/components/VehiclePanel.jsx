
import React from 'react'
import car from '../assets/car.webp'
import user from '../assets/user.png'
const VehiclePanel = (props) => {
  return (
    <div className='space-y-4 '>
                  <h2 className='text-2xl font-semibold my-2'> Choose a vehicle</h2>
                  {/* Vechile */}
                <div  onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setvehiclePanel(false)
                }}
                className="flex border-2 hover:active:border-black rounded-xl w-full p-3 items-center justify-between">
                      <img src={car} alt="Vehicle" className="h-10" loading="lazy"/>
                      <div className="ml-2 w-1/2 gap-1"> 
                         <h4 className="font-medium text-base">Uber Go <span><img src={user} alt="User" className="w-4 h-4 inline-block" />4</span></h4>
                         <h5 className="font-medium text-sm">2 mins away</h5>
                         <p className="font-normal text-xs text-gray-600" >Affordable, compact rides</p>
                      </div>
                      <h2 className="text-lg font-semibold">$199.20</h2>
                </div>

                <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setvehiclePanel(false)
                }} 
                 className="flex border-2 hover:active:border-black rounded-xl w-full p-3 items-center justify-between">
                      <img src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n" alt="Vehicle" className="h-12 " loading="lazy"/>
                      <div className="ml-2 w-1/2 gap-1"> 
                         <h4 className="font-medium text-base">Moto <span><img src={user} alt="User" className="w-4 h-4 inline-block" /></span>1</h4>
                         <h5 className="font-medium text-sm">2 mins away</h5>
                         <p className="font-normal text-xs text-gray-600" >Affordable, Motorcycle rides</p>
                      </div>
                      <h2 className="text-lg font-semibold">$79.58</h2>
                </div>

                <div onClick={()=>{
                    props.setConfirmRidePanel(true)
                    props.setvehiclePanel(false)
                }} 
                className="flex border-2 hover:active:border-black rounded-xl w-full p-3 items-center justify-between">
                      <img src="data:image/jpeg;base64,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" alt="Vehicle" className="h-13" loading="lazy"/>
                      <div className="ml-2 w-1/2 gap-1"> 
                         <h4 className="font-medium text-base">Uber Auto <span><img src={user} alt="User" className="w-4 h-4 inline-block" />3</span></h4>
                         <h5 className="font-medium text-sm">2 mins away</h5>
                         <p className="font-normal text-xs text-gray-600" >Affordable, Auto rides</p>
                      </div>
                      <h2 className="text-lg font-semibold">$100.99</h2>
                </div>
    </div>
  )
}

export default VehiclePanel
