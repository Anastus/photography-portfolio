import React, { useState, useEffect } from "react";
import "./App.css";


/* Simple portfolio App (plain CSS, no Tailwind)
   Replace asset paths with your actual files under public/assets/
*/

const GALLERY = [
  { type: "image", src: "/assets/portfolio/photo 1.jpg"},
  { type: "image", src: "/assets/portfolio/photo 2.jpg"},
  { type: "image", src: "/assets/portfolio/photo 3.jpg"},
  { type: "image", src: "/assets/portfolio/photo 4.jpg"},
  { type: "image", src: "/assets/portfolio/photo 5.jpg"},
  { type: "image", src: "/assets/portfolio/photo 6.jpg"},
  { type: "image", src: "/assets/portfolio/photo 7.jpg"},
  { type: "image", src: "/assets/portfolio/photo 8.jpg"},
];

function Hero() {
  return (
    <header className="hero">
      <video
        id="bgVideo"
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/bg-poster.jpg"
      >
        <source src="/assets/bg-motion.webm" type="video/webm" />
        <source src="/assets/background.mp4" type="video/mp4" />
        {/* fallback text */}
        Your browser does not support the background video.
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="site-title">REFLECTIONS PHOTOGRAPHY</h1>
        <p className="site-sub">Photography · Videography · Visual Storytelling</p>
        <div className="hero-ctas">
          <a href="#portfolio" className="btn primary">VIEW WORK</a>
          <a href="https://www.instagram.com/reflections_photography__?igsh=MTcxOG5pbWJycmExcQ%3D%3D&utm_source=qr" className="btn hollow" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        </div>
      </div>

      <div className="hero-badge">Available for shoots • India</div>
    </header>
  );
}

function Gallery({ onOpen }) {
  return (
    <section id="portfolio" className="panel">
      <h2>PHOTOGRAPHY</h2>
      <div className="grid">
        {GALLERY.map((it, i) => (
          <button
            key={i}
            className="tile"
            onClick={() => onOpen(i)}
            aria-label={`Open ${it.title}`}
          >
            {it.type === "image" ? (
              <img src={it.src} alt={it.title} loading="lazy" />
            ) : (
              <video src={it.src} muted className="thumb-video" />
            )}
            <div className="tile-label">{it.title}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Lightbox({ index, items, onClose, onPrev, onNext }) {
  if (!items || items.length === 0) return null;
  const curr = items[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <div className="lightbox-inner">
        {curr.type === "image" ? (
          <img src={curr.src} alt={curr.title} />
        ) : (
          <video controls src={curr.src} />
        )}
        <div className="lightbox-caption">{curr.title}</div>
        <div className="lightbox-nav">
          <button onClick={onPrev} disabled={index === 0}>&larr;</button>
          <button onClick={onNext} disabled={index === items.length - 1}>&rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lb, setLb] = useState({ open: false, index: 0 });

  const openLightbox = (i) => setLb({ open: true, index: i });
  const closeLightbox = () => setLb({ open: false, index: 0 });
  const prev = () => setLb((s) => ({ ...s, index: Math.max(0, s.index - 1) }));
  const next = () => setLb((s) => ({ ...s, index: Math.min(GALLERY.length - 1, s.index + 1) }));

  // attempt to play background video programmatically (helps with autoplay policies)
  useEffect(() => {
    const v = document.getElementById('bgVideo');
    if (!v) return;
    // ensure muted (required for autoplay in many browsers)
    v.muted = true;
    v.play().catch((err) => {
      // not fatal — log so you can paste errors if playback fails
      console.warn('Background video play error:', err);
    });
  }, []);

  return (
    <>
      <Hero />
      <main>
        <section className="panel about">
          <div>
            <h2>ABOUT ME</h2>
            <p>
              Hi, I’m Anastus John A, a photographer with a passion for capturing real moments with authenticity and attention to detail. My work focuses on portraits, events and lifestyle blending creative storytelling with a refined, modern aesthetic. I believe every image should feel honest and emotionally true. Thank you for visiting I look forward to creating something meaningful with you.
            </p>

            <div className="contact-quick">
              <a className="btn primary" href="#contact">HIRE ME</a>
            </div>
          </div>

          <div className="about-media">
            <video className="about-clip" autoPlay muted loop playsInline>
              <source src="/assets/hero_clip.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <Gallery items={GALLERY} onOpen={openLightbox} />  

        <section className="panel">
          <h2>VIDEOGRAPHY</h2>
          <div className="grid-2">
            <video controls poster="/assets/poster1.jpg">
              <source src="/assets/background 1.mp4" type="video/mp4" poster="/assets/poster.jpg"/>
            </video>
            <video controls poster="/assets/poster2.jpg">
              <source src="/assets/background 1.mp4" type="video/mp4" poster="/assets/poster.jpg"/>
            </video>
          </div>
        </section>

        <section id="contact" className="panel contact">
          <h2>LET'S WORK TOGETHER</h2>
          <p>Available for commissioned shoots and brand collaborations.</p>
          <div className="contact-quick">
            <a className="btn primary" href="mailto:reflectionsphotographybusiness@gmail.com">EMAIL</a>
            <a className="btn hollow" href="tel:+9163799227655">CALL</a>
          </div>
        </section>
      </main>

      {lb.open && (
        <Lightbox
          index={lb.index}
          items={GALLERY}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}

      <footer className="footer">© {new Date().getFullYear()} REFLECTIONS PHOTOGRAPHY</footer>
    </>
  );
}