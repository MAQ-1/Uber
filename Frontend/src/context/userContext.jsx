import React from 'react'


export const UserdataContext = createContext()

const userContext = ({children}) => {
    const[user,setuser] = useState({
        email:"",
        Fullname:{
            firstName:"",
            lastName:""
         },

         password:""
        
    })
  return (
    <div>
         <UserdataContext.Provider value={{user,setuser}}>
        {children}
        </UserdataContext.Provider >
    </div>
  )
}

export default userContext;