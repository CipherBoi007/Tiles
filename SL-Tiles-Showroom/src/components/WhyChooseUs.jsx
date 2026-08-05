import React from 'react';
import { Shield, Truck, Sparkles, Gem } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const features = [
  { icon: Gem, title: 'Premium Quality', desc: 'Sourced from the finest global manufacturers.' },
  { icon: Shield, title: 'Durability Guaranteed', desc: 'Tiles built to last generations without fading.' },
  { icon: Sparkles, title: 'Expert Guidance', desc: 'Free design consultation with our experts.' },
  { icon: Truck, title: 'Safe Delivery', desc: 'Fully insured and damage-free delivery pan-India.' }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-brand-black text-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-luxury mb-4">Why Choose LuxeTiles</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">We don't just sell tiles; we provide a foundation for your dreams.</p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <StaggerItem key={idx} className="flex flex-col items-center text-center p-6 border border-gray-800 rounded-sm hover:-translate-y-2 transition-transform duration-300 bg-gray-900/50">
              <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8" strokeWidth={1.2} />
              </div>
              <h3 className="text-xl font-luxury font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUs;
