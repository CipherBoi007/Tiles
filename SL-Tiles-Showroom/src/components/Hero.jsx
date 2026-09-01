import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroContent = [
  {
    eyebrow: "Premium Tiles & Surfaces",
    headline: "Surfaces That Define\nExceptional Spaces.",
    desc: "Premium tiles, granite and architectural surfaces selected for refined residential and commercial spaces."
  },
  {
    eyebrow: "Natural Stone Collection",
    headline: "Crafted by Nature,\nPerfected for Living.",
    desc: "Exquisite Italian marble and exotic granite slabs with breathtaking natural vein patterns and textures."
  },
  {
    eyebrow: "Designer Wall Solutions",
    headline: "Every Surface Tells\na Story of Elegance.",
    desc: "High-relief wall textures, luxury bath series, and precision-engineered anti-skid solutions."
  },
  {
    eyebrow: "Authorised Brand Partners",
    headline: "Global Craftsmanship,\nDirect Brand Trust.",
    desc: "Authorised dealer for Italake, Itaca Ceramic, and leading international surface manufacturers."
  }
];

const Hero = () => {
  const videoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroContent.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroContent[activeSlide];

  return (
    <section className="relative w-full h-screen min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover pointer-events-none"
        >
          <source src="/Hero_intro.mp4" type="video/mp4" />
        </video>
        {/* Subtle left vignette for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`eyebrow-${activeSlide}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-brand-gold text-[11px] sm:text-xs font-sans font-semibold tracking-[0.28em] uppercase mb-5 sm:mb-6"
            >
              {slide.eyebrow}
            </motion.p>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${activeSlide}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[32px] sm:text-[42px] md:text-5xl lg:text-[56px] font-normal leading-[1.12] tracking-[-0.01em] font-luxury text-white mb-5 sm:mb-6 whitespace-pre-line"
            >
              {slide.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.05 }}
              className="text-white/80 text-[13px] sm:text-[15px] md:text-base font-sans font-light leading-[1.75] mb-8 sm:mb-10 max-w-md lg:max-w-lg"
            >
              {slide.desc}
            </motion.p>
          </AnimatePresence>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 mb-8 sm:mb-10">
            <Link
              to="/collections"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-gold hover:bg-[#b8953d] text-white text-[13px] sm:text-sm font-medium tracking-[0.03em] rounded-[3px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Explore Collections
              <ArrowRight size={15} strokeWidth={2} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>

            <a
              href="/#contact"
              className="inline-flex items-center gap-1 text-[13px] sm:text-sm text-white/55 hover:text-white font-medium tracking-[0.02em] transition-colors duration-200 underline-offset-4 hover:underline focus:outline-none focus-visible:text-white focus-visible:underline"
            >
              Visit Our Showroom
              <ChevronRight size={14} strokeWidth={2} className="opacity-50" />
            </a>
          </div>

          {/* Slide Indicators — minimal progress bars */}
          <div className="flex items-center gap-2">
            {heroContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  activeSlide === idx
                    ? 'w-10 bg-brand-gold'
                    : 'w-5 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
