import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Sparkles, 
  CheckCircle2, 
  Pause,
  Play
} from 'lucide-react';
import { TESTIMONIALS } from '../utils/constants';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="py-24 bg-white relative z-10 overflow-hidden w-full clear-both">
      {/* Background soft glowing blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-ice-100/60 to-deep-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-600" />
            <span>Verified Customer Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            What Our Customers <span className="text-gradient-cool">Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            Discover why over 5,000+ homeowners and business managers rely on our certified AC technicians for their cooling needs.
          </motion.p>
        </div>

        {/* Carousel Showcase Card */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-ice-200/90 shadow-xl bg-white w-full">
            
            {/* Top Quote Icon */}
            <div className="w-12 h-12 rounded-2xl bg-ice-100 text-deep-600 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6 rotate-180" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  {/* Star Rating & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified AC Service</span>
                    </span>
                  </div>

                  {/* Headline & Quote */}
                  <h3 className="text-lg sm:text-xl font-bold text-navy-900">
                    "{current.title}"
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slateText leading-relaxed italic">
                    "{current.quote}"
                  </p>
                </div>

                {/* Author Info & Service Used */}
                <div className="mt-8 pt-6 border-t border-ice-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-deep-300 shadow-sm bg-ice-100"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"; }}
                    />
                    <div>
                      <div className="font-extrabold text-navy-900 text-base">
                        {current.name}
                      </div>
                      <div className="text-xs text-slateText">
                        {current.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-ice-50 text-deep-700 text-xs font-semibold border border-ice-200">
                      Service: {current.serviceUsed}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Buttons & Pagination */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-ice-100">
              
              {/* Pagination dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-deep-600'
                        : 'w-2.5 bg-ice-200 hover:bg-ice-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className="p-2 rounded-xl border border-ice-200 text-slateText hover:text-navy-900 transition-colors"
                  title={autoplay ? 'Pause Autoplay' : 'Resume Autoplay'}
                >
                  {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-xl bg-ice-50 hover:bg-deep-600 hover:text-white text-navy-900 border border-ice-200 transition-colors shadow-sm"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-xl bg-deep-600 hover:bg-deep-700 text-white transition-colors shadow-sm"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
