import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './animations/MotionWrappers';

const defaultTestimonials = [
  { 
    id: 1, 
    name: 'Vikram Singhania', 
    text: 'The exclusive Italian marble collection completely elevated the aesthetics of our new villa. The showroom staff displayed profound knowledge of global trends and guided us flawlessly. Highly recommend for premium spaces.', 
    rating: 5 
  },
  { 
    id: 2, 
    name: 'Priya Mehra', 
    text: 'Exceptional variety and unparalleled customer support! We sourced large-format porcelain tiles for our commercial project. The delivery was perfectly on schedule, with zero breakages. A truly professional showroom experience.', 
    rating: 5 
  },
  { 
    id: 3, 
    name: 'Arjun Desai', 
    text: 'Finding authentic designer tiles was proving difficult until we visited this showroom. Their diverse inventory is stunning. Pricing is transparent, and the quality justifies every penny. It is our go-to destination for architectural surfaces.', 
    rating: 5 
  },
  { 
    id: 4, 
    name: 'Dr. Shalini Verma', 
    text: 'From the moment we walked in, the service was impeccable. They helped us pair rustic wood-look planks with elegant mosaic backsplashes. The finishing is magnificent and the post-sale assistance was highly reassuring.', 
    rating: 4 
  },
];

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', text: '', rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('luxetiles_reviews');
    if (savedReviews) {
      try {
        setReviews([...defaultTestimonials, ...JSON.parse(savedReviews)]);
      } catch (e) {
        setReviews(defaultTestimonials);
      }
    } else {
      setReviews(defaultTestimonials);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.text.trim()) newErrors.text = 'Review description is required';
    if (formData.rating === 0) newErrors.rating = 'Please select a star rating';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newReview = {
      id: Date.now(),
      name: formData.name.trim(),
      text: formData.text.trim(),
      rating: formData.rating,
    };

    // Save to localStorage
    const savedReviews = localStorage.getItem('luxetiles_reviews');
    const existing = savedReviews ? JSON.parse(savedReviews) : [];
    const updatedUserReviews = [newReview, ...existing];
    
    localStorage.setItem('luxetiles_reviews', JSON.stringify(updatedUserReviews));

    // Update state, new reviews go first or last depending on design. We'll append them.
    setReviews((prev) => [...prev, newReview]);
    
    // Reset form
    setFormData({ name: '', text: '', rating: 0 });
    setHoverRating(0);
    setIsSubmitting(false);
    
    // Alert user
    alert("Thank you! Your review has been submitted successfully.");
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const displayedReviews = isExpanded ? reviews : reviews.slice(0, 4);

  return (
    <section className="py-20 bg-brand-lightBg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-luxury text-brand-black mb-4">What Our Clients Say</h2>
          <p className="text-brand-textMuted text-lg">Trusted by homeowners, designers, and architects.</p>
        </FadeUp>

        {/* Existing & New Reviews (Truncated to 4 initially, expandable) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {displayedReviews.map((testimonial) => (
            <StaggerItem key={testimonial.id} className="bg-brand-white p-6 sm:p-8 border border-gray-100 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              <div className="flex items-center gap-1 mb-6 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'fill-brand-gold text-brand-gold' : 'fill-transparent text-gray-200'}`} 
                  />
                ))}
              </div>
              <p className="text-brand-text italic mb-8 leading-relaxed flex-grow">"{testimonial.text}"</p>
              <h4 className="font-luxury font-semibold text-brand-black border-l-2 border-brand-gold pl-3 shrink-0">{testimonial.name}</h4>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {reviews.length > 4 && (
          <div className="text-center mb-20">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-white border border-gray-200 hover:border-brand-gold text-brand-black hover:text-brand-gold font-medium rounded-xl transition-all shadow-sm cursor-pointer"
            >
              {isExpanded ? 'Show Less Reviews ▲' : `Show More Reviews (${reviews.length - 4} More) ▼`}
            </button>
          </div>
        )}

        {/* Review Submission Form */}
        <FadeUp className="max-w-5xl mx-auto bg-brand-white p-8 md:p-12 border border-gray-100 rounded-sm shadow-md flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-5/12 text-center md:text-left">
            <h3 className="text-3xl font-luxury font-bold text-brand-black mb-4">Share Your Experience</h3>
            <p className="text-brand-textMuted text-lg leading-relaxed">We highly value your feedback. Please take a moment to leave a review of your showroom visit or our products. Your insights help us continually improve and serve you better.</p>
          </div>

          <div className="md:w-7/12 w-full">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">Overall Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, rating: star });
                      if (errors.rating) setErrors({ ...errors, rating: null });
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-8 h-8 ${star <= (hoverRating || formData.rating) ? 'fill-brand-gold text-brand-gold' : 'fill-transparent text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="text-red-500 text-xs mt-2">{errors.rating}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-brand-gold focus:ring-brand-gold'} rounded-sm text-sm transition-all outline-none focus:ring-2 focus:ring-opacity-20 text-brand-text`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-black mb-2">Your Review *</label>
              <textarea
                value={formData.text}
                onChange={(e) => {
                  setFormData({ ...formData, text: e.target.value });
                  if (errors.text) setErrors({ ...errors, text: null });
                }}
                rows="4"
                className={`w-full px-4 py-3 bg-gray-50 border ${errors.text ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-brand-gold focus:ring-brand-gold'} rounded-sm text-sm transition-all outline-none focus:ring-2 focus:ring-opacity-20 text-brand-text resize-none`}
                placeholder="Tell us about your experience..."
              ></textarea>
              {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-gold hover:bg-yellow-600 text-brand-white text-base font-medium rounded-sm transition-all shadow-lg shadow-brand-gold/20 disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default Testimonials;
