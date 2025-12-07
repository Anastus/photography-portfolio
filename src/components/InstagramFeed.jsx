import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function InstagramFeed(){
  const [posts, setPosts] = useState(null)
  useEffect(()=>{
    let mounted = true
    axios.get('/api/instagram')
      .then(r => { if(mounted) setPosts(r.data) })
      .catch(()=> { if(mounted) setPosts(null) })
    return ()=> mounted = false
  }, [])

  return (
    <section className="py-12">
      <h3 className="text-2xl font-semibold mb-6">Instagram</h3>
      {posts ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((p, i)=> (
            <a key={i} href={p.permalink} target="_blank" rel="noreferrer" className="block rounded-lg overflow-hidden">
              <img src={p.media_url} alt={p.caption?.slice(0,80) ?? 'Instagram'} className="w-full h-40 object-cover" />
            </a>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden">
            <iframe title="insta-embed-1" src="https://www.instagram.com/p/CG0UU3rA6jR/embed" height="480" width="100%" className="border-0 w-full h-80" loading="lazy"></iframe>
          </div>
          <div className="rounded-lg overflow-hidden">
            <iframe title="insta-embed-2" src="https://www.instagram.com/p/CG0UU3rA6jR/embed" height="480" width="100%" className="border-0 w-full h-80" loading="lazy"></iframe>
          </div>
          <div className="rounded-lg overflow-hidden flex items-center justify-center bg-black/20 text-gray-200">
            <a href="https://instagram.com/your_handle" target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded-xl border border-white/10">Open on Instagram</a>
          </div>
        </div>
      )}
    </section>
  )
}