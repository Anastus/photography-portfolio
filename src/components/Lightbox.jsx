import React, { useContext, useEffect } from 'react'
import { LightboxContext } from '../contexts/LightboxContext'

export default function Lightbox(){
  const { state, close, setIndex } = useContext(LightboxContext)
  useEffect(()=>{
    function onKey(e){
      if(!state.open) return
      if(e.key === 'Escape') close()
      if(e.key === 'ArrowRight') setIndex(Math.min(state.index+1, state.items.length-1))
      if(e.key === 'ArrowLeft') setIndex(Math.max(state.index-1, 0))
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [state.open, state.index, state.items.length])

  if(!state.open) return null

  const curr = state.items[state.index]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
      <button onClick={close} className="absolute right-6 top-6 text-white/80 text-2xl">✕</button>
      <div className="max-w-4xl w-full">
        {curr.type === 'image' ? (
          <img src={curr.src} alt={curr.title} className="w-full h-auto rounded-md shadow-xl" />
        ) : (
          <video controls src={curr.src} className="w-full h-auto rounded-md shadow-xl" />
        )}
        <div className="mt-4 text-center text-gray-300">{curr.title}</div>
      </div>
    </div>
  )
}