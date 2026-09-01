import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const reasons = [
  {
    title: "3-Day Express Fulfilment",
    subtitle: "Direct factory inventory access allowing custom tile orders and stock delivery within 3 working days."
  },
  {
    title: "24/7 Dedicated Support",
    subtitle: "Round-the-clock expert assistance for architects, builders, and homeowners from selection to installation."
  },
  {
    title: "Direct Brand Sourcing",
    subtitle: "Authorised tie-ups with leading global manufacturers guaranteeing genuine materials & factory-direct pricing."
  },
  {
    title: "Zero-Breakage Guarantee",
    subtitle: "Insured transit and specialized packaging ensuring 100% damage-free delivery directly to your site."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 sm:py-28 text-brand-white border-y border-gray-900 overflow-hidden">
      {/* Stone Background Image with Black Opacity Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.istockphoto.com/id/185211447/photo/stone-background.jpg?s=612x612&w=0&k=20&c=x_IGaRCw388IzNt0m2ES7vjZYEbrlGB28xcVKaPqO8c="
          alt="Stone Texture Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
        {/* Architectural Header */}
        <FadeUp className="mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="h-[1px] w-12 bg-brand-gold/60 inline-block" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-gold font-semibold">
              THE SRI LAKSHMI ADVANTAGE
            </span>
            <span className="h-[1px] w-12 bg-brand-gold/60 inline-block" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-white">
            Why Choose Our Showroom
          </h2>
        </FadeUp>

        {/* Feature Cards - Clean Editorial Typography without numerals */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {reasons.map((item, idx) => (
            <StaggerItem 
              key={idx} 
              className="p-7 rounded-xl bg-black/45 backdrop-blur-sm border border-white/10 hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-1 bg-brand-gold mb-5 rounded-full" />
                <h3 className="text-xl font-semibold text-white font-luxury mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUs;
