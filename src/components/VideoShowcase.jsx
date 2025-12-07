import React from 'react'

export default function VideoShowcase(){
  return (
    <section className="py-12">
      <h3 className="text-2xl font-semibold mb-6">Videography</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <video controls className="w-full h-64 object-cover" poster="/assets/poster1.jpg">
            <source src="/assets/showcase1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <video controls className="w-full h-64 object-cover" poster="/assets/poster2.jpg">
            <source src="/assets/showcase2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}