import React from "react"
import user from '../assets/user.png'
import Downarrow from '../assets/arrow-down-double-fill.png'
const VehiclePanel = (props) => {
    const formatFare = (fareValue, fallback) => {
        if (props.faresLoading) {
            return '...'
        }

        if (typeof fareValue === 'number' && Number.isFinite(fareValue)) {
            return `₹${Math.round(fareValue)}`
        }

        return fallback
    }

    return (
        <div >
            <h5 className="p-1 text-center w-[93%] absolute top-13 left-50"
             onClick={() => {
                props.setvehiclePanel(false)
            }}><img src={Downarrow} alt="Down Arrow" className="w-6 " /></h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setvehiclePanel(false)
                props.setvechile('car')
            }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-10" src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">UberGo <span><img src={user} alt="User" className="h-4 inline mr-1" />4</span></h4>
                    <h5 className="font-medium text-sm">2 mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-lg font-semibold">
                    {formatFare(props.fares?.car)}
                </h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setvehiclePanel(false)
                props.setvechile('motorcycle')
            }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-10 ml-2" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">Moto <span><img src={user} alt="User" className="h-4 inline mr-1" />1</span></h4>
                    <h5 className="font-medium text-sm">3 mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, motorcycle rides</p>
                </div>
                <h2 className="text-lg font-semibold">
                    {formatFare(props.fares?.motorcycle)}
                </h2>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setvehiclePanel(false)
                props.setvechile('auto')
            }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
                <img className="h-10 " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYZNGPspo5yDiYR9DP05wsjLh1skE79Jfng&s" alt="" />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-base">UberAuto <span><img src={user} alt="User" className="h-4 inline mr-1" />3</span></h4>
                    <h5 className="font-medium text-sm">2 mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
                </div>
                <h2 className="text-lg font-semibold">
                    {formatFare(props.fares?.auto)}
                </h2>
            </div>
        </div>
    )
}

export default VehiclePanel
