import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Menu, ArrowRight } from 'lucide-react';

// ==========================================
// CSS INJECTION (Mid-Century Modernist & Structural)
// ==========================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800&family=Inter:wght@400;500;600&display=swap');

  :root {
    --olive: #9BA36B;
    --slate: #7A9CA8;
    --sand: #E8E5DF;
    --charcoal: #222222;
  }

  body {
    background-color: var(--sand);
    color: var(--charcoal);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  .font-serif-display { font-family: 'Playfair Display', serif; }
  .font-sans-heavy { font-family: 'Archivo Black', sans-serif; }

  /* Vertical Text Utility */
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-transform: uppercase;
  }

  /* Mid-Century Image Knockout Effect */
  .duotone-print {
    filter: grayscale(100%) contrast(1.2) brightness(1.05);
    mix-blend-mode: multiply;
  }

  /* Stop-Motion Prop Animation Classes */
  @keyframes breatheIdle {
    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
    50% { transform: translateY(-10px) scale(1.02) rotate(1deg); }
  }
  .prop-idle .prop-breathe-wrapper {
    animation: breatheIdle 6s ease-in-out infinite;
  }
  .prop-breathe-wrapper { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .prop-active .prop-breathe-wrapper { transform: translateY(0) scale(1.08); }

  /* Structural Borders */
  .border-structural { border-color: var(--charcoal); }
`;

// ==========================================
// STRICT JS STOP-MOTION PROP COMPONENT (BUG FIXED)
// ==========================================
const InteractiveProp = ({ 
  images, 
  className = '', 
  activeClassName = '',
  idleClassName = '',
  imageFilters = ['', '', ''],
  zIndex = 'z-0'
}) => {
  const [isActive, setIsActive] = useState(false);
  const [frame, setFrame] = useState(0); 
  const propRef = useRef(null);

  // Mobile scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) setIsActive(true);
        else if (!entry.isIntersecting) setIsActive(false);
      },
      { threshold: 0.6 } 
    );
    if (propRef.current) observer.observe(propRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  // BULLETPROOF STEP ENGINE
  // Steps up sequentially if active, steps down sequentially if inactive. No skipped frames.
  useEffect(() => {
    let timer;
    if (isActive && frame < 2) {
      timer = setTimeout(() => setFrame(f => f + 1), 300);
    } else if (!isActive && frame > 0) {
      timer = setTimeout(() => setFrame(f => f - 1), 300);
    }
    return () => clearTimeout(timer);
  }, [isActive, frame]);

  return (
    <div 
      ref={propRef}
      onMouseEnter={() => window.innerWidth >= 1024 && setIsActive(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setIsActive(false)}
      className={`relative ${zIndex} transition-all duration-700 ease-out cursor-pointer
        ${isActive ? `prop-active ${activeClassName}` : `prop-idle ${idleClassName}`} 
        ${className}`}
    >
      <div className="relative w-full h-full prop-breathe-wrapper drop-shadow-[0_25px_35px_rgba(0,0,0,0.2)]">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Prop Frame ${idx + 1}`} 
            style={{ 
              filter: imageFilters[idx],
              opacity: frame === idx ? 1 : 0, 
            }}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-0" 
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// MAIN APPLICATION
// ==========================================
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setIsLoaded(true), 100); }, []);

  const annaImage = "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773413928/frontal_portrait_ino_background_s2vjfg.png";
  
  const dollFrames = [
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773324432/Russian_doll_closed_noq4ls.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773324436/Russian_doll_half-open_vxrqhb.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773254391/Russian_doll_open_qeed78.webp"
  ];
  const bookFrames = [
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773405330/book_isolated_no_bcgrd_tz5ifc.png",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773405330/book_reshuffled_1_no_bcgrd_uro0tj.png",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773405330/book_reshuffled_2_no_bcgrd_zkgfn6.png"
  ];
  const maskFrames = [
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773405004/mask_d1ggjd.png", 
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773393069/mask_eyes_closed_y2m6hh.webp", 
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773393071/mask_eyes_open_apgteh.webp" 
  ];
  const frameFrames = [
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773327440/frame_t0sw1u.webp", 
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773327445/frame_blue_sailboat_yz2aay.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773327433/frame_orange_sailboat_fn48am.webp"  
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--charcoal)] selection:text-[var(--sand)]">
      <style>{styles}</style>
      
      {/* Navigation (Fixed top, structural) */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 mix-blend-difference text-white">
        <div className="font-sans-heavy text-xl tracking-tighter">A.C.</div>
        <button className="md:hidden"><Menu size={28} /></button>
        <ul className="hidden md:flex gap-12 text-xs font-sans-heavy uppercase tracking-[0.2em]">
          {['Home', 'Schools', 'Museums', 'Events'].map(item => (
            <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity">{item}</a></li>
          ))}
        </ul>
      </nav>

      {/* --- HERO SECTION (The Poster) --- */}
      {/* Unified Olive background on mobile, 50/50 split on desktop */}
      <section className="relative w-full h-[100svh] flex flex-col md:flex-row border-b-2 border-structural overflow-hidden bg-[var(--olive)] md:bg-transparent">
        
        {/* Central Vertical Spine (Desktop) / Left Edge Spine (Mobile) */}
        <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 h-full z-40 flex items-center justify-center pointer-events-none">
          <div className="hidden md:block w-[2px] h-full bg-[var(--charcoal)] absolute"></div>
          <h1 className="vertical-text font-sans-heavy text-[clamp(3.5rem,10vh,8rem)] leading-none text-white mix-blend-overlay opacity-80 whitespace-nowrap">
            Anna Conomos
          </h1>
        </div>

        {/* Anna Image Container - Anchored bottom right on mobile */}
        <div className="absolute bottom-0 right-[-10%] md:right-0 md:relative w-[90%] md:w-1/2 h-[75%] md:h-full bg-transparent md:bg-[var(--olive)] flex items-end justify-center md:border-r-2 border-structural md:pt-20 z-10 md:z-auto pointer-events-none">
          <img 
            src={annaImage} 
            alt="Anna Conomos" 
            className="h-full w-auto object-cover object-bottom duotone-print scale-[1.1] md:scale-100 origin-bottom-right md:origin-bottom opacity-90 md:opacity-100"
          />
        </div>

        {/* Brutalist Typography - Overlapping Anna on Mobile */}
        <div className="relative w-full md:w-1/2 h-full bg-transparent md:bg-[var(--sand)] flex flex-col justify-center px-6 pl-16 md:pl-12 lg:px-16 z-20 md:z-auto pointer-events-none md:pointer-events-auto mt-[-5vh] md:mt-0">
          <p className="font-sans-heavy uppercase tracking-widest text-[0.6rem] md:text-sm text-[var(--charcoal)]/60 md:text-[var(--charcoal)]/50 mb-4 md:mb-8">
            From 2005 to Today
          </p>
          {/* Tweaked clamp values to prevent text cutoff on 13" laptops while maintaining massive feel */}
          <h2 className="font-serif-display uppercase text-[clamp(3.7rem,12vw,6.5rem)] md:text-[clamp(3.2rem,5vw,5.5rem)] leading-[0.85] tracking-tight text-[var(--charcoal)] mb-6 md:mb-12">
            Performance<br/>
            Story<br/>
            Teller
          </h2>
          <div className="flex gap-4">
            <span className="inline-block bg-[var(--charcoal)] text-[var(--sand)] px-4 py-1 text-xs font-sans-heavy uppercase tracking-widest pointer-events-auto">
              Live
            </span>
            <span className="inline-block border border-[var(--charcoal)] text-[var(--charcoal)] px-4 py-1 text-xs font-sans-heavy uppercase tracking-widest pointer-events-auto">
              Interactive
            </span>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: BIO (Slate Blue) --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row bg-[var(--slate)] border-b-2 border-structural overflow-hidden">
        {/* Typography */}
        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-structural z-10 order-1">
          <h3 className="font-serif-display italic text-4xl md:text-6xl text-[var(--sand)] mb-8">Award-Winning Craft</h3>
          <p className="font-sans text-lg md:text-2xl text-[var(--sand)]/90 leading-relaxed font-light">
            Anna Conomos has spent over twenty years performing internationally in festivals, museums, schools, castles, boats and beyond. 
            Winning the Young Storyteller of the Year UK award in 2005, her boundless energy and vocal colour sweeps audiences up into a whirlwind of adventure.
          </p>
        </div>
        {/* Doll Prop - Massive & Bleeding Right on Mobile */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative flex items-center justify-center bg-[var(--slate)] order-2 overflow-hidden md:overflow-visible">
           <div className="absolute font-sans-heavy text-[18vw] md:text-[12vw] text-white/10 select-none pointer-events-none -rotate-90 md:rotate-0 whitespace-nowrap">FOLKLORE</div>
           <InteractiveProp 
            images={dollFrames} 
            className="w-[350px] md:w-[750px] h-[450px] md:h-[900px] scale-110 md:scale-125 translate-x-12 md:translate-x-0 z-20" 
            idleClassName="-rotate-3"
            activeClassName="rotate-3"
          />
        </div>
      </section>

      {/* --- SECTION 2: INTERACTIVE (Sand) --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row-reverse bg-[var(--sand)] border-b-2 border-structural overflow-hidden">
        {/* Typography */}
        <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-l-2 border-structural z-10 order-1">
          <p className="font-sans text-xl md:text-3xl text-[var(--charcoal)] leading-tight font-light mb-12">
            Whether young or old, be prepared to get involved – turn into crazy characters, learn interactive rhythms, journey through time and space. 
          </p>
          <span className="font-serif-display uppercase font-bold text-3xl md:text-5xl text-[var(--charcoal)]">
            Every performance is crafted to capture the imagination.
          </span>
        </div>
        {/* Book Prop - Bleeding Left on Mobile */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative flex items-center justify-center order-2">
          <InteractiveProp 
            images={bookFrames} 
            className="w-[320px] md:w-[480px] h-[280px] md:h-[400px] -translate-x-10 md:translate-x-0" 
            idleClassName="rotate-6"
            activeClassName="-rotate-2"
          />
        </div>
      </section>

      {/* --- SECTION 3: TESTIMONIAL (Olive) --- */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-[var(--olive)] border-b-2 border-structural p-10 py-24 md:p-24 text-center">
         <InteractiveProp 
            images={maskFrames} 
            className="w-[200px] md:w-[280px] h-[140px] md:h-[180px] mb-12" 
            idleClassName="-rotate-6"
            activeClassName="rotate-2"
          />
          <blockquote className="max-w-4xl mx-auto z-10 relative">
            <p className="font-serif-display italic text-3xl md:text-5xl text-[var(--charcoal)] leading-tight">
              "I love Anna's powerful, crisp style of storytelling and especially the way she includes heart-wrenching emotional songs and music."
            </p>
            <cite className="block mt-12 font-sans-heavy uppercase tracking-widest text-xs md:text-sm text-[var(--charcoal)]/70 not-italic">
              — Martin Palmer, BBC Presenter
            </cite>
          </blockquote>
      </section>

      {/* --- SECTION 4: REALMS OF PLAY / SERVICES (Charcoal) --- */}
      <section id="schools" className="relative w-full min-h-screen flex flex-col bg-[var(--charcoal)] text-[var(--sand)] border-b-2 border-structural">
        {/* Header Ribbon */}
        <div className="w-full border-b-2 border-[var(--sand)]/20 p-6 md:px-12 md:py-8 flex justify-between items-end relative z-20 bg-[var(--charcoal)]">
          <h2 className="font-serif-display uppercase text-4xl md:text-6xl text-[var(--olive)]">Realms of Play</h2>
          <span className="font-sans-heavy text-xs tracking-widest hidden md:block">01 / 03</span>
        </div>

        {/* Sticky Mobile Layout Magic: 
          On mobile, the frame renders first, acts sticky, and the cards visually scroll over it.
          On desktop, it operates as a standard 50/50 split flex row.
        */}
        <div className="flex-1 flex flex-col md:flex-row relative">
          
          {/* Frame (Sticky Background on Mobile, Right Panel on Desktop) */}
          <div className="sticky top-[15vh] md:top-0 h-[60vh] md:h-auto w-full md:w-1/2 md:absolute md:right-0 flex items-center justify-center z-0 opacity-25 md:opacity-100 pointer-events-none md:pointer-events-auto bg-transparent md:bg-[var(--slate)]/10">
            <InteractiveProp 
              images={frameFrames} 
              className="w-[280px] md:w-[450px] h-[360px] md:h-[580px]" 
              idleClassName="rotate-6"
              activeClassName="-rotate-2"
            />
          </div>

          {/* Service Cards (Scrolls over Frame on Mobile, Left Panel on Desktop) */}
          <div className="w-full md:w-1/2 flex flex-col z-10 md:border-r-2 border-[var(--sand)]/20 -mt-[60vh] md:mt-0">
            {[
              { title: "Schools", desc: "Storytelling brings the curriculum to life providing an educational, entertaining and memorable experience for pupils." },
              { title: "Museums", desc: "Unique and tailor-made performances designed to animate museum and gallery artifacts and displays." },
              { title: "Events", desc: "Contemporary and traditional stories from all corners of the globe to engage participants at festivals and events." }
            ].map((area, idx) => (
              <div key={idx} className="flex-1 border-b border-[var(--sand)]/10 last:border-0 p-8 md:p-12 flex flex-col justify-center group hover:bg-[var(--sand)]/5 cursor-pointer transition-colors backdrop-blur-sm md:backdrop-blur-none bg-[var(--charcoal)]/40 md:bg-transparent">
                <h3 className="font-serif-display text-3xl md:text-4xl mb-4 text-[var(--sand)] flex justify-between items-center drop-shadow-md md:drop-shadow-none">
                  {area.title}
                  <ArrowRight size={28} className="text-[var(--olive)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="font-sans text-sm md:text-base text-[var(--sand)]/80 max-w-md drop-shadow-md md:drop-shadow-none">{area.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[var(--sand)] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-20">
        <div>
          <h2 className="font-sans-heavy text-3xl md:text-4xl text-[var(--charcoal)] tracking-tighter">ANNA CONOMOS</h2>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--charcoal)]/60 mt-1">Performance Storyteller</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-16">
           <a href="tel:07939217038" className="font-sans-heavy text-sm uppercase tracking-widest text-[var(--charcoal)] hover:text-[var(--olive)] transition-colors">
              +44 (0) 7939 217038
            </a>
            <a href="mailto:anna@performancestoryteller.com" className="font-sans-heavy text-sm uppercase tracking-widest text-[var(--charcoal)] hover:text-[var(--olive)] transition-colors">
              anna@performancestoryteller.com
            </a>
        </div>
      </footer>
    </div>
  );
}