import { useEffect } from 'react'

export default function useIntersection(ref, callback, options){
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e => e.isIntersecting && callback())
    }, options)
    observer.observe(el)
    return ()=> observer.disconnect()
  }, [ref, callback, options])
}