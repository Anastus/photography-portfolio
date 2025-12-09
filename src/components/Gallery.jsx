// src/components/Gallery.jsx
import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * Horizontal portrait carousel.
 * Props:
 *  - items: [{ type: 'image'|'video', src, title }]
 *  - onOpen(index)  // called when a card is activated (click or Enter/Space)
 */
export default function Gallery({ items = [], onOpen }) {
  const scrollerRef = useRef(null);

  const scrollBy = useCallback((dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".carousel-card");
    const gap = parseInt(getComputedStyle(el).getPropertyValue("--gap") || 16, 10);
    const step = (card?.offsetWidth || 320) + gap;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }, []);

  // keyboard left/right when carousel focused
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBy(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBy(1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [scrollBy]);

  // Lazy-load videos (only set src when card is near viewport)
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector("video[data-src]");
          if (video && entry.isIntersecting) {
            // set src and remove data-src so it loads
            video.src = video.dataset.src;
            video.removeAttribute("data-src");
            // optionally video.load() if you want metadata loaded immediately:
            // video.load();
          }
        });
      },
      { root: scrollerRef.current, rootMargin: "200px", threshold: 0.2 }
    );

    const el = scrollerRef.current;
    if (!el) return;
    el.querySelectorAll(".carousel-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // handle keyboard activation (Enter / Space)
  const handleKeyActivate = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.(index);
    }
  };

  return (
    <section id="portfolio" className="panel">
      <div className="panel-header">
        <h2>Photography</h2>
        <div className="carousel-controls">
          <button className="arrow left" onClick={() => scrollBy(-1)} aria-label="Scroll left">◀</button>
          <button className="arrow right" onClick={() => scrollBy(1)} aria-label="Scroll right">▶</button>
        </div>
      </div>

      <div className="carousel-wrap">
        <div
          className="carousel"
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Photography carousel. Use left and right arrows to navigate."
        >
          {items.map((it, i) => (
            <article
              key={i}
              className="carousel-card"
              tabIndex={0}                       // make focusable
              role="button"
              aria-label={`Open ${it.title}`}
              onClick={() => onOpen?.(i)}
              onKeyDown={(e) => handleKeyActivate(e, i)}
            >
              {it.type === "image" ? (
                <img src={it.src} alt={it.title} loading="lazy" />
              ) : (
                // data-src used by IntersectionObserver; poster can be provided in items if available
                <video
                  data-src={it.src}
                  poster={it.poster || ""}
                  muted
                  playsInline
                  preload="none"
                />
              )}

              <div className="card-label">{it.title}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["image", "video"]).isRequired,
      src: PropTypes.string.isRequired,
      title: PropTypes.string,
      poster: PropTypes.string,
    })
  ),
  onOpen: PropTypes.func,
};