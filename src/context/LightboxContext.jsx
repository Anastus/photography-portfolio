import React, { createContext, useState } from 'react'

export const LightboxContext = createContext()

export default function LightboxProvider({ children }){
  const [state, setState] = useState({ open: false, index: 0, items: [] })
  const open = (items, index=0) => setState({ open: true, items, index })
  const close = () => setState({ open: false, index: 0, items: [] })
  const setIndex = (i)=> setState(s=> ({...s, index: i}))

  return (
    <LightboxContext.Provider value={{ state, open, close, setIndex }}>
      {children}
    </LightboxContext.Provider>
  )
}