import React from 'react';
import { Camera } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';
import SafeImage from './SafeImage';

const inspirationImages = [
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
];

const InspirationGallery = () => {
  return (
    <section id="inspiration" className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black font-luxury mb-4">Inspiration Gallery</h2>
          <p className="text-brand-textMuted text-lg max-w-2xl mx-auto mb-12">
            Discover how our premium tiles can transform ordinary spaces into extraordinary masterpieces. 
            Follow us on Instagram for daily inspiration.
          </p>
        </FadeUp>

        {/* Uniform Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspirationImages.map((src, idx) => (
            <StaggerItem key={idx} className="relative group overflow-hidden rounded-sm cursor-pointer block aspect-square">
              <SafeImage 
                src={src} 
                alt={`Inspiration ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-brand-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-brand-white">
                  <Camera className="w-6 h-6" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <button className="mt-12 px-8 py-3 outline outline-2 outline-offset-2 outline-brand-text text-brand-text hover:bg-brand-text hover:text-brand-white transition-all font-medium rounded-sm">
            Follow @LuxeTiles
          </button>
        </FadeUp>
      </div>
    </section>
  );
};

export default InspirationGallery;
