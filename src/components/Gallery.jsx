import React, { useContext } from 'react'
import { LightboxContext } from '../contexts/LightboxContext'

const gallery = [
  { type:'image', src:'/assets/portfolio/photo1.jpg', title:'Urban Portrait' },
  { type:'image', src:'/assets/portfolio/photo2.jpg', title:'Golden Hour' },
  { type:'video', src:'/assets/portfolio/short_clip1.mp4', title:'Cinematic Clip' },
  { type:'image', src:'/assets/portfolio/photo3.jpg', title:'Architectural' },
  { type:'image', src:'/assets/portfolio/photo4.jpg', title:'Wedding Story' },
]

export default function Gallery(){
  const { open } = useContext(LightboxContext)
  return (
    <section id="portfolio" className="py-8">
      <h3 className="text-2xl font-semibold mb-6">Selected Work</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((it, i)=> (
          <button key={i} onClick={()=> open(gallery, i)} className="group relative rounded-xl overflow-hidden focus:outline-none">
            {it.type === 'image' ? (
              <img src={it.src} alt={it.title} loading="lazy" className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-full h-44 bg-black/30 flex items-center justify-center">
                <video src={it.src} className="w-full h-44 object-cover" />
              </div>
            )}
            <div className="absolute left-3 bottom-3 bg-black/50 px-3 py-1 rounded-md text-xs">{it.title}</div>
          </button>
        ))}
      </div>
    </section>
  )
}