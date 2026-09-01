import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Building2, Sparkles } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem, ScaleUp } from './animations/MotionWrappers';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';

const ContactSection = () => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const whatsappNumber = settings?.whatsappNumber || '+91 98765 43210';
  const emailAddress = settings?.emailAddress || '  ';
  const address = settings?.address || 'SRI LAKSHMI TILES AND GRANITES, Madurai - Rameswaram Hwy, near mugavai car Care Mandapam, Muniyasamy nagar, Pattinamkathan, Ramanathapuram, Pattinamkathan, Tamil Nadu 623536';

  const handleWhatsApp = () => {
    const execute = () => {
      openWhatsApp({ phone: whatsappNumber });
    };
    captureLead('WhatsApp Enquiry', execute);
  };
  return (
    <section id="contact" className="py-20 bg-brand-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Contact Details & Support Channels */}
          <div className="w-full lg:w-1/2">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-semibold font-luxury text-brand-black mb-4">Visit Our Showroom</h2>
              <p className="text-brand-textMuted text-lg mb-10">Experience the luxury firsthand. Our design experts are ready to turn your vision into reality.</p>
            </FadeUp>
            
            <StaggerContainer className="space-y-6 lg:space-y-7">
              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Showroom Address</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">{address}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Phone Number</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">{whatsappNumber}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Email Address</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">{emailAddress}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Working Hours</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">Monday - Sunday: 9:00 AM - 9:00 PM</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Instant WhatsApp Consultation</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">
                    Chat directly with our showroom sales specialists for instant tile photos, pricing, and stock updates.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Bulk Orders & Architect Desk</h4>
                  <p className="text-brand-textMuted mt-1 text-sm sm:text-base">
                    Dedicated priority assistance for builders, architects, interior designers, and commercial project orders.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Column: Contact Form (Top) & Embedded Interactive Google Map (Bottom) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Contact Form (Top) */}
            <FadeUp delay={0.15} className="w-full flex flex-col justify-center bg-brand-lightBg p-6 sm:p-8 rounded-xl border border-brand-gold/10 shadow-xl shadow-brand-black/5">
              <h3 className="text-xl sm:text-2xl font-luxury font-bold text-brand-black mb-1">Send us a Message</h3>
              <p className="text-brand-textMuted text-xs sm:text-sm mb-5">Fill out the form below and our team will get back to you shortly.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const btn = e.target.querySelector('button[type="submit"]');
                btn.innerHTML = 'Sending...';
                btn.disabled = true;
                
                import('../services').then(({ enquiryService }) => {
                  enquiryService.create({
                    customer: e.target.name.value,
                    phone: e.target.phone.value,
                    email: e.target.email.value,
                    description: e.target.message.value,
                    status: 'New',
                    source: 'Contact Form'
                  }).then(() => {
                    btn.innerHTML = 'Message Sent Successfully!';
                    btn.className = 'w-full py-3 bg-green-600 text-white font-medium rounded-lg transition-colors text-sm';
                    e.target.reset();
                    setTimeout(() => {
                      btn.innerHTML = 'Send Message';
                      btn.disabled = false;
                      btn.className = 'w-full py-3 bg-brand-black hover:bg-gray-900 text-brand-white font-medium rounded-lg transition-colors shadow-md text-sm';
                    }, 3000);
                  }).catch(() => {
                    btn.innerHTML = 'Error! Try WhatsApp';
                    btn.className = 'w-full py-3 bg-red-600 text-white font-medium rounded-lg transition-colors text-sm';
                  });
                });
              }} className="space-y-3.5">
                <div>
                  <input type="text" name="name" required placeholder="Your Full Name *" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-gold outline-none text-sm transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <input type="tel" name="phone" required placeholder="Phone Number *" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-gold outline-none text-sm transition-colors" />
                  <input type="email" name="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-gold outline-none text-sm transition-colors" />
                </div>
                <div>
                  <textarea name="message" required placeholder="How can we help you? *" rows="3" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-gold outline-none text-sm transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-brand-black hover:bg-gray-900 text-brand-white font-medium rounded-lg transition-colors shadow-md text-sm">
                  Send Message
                </button>
              </form>
            </FadeUp>

            {/* Embedded Google Map Container (Bottom) */}
            <FadeUp delay={0.25} className="w-full h-[220px] sm:h-[260px] rounded-xl overflow-hidden shadow-md border border-gray-200 relative group">
              <iframe
                title="SRI LAKSHMI TILES AND GRANITES Showroom Location"
                src="https://maps.google.com/maps?q=SRI+LAKSHMI+TILES+AND+GRANITES,+Madurai+-+Rameswaram+Hwy,+Pattinamkathan,+Ramanathapuram,+Tamil+Nadu+623536&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              ></iframe>
              <a
                href="https://maps.google.com/?q=SRI+LAKSHMI+TILES+AND+GRANITES,+Madurai+-+Rameswaram+Hwy,+Pattinamkathan,+Ramanathapuram,+Tamil+Nadu+623536"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-brand-black text-brand-white hover:bg-brand-gold text-xs px-3.5 py-2 rounded-lg font-medium shadow-lg transition-colors flex items-center gap-1.5 z-10"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-gold group-hover:text-white" />
                <span>Get Directions</span>
              </a>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
