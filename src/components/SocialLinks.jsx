import React from 'react'

export default function SocialLinks({ className='' }){
  return (
    <div className={`fixed right-4 bottom-6 flex flex-col gap-3 z-40 ${className}`}>
      <a href="https://instagram.com/your_handle" target="_blank" rel="noreferrer" className="text-sm px-3 py-2 bg-white/10 rounded-lg">IG</a>
      <a href="https://youtube.com/your_channel" target="_blank" rel="noreferrer" className="text-sm px-3 py-2 bg-white/10 rounded-lg">YT</a>
      <a href="mailto:your.email@example.com" className="text-sm px-3 py-2 bg-white/10 rounded-lg">Email</a>
    </div>
  )
}