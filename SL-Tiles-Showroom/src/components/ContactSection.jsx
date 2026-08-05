import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem, ScaleUp } from './animations/MotionWrappers';
import { useLeadCapture } from '../context/LeadCaptureContext';
import { openWhatsApp } from '../utils/whatsappUtils';
import { useData } from '../context/DataContext';

const ContactSection = () => {
  const { captureLead } = useLeadCapture();
  const { settings } = useData();

  const whatsappNumber = settings?.whatsappNumber || '+918608666441';
  const emailAddress = settings?.emailAddress || 'hello@luxetiles.com';
  const address = settings?.address || '13-3011-10, Muniyasamy Nagar, Rameswaram ECR Road, Ramanathapuram';

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
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-1/2">
            <FadeUp>
              <h2 className="text-3xl md:text-5xl font-bold font-luxury text-brand-black mb-4">Visit Our Showroom</h2>
              <p className="text-brand-textMuted text-lg mb-12">Experience the luxury firsthand. Our design experts are ready to turn your vision into reality.</p>
            </FadeUp>
            
            <StaggerContainer className="space-y-6 lg:space-y-8">
              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Showroom Address</h4>
                  <p className="text-brand-textMuted mt-1">{address}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Phone Number</h4>
                  <p className="text-brand-textMuted mt-1">{whatsappNumber}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Email Address</h4>
                  <p className="text-brand-textMuted mt-1">{emailAddress}</p>
                </div>
              </StaggerItem>

              <StaggerItem className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury font-semibold text-brand-black">Working Hours</h4>
                  <p className="text-brand-textMuted mt-1">Monday - Sunday: 10:00 AM - 8:00 PM</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right Column: Contact Form & Action */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <FadeUp delay={0.2} className="w-full h-full flex flex-col justify-center bg-brand-lightBg p-8 rounded-xl border border-brand-gold/10 shadow-xl shadow-brand-black/5">
              <h3 className="text-2xl font-luxury font-bold text-brand-black mb-2">Send us a Message</h3>
              <p className="text-brand-textMuted text-sm mb-6">Fill out the form below and our team will get back to you shortly.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const btn = e.target.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Sending...';
                btn.disabled = true;
                
                // We use dynamic import so it doesn't break if not available
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
                    btn.className = 'w-full py-3 bg-green-600 text-white font-medium rounded-sm transition-colors';
                    e.target.reset();
                    setTimeout(() => {
                      btn.innerHTML = 'Send Message';
                      btn.disabled = false;
                      btn.className = 'w-full py-3 bg-brand-black hover:bg-gray-900 text-brand-white font-medium rounded-sm transition-colors shadow-md';
                    }, 3000);
                  }).catch(() => {
                    btn.innerHTML = 'Error! Try WhatsApp';
                    btn.className = 'w-full py-3 bg-red-600 text-white font-medium rounded-sm transition-colors';
                  });
                });
              }} className="space-y-4">
                <div>
                  <input type="text" name="name" required placeholder="Your Full Name *" className="w-full px-4 py-4 md:py-3 min-h-[48px] bg-white border border-gray-200 rounded-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="tel" name="phone" required placeholder="Phone Number *" className="w-full px-4 py-4 md:py-3 min-h-[48px] bg-white border border-gray-200 rounded-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" />
                  <input type="email" name="email" placeholder="Email Address" className="w-full px-4 py-4 md:py-3 min-h-[48px] bg-white border border-gray-200 rounded-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors" />
                </div>
                <div>
                  <textarea name="message" required placeholder="How can we help you? *" rows="4" className="w-full px-4 py-4 md:py-3 min-h-[120px] bg-white border border-gray-200 rounded-sm focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 md:py-3 min-h-[48px] bg-brand-black hover:bg-gray-900 text-brand-white font-medium rounded-sm transition-colors shadow-md">
                  Send Message
                </button>
              </form>
            </FadeUp>
            
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
