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
// STRICT JS STOP-MOTION PROP COMPONENT
// ==========================================
const InteractiveProp = ({ 
  images, 
  className = '', 
  activeClassName = '',
  idleClassName = '',
  imageFilters = ['', '', ''],
  zIndex = 'z-0',
  imageClassName = 'object-contain',
  disableBreathing = false,
  sequenceMode = 'ping-pong',
  frameSpeed = 300
}) => {
  const [isActive, setIsActive] = useState(false);
  const [frame, setFrame] = useState(0); 
  const [isCycling, setIsCycling] = useState(false);
  const [hasPlayedThisActivation, setHasPlayedThisActivation] = useState(false);
  const propRef = useRef(null);

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

  // Reset activation flag when inactive so it can be triggered again later
  useEffect(() => {
    if (!isActive) {
      setHasPlayedThisActivation(false);
    }
  }, [isActive]);

  // Cycle trigger logic
  useEffect(() => {
    if (sequenceMode === 'cycle' && isActive && frame === 0 && !isCycling && !hasPlayedThisActivation) {
      setIsCycling(true);
      setHasPlayedThisActivation(true);
    }
  }, [isActive, sequenceMode, frame, isCycling, hasPlayedThisActivation]);

  // Ping-Pong Execution Logic (Interruptible)
  useEffect(() => {
    let timer;
    if (sequenceMode === 'ping-pong') {
      if (isActive && frame < 2) {
        timer = setTimeout(() => setFrame(f => f + 1), frameSpeed);
      } else if (!isActive && frame > 0) {
        timer = setTimeout(() => setFrame(f => f - 1), frameSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [isActive, frame, sequenceMode, frameSpeed]);

  // Cycle Execution Logic (FIX: Un-interruptible by isActive scroll events to prevent freezing mid-cycle)
  useEffect(() => {
    let timer;
    if (sequenceMode === 'cycle' && isCycling) {
      if (frame === 0) timer = setTimeout(() => setFrame(1), frameSpeed);
      else if (frame === 1) timer = setTimeout(() => setFrame(2), frameSpeed);
      else if (frame === 2) timer = setTimeout(() => {
        setFrame(0);
        setIsCycling(false);
      }, frameSpeed);
    }
    return () => clearTimeout(timer);
  }, [isCycling, frame, sequenceMode, frameSpeed]); // Notice `isActive` is intentionally absent here!

  return (
    <div 
      ref={propRef}
      onMouseEnter={() => window.innerWidth >= 1024 && setIsActive(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setIsActive(false)}
      className={`relative ${zIndex} transition-all duration-700 ease-out cursor-pointer
        ${isActive ? `prop-active ${activeClassName}` : `prop-idle ${idleClassName}`} 
        ${className}`}
    >
      {/* Hardware Acceleration classes added to prevent Safari layout thrashing. */}
      <div className={`relative w-full h-full transform-gpu will-change-transform ${!disableBreathing ? 'prop-breathe-wrapper drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]' : ''}`}>
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Prop Frame ${idx + 1}`} 
            style={{ 
              filter: imageFilters[idx],
              opacity: frame === idx ? 1 : 0, 
            }}
            className={`absolute inset-0 w-full h-full transition-opacity duration-0 transform-gpu will-change-opacity ${imageClassName}`} 
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

  const annaFrames = [
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611896/Portrait_1_xfwgp4.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611896/Portrait_3_rxhfj1.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611896/Portrait_2_dpvjcp.webp"
  ];
  
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
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611192/frame_1_poldkp.webp", 
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611193/Frame_2_med8qz.webp",
    "https://res.cloudinary.com/dp3g7dyx9/image/upload/v1773611193/Frame_3_vhd3ov.webp"  
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--charcoal)] selection:text-[var(--sand)]">
      <style>{styles}</style>
      
      {/* Navigation (FIXED: A.C. initials removed, spacer added to keep hamburger menu right-aligned) */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[var(--sand)]/80 backdrop-blur-md border-b border-structural/10 md:mix-blend-difference md:bg-transparent md:backdrop-blur-none md:border-none md:text-white transition-all">
        <div className="w-10"></div>
        <button className="md:hidden text-[var(--charcoal)]"><Menu size={28} /></button>
        <ul className="hidden md:flex gap-12 text-xs font-sans-heavy uppercase tracking-[0.2em]">
          {['Home', 'Schools', 'Museums', 'Events'].map(item => (
            <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:opacity-50 transition-opacity">{item}</a></li>
          ))}
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[100svh] flex flex-col md:flex-row border-b-2 border-structural overflow-hidden bg-[var(--olive)] md:bg-transparent">
        
        <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 h-full z-40 flex items-center justify-center pointer-events-none">
          <div className="hidden md:block w-[2px] h-full bg-[var(--charcoal)] absolute"></div>
          <h1 className="vertical-text font-sans-heavy text-[clamp(3.5rem,10vh,8rem)] leading-none text-white mix-blend-overlay opacity-80 whitespace-nowrap">
            Anna Conomos
          </h1>
        </div>

        <div className="absolute bottom-0 right-[-10%] md:right-0 md:relative w-[90%] md:w-1/2 h-[75%] md:h-full bg-transparent md:bg-[var(--olive)] flex items-end justify-center md:border-r-2 border-structural md:pt-20 z-10 md:z-auto pointer-events-auto">
          <InteractiveProp 
            images={annaFrames} 
            className="w-full h-full"
            imageClassName="object-contain object-bottom duotone-print scale-[1.1] md:scale-100 origin-bottom-right md:origin-bottom opacity-90 md:opacity-100"
            disableBreathing={true}
            sequenceMode="cycle"
            frameSpeed={600}
          />
        </div>

        {/* FIXED: Padding reduced on mobile, minimum font clamp reduced to 2.5rem, gap adjustments to avoid hand clipping */}
        <div className="relative w-full md:w-1/2 h-full bg-transparent md:bg-[var(--sand)] flex flex-col justify-start md:justify-center pt-[15vh] md:pt-0 px-6 pl-8 md:pl-200 lg:px-16 z-20 md:z-auto pointer-events-none md:pointer-events-auto">
          <p className="font-sans-heavy uppercase tracking-widest text-[0.6rem] md:text-sm text-[var(--charcoal)]/80 md:text-[var(--charcoal)]/50 mb-3 md:mb-8 drop-shadow-sm md:drop-shadow-none">
            From 2005 to Today
          </p>
          <h2 className="font-serif-display uppercase text-[clamp(2.5rem,11vw,6.5rem)] md:text-[clamp(3.2rem,5vw,5.5rem)] leading-[0.85] tracking-tight text-[var(--charcoal)] mb-6 md:mb-12 drop-shadow-sm md:drop-shadow-none">
            Performance<br/>
            Story<br/>
            Teller
          </h2>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span className="inline-block bg-[var(--charcoal)] text-[var(--sand)] px-4 py-2 md:py-1 text-xs font-sans-heavy uppercase tracking-widest pointer-events-auto shadow-md md:shadow-none">
              Live
            </span>
            <span className="inline-block border-2 border-[var(--charcoal)] text-[var(--charcoal)] px-4 py-2 md:py-1 text-xs font-sans-heavy uppercase tracking-widest pointer-events-auto backdrop-blur-sm md:backdrop-blur-none">
              Interactive
            </span>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: BIO --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row bg-[var(--slate)] border-b-2 border-structural overflow-hidden">
        <div className="w-full md:w-1/2 p-10 pt-24 md:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-structural z-10 order-1">
          <h3 className="font-serif-display italic text-4xl md:text-6xl text-[var(--sand)] mb-8">Award-Winning Craft</h3>
          <p className="font-sans text-lg md:text-2xl text-[var(--sand)]/90 leading-relaxed font-light">
            Anna Conomos has spent over twenty years performing internationally in festivals, museums, schools, castles, boats and beyond. 
            Winning the Young Storyteller of the Year UK award in 2005, her boundless energy and vocal colour sweeps audiences up into a whirlwind of adventure.
          </p>
        </div>
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

      {/* --- SECTION 2: INTERACTIVE --- */}
      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row-reverse bg-[var(--sand)] border-b-2 border-structural overflow-hidden">
        <div className="w-full md:w-1/2 p-10 pt-24 md:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-l-2 border-structural z-10 order-1">
          <p className="font-sans text-xl md:text-3xl text-[var(--charcoal)] leading-tight font-light mb-12">
            Whether young or old, be prepared to get involved – turn into crazy characters, learn interactive rhythms, journey through time and space. 
          </p>
          <span className="font-serif-display uppercase font-bold text-3xl md:text-5xl text-[var(--charcoal)]">
            Every performance is crafted to capture the imagination.
          </span>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative flex items-center justify-center order-2">
          <InteractiveProp 
            images={bookFrames} 
            className="w-[320px] md:w-[480px] h-[280px] md:h-[400px] -translate-x-10 md:translate-x-0" 
            idleClassName="rotate-6"
            activeClassName="-rotate-2"
          />
        </div>
      </section>

      {/* --- SECTION 3: TESTIMONIAL --- */}
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

      {/* --- SECTION 4: REALMS OF PLAY --- */}
      <section id="schools" className="relative w-full min-h-screen flex flex-col bg-[var(--charcoal)] text-[var(--sand)] border-b-2 border-structural">
        <div className="w-full border-b-2 border-[var(--sand)]/20 p-6 md:px-12 md:py-8 flex justify-between items-end relative z-20 bg-[var(--charcoal)]">
          <h2 className="font-serif-display uppercase text-4xl md:text-6xl text-[var(--olive)]">Realms of Play</h2>
          <span className="font-sans-heavy text-xs tracking-widest hidden md:block">01 / 03</span>
        </div>

        <div className="flex-1 flex flex-col md:flex-row relative">
          
          {/* FIXED: Removed mobile sticky overlap. Frame is now prominently stacked on top for mobile at 100% opacity */}
          <div className="relative md:absolute md:inset-y-0 md:right-0 h-[45vh] md:h-auto w-full md:w-1/2 flex items-center justify-center z-10 opacity-100 pointer-events-none md:pointer-events-auto bg-[var(--slate)]/15 md:bg-[var(--slate)]/10">
            <InteractiveProp 
              images={frameFrames} 
              className="w-[280px] md:w-[450px] h-[360px] md:h-[580px]" 
              idleClassName="rotate-6"
              activeClassName="-rotate-2"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col z-20 md:border-r-2 border-[var(--sand)]/20">
            {[
              { title: "Schools", desc: "Storytelling brings the curriculum to life providing an educational, entertaining and memorable experience for pupils." },
              { title: "Museums", desc: "Unique and tailor-made performances designed to animate museum and gallery artifacts and displays." },
              { title: "Events", desc: "Contemporary and traditional stories from all corners of the globe to engage participants at festivals and events." }
            ].map((area, idx) => (
              <div key={idx} className="flex-1 border-b border-[var(--sand)]/10 last:border-0 p-8 md:p-12 flex flex-col justify-center group hover:bg-[var(--sand)]/5 cursor-pointer transition-colors bg-transparent md:bg-[var(--charcoal)]/40 hover:backdrop-blur-sm">
                <h3 className="font-serif-display text-3xl md:text-4xl mb-4 text-[var(--sand)] flex justify-between items-center drop-shadow-md md:drop-shadow-none">
                  {area.title}
                  <ArrowRight size={28} className="text-[var(--olive)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="font-sans text-sm md:text-base text-[var(--sand)]/90 md:text-[var(--sand)]/80 max-w-md drop-shadow-md md:drop-shadow-none">{area.desc}</p>
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