import React, { useState, useEffect } from 'react'
import Location from '../assets/location.png'
import axios from 'axios'

export const LocationSearchPanel = (props) => {
   
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get token from localStorage
  const token = localStorage.getItem('token')
  const baseURL = import.meta.env.VITE_BASE_URL

  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    console.log('fetchSuggestions called with input:', input)
    console.log('Token:', token)
    console.log('Base URL:', baseURL)
    
    if (!input || input.length < 3) {
      console.log('Input too short, skipping fetch')
      setSuggestions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log('Making API call to:', `${baseURL}/maps/get-suggestions?input=${input}`)
      
      const response = await axios.get(
        `${baseURL}/maps/get-suggestions`,
        {
          params: {
            input: input
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('API Response:', response.data)
      setSuggestions(response.data.suggestions || [])
    } catch (err) {
      console.error('Error fetching suggestions:', err)
      console.error('Error response:', err.response?.data)
      console.error('Error status:', err.response?.status)
      setError(err.response?.data?.message || err.message)
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  // Trigger fetch when input changes (passed from parent)
  useEffect(() => {
    console.log('useEffect triggered, inputValue:', props.inputValue)
    if (props.inputValue) {
      fetchSuggestions(props.inputValue)
    }
  }, [props.inputValue])

  return (
    <div className='mt-8'>
      {loading && <p className='text-gray-500 p-3'>Loading suggestions...</p>}
      
      
      {suggestions.length === 0 && !loading && props.inputValue && props.inputValue.length >= 3 && (
        <p className='text-gray-500 p-3'>No suggestions found</p>
      )}

      {
        suggestions.map(function (elem, idx) {
          return (
            <div 
              onClick={() => {
                props.onSelectLocation(elem)
                // props.setvehiclePanel(true)
                // props.setpanel(false)
              }} 
              key={idx} 
              className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50 overflow-y-scroll'
            >
              <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                <img src={Location} alt="Location" loading="lazy" />
              </h2>
              <div className='flex-1'>
                <h4 className='font-medium'>{elem.main_text}</h4>
                <p className='text-sm text-gray-600'>{elem.secondary_text}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
