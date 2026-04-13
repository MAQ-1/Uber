import React from 'react'
import Location from '../assets/location.png'
export const LocationSearchPanel = (props) => {
   
  const locations = [
    "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
    "22C, Near Malhotra's Cafe, Sheryians Coding School, Bhopal",
    "20B, Near Singh's Cafe, Sheryians Coding School, Bhopal",
    "18A, Near Sharma's Cafe, Sheryians Coding School, Bhopal",
  ]

  return (
    <div>
      {/* this is just a sample data  */}
      {
        locations.map(function (elem, idx) {
          return (
            <div onClick={() => {
              props.setvehiclePanel(true)
              props.setpanel(false)
            }} key={idx} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
              <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><img src={Location} alt="Location" loading="lazy" /></h2>
              <h4 className='font-medium'>{elem}</h4>
            </div>
          )
        })
      }
    </div>
  )
}
