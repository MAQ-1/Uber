import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setCaptain } = React.useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = React.useState(true)



  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }

   if(isLoading){
    return <div>Loading...</div>
  }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/me`,{
    headers:{
      Authoriztion:`Bearer ${token}`
    }
   }).then(resposne=>{
     if(resposne.status === 200){
      setCaptain(resposne.data.captain)
      setIsLoading(false)
     }
   })
   .catch(err=>{
     console.log(err)
     localStorage.removeItem('token')
     navigate('/captain-login')
   })
  
  }, [token])


  
  

  return <>{children}</>
}

export default CaptainProtectedWrapper
