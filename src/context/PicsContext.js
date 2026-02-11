import React, { useState } from "react";

const Context = React.createContext ({})

export function PicsContextProvider ({children}) {
   const [pics, setPics] = useState([])

   return <Context.Provider value={{pics, setPics}}>
    {children}
    </Context.Provider>
}
export default Context