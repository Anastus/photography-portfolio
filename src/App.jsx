import React, { useState } from "react";
import "./App.css";

/* Simple portfolio App (plain CSS, no Tailwind) 
   Replace asset paths with your actual files under public/assets/
*/

const GALLERY = [
  { type: "image", src: "/assets/portfolio/photo1.jpg", title: "Urban Portrait" },
  { type: "image", src: "/assets/portfolio/photo2.jpg", title: "Golden Hour" },
  { type: "video", src: "/assets/portfolio/short_clip1.mp4", title: "Cinematic Clip" },
  { type: "image", src: "/assets/portfolio/photo3.jpg", title: "Architectural" },
  { type: "image", src: "/assets/portfolio/photo4.jpg", title: "Wedding Story" },
];

function Hero() {
  return (
    <header className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/assets/bg-motion.mp4" type="video/mp4" />
        {/* add webm fallback if you have it */}
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="site-title">Anastus John's Photography</h1>
        <p className="site-sub">Photography · Videography · Storytelling</p>
        <div className="hero-ctas">
          <a href="#portfolio" className="btn primary">View Work</a>
          <a href="#contact" className="btn hollow">Contact</a>
        </div>
      </div>

      <div className="hero-badge">Available for shoots • India</div>
    </header>
  );
}

function Gallery({ onOpen }) {
  return (
    <section id="portfolio" className="panel">
      <h2>Selected Work</h2>
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

function Socials() {
  return (
    <div className="socials">
      <a href="https://instagram.com/your_handle" target="_blank" rel="noreferrer">Instagram</a>
      <a href="https://youtube.com/your_channel" target="_blank" rel="noreferrer">YouTube</a>
      <a href="mailto:your.email@example.com">Email</a>
    </div>
  );
}

export default function App() {
  const [lb, setLb] = useState({ open: false, index: 0 });

  const openLightbox = (i) => setLb({ open: true, index: i });
  const closeLightbox = () => setLb({ open: false, index: 0 });
  const prev = () => setLb((s) => ({ ...s, index: Math.max(0, s.index - 1) }));
  const next = () => setLb((s) => ({ ...s, index: Math.min(GALLERY.length - 1, s.index + 1) }));

  return (
    <>
      <Hero />
      <main>
        <section className="panel about">
          <div>
            <h2>About & Skills</h2>
            <p>
              I'm a photographer and videographer focused on editorial, commercial and cinematic storytelling.
            </p>
            <ul className="skills">
              <li>Editorial Photography</li>
              <li>Cinematic Short-form Video</li>
              <li>Studio & Location Lighting</li>
              <li>Color Grading</li>
            </ul>

            <div className="contact-quick">
              <a className="btn primary" href="#contact">Hire Me</a>
              <a className="btn hollow" href="mailto:your.email@example.com">Email</a>
            </div>
          </div>

          <div className="about-media">
            <video className="about-clip" autoPlay muted loop playsInline>
              <source src="/assets/hero_clip.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <Gallery onOpen={openLightbox} />

        <section className="panel">
          <h2>Videography</h2>
          <div className="grid-2">
            <video controls poster="/assets/poster1.jpg">
              <source src="/assets/showcase1.mp4" type="video/mp4" />
            </video>
            <video controls poster="/assets/poster2.jpg">
              <source src="/assets/showcase2.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section id="contact" className="panel contact">
          <h2>Let's work together</h2>
          <p>Available for commissioned shoots, brand collaborations and films.</p>
          <div className="contact-quick">
            <a className="btn primary" href="mailto:your.email@example.com">Email Me</a>
            <a className="btn hollow" href="tel:+911234567890">Call</a>
          </div>

          <Socials />
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

      <footer className="footer">© {new Date().getFullYear()} Anastus John</footer>
    </>
  );
}