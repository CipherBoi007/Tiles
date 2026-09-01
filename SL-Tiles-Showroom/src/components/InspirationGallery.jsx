import React, { useState, useEffect, useRef } from 'react';
import { FadeUp } from './animations/MotionWrappers';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Flat top-down floor tile textures that match the room template's perspective
const floorTiles = [
  {
    name: "Classic Carrara Marble",
    image: "https://tse3.mm.bing.net/th/id/OIP.zCp49YIcbn5fK0ieQrkyogHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "Crema Marfil Vitrified",
    image: "https://5.imimg.com/data5/ANDROID/Default/2022/12/RL/RT/EG/72126110/product-jpeg-500x500.jpg"
  },
  {
    name: "Industrial Grey Concrete",
    image: "https://i.pinimg.com/736x/be/a8/d9/bea8d98ecc725ab9e0bbe2d692c0a585.jpg"
  },
  {
    name: "Art Deco Geometric Tile",
    image: "https://image.architonic.com/img_pro2-4/138/3446/art-deco-v01718-09-h.jpg"
  },
  {
    name: "Natural Timber Plank",
    image: "https://www.kt-exclusive.com/cache/datsogallery_catid-1583_400x320_1x1/1FDE907FF8DD-1583.jpg"
  },
  {
    name: "White Statuario Marble",
    image: "https://static.vecteezy.com/system/resources/previews/026/949/178/non_2x/white-marble-background-ai-generative-photo.jpeg",
    noRepeat: true
  },
  {
    name: "Polished Calacatta Gold",
    image: "https://tse1.mm.bing.net/th/id/OIP.VZKys9tUp68VIBjHxIZmugHaHa?r=0&w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    name: "Alpine Valley Granite",
    image: "https://atlanticstoneworks.com/wp-content/uploads/2025/03/Alpine-Valley-Primary-Web-Image-1280x1280-1-1024x1024.jpeg.webp",
    noRepeat: true
  }
];

const InspirationGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  // Auto-scroll through tiles
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % floorTiles.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    setActiveIndex(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % floorTiles.length);
    }, 3000);
  };

  const goPrev = () => goTo((activeIndex - 1 + floorTiles.length) % floorTiles.length);
  const goNext = () => goTo((activeIndex + 1) % floorTiles.length);

  const activeTile = floorTiles[activeIndex];
  const isNoRepeat = activeTile.noRepeat || activeTile.image?.includes('03/75/04/75/1000_F_375047531');

  return (
    <section id="inspiration" className="py-12 sm:py-16 bg-brand-lightBg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-black font-luxury mb-3">
              Visualise Your Space
            </h2>
            <p className="text-brand-textMuted text-base sm:text-lg max-w-xl mx-auto">
              See how our floor tiles transform a luxury living room. Swipe through to find your perfect surface.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative mx-auto" style={{ maxWidth: '1020px' }}>
            {/* Visualizer Container */}
            <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-2xl shadow-black/15" style={{ aspectRatio: '16/9' }}>

              {/* BACK LAYER — Realistic Tiled Floor Pattern */}
              <div className="absolute inset-0 z-0 bg-neutral-900 overflow-hidden">
                <div
                  key={activeIndex}
                  className="w-full h-full animate-fadeIn"
                  style={{
                    backgroundImage: activeTile.image ? `url("${activeTile.image}")` : 'none',
                    backgroundRepeat: isNoRepeat ? 'no-repeat' : 'repeat',
                    backgroundSize: isNoRepeat ? 'cover' : '220px 220px',
                    backgroundPosition: 'center center'
                  }}
                />
              </div>

              {/* FRONT LAYER — Room template overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <img
                  src="/Tile_Temp.png"
                  alt="Living room template"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Previous tile"
            >
              <ChevronLeft size={18} className="text-brand-black" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Next tile"
            >
              <ChevronRight size={18} className="text-brand-black" />
            </button>

            {/* Current Tile Name Badge */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide shadow-lg">
              {activeTile.name}
            </div>
          </div>

          {/* Tile Strip Thumbnails */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-4">
            {floorTiles.map((tile, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 focus:outline-none ${activeIndex === idx
                    ? 'border-brand-gold shadow-md shadow-brand-gold/30 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                  }`}
                aria-label={tile.name}
              >
                <img
                  src={tile.image}
                  alt={tile.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default InspirationGallery;
