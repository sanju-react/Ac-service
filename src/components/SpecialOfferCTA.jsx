import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Snowflake, 
  PhoneCall, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

export default function SpecialOfferCTA({ onBookService }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-ice-50 relative z-10 overflow-hidden w-full clear-both">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Banner Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-deep-600 via-deep-700 to-navy-900 text-white p-8 sm:p-14 shadow-2xl border border-ice-400/30 w-full"
        >
          {/* Glowing Ambient Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-ice-400/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyanAccent-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Snowflake Icons */}
          <Snowflake className="absolute top-8 right-12 w-16 h-16 text-white/10 animate-spin-slow pointer-events-none" />
          <Snowflake className="absolute bottom-6 left-8 w-12 h-12 text-white/10 animate-float pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              
              {/* Promo Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-400/20 border border-ice-300/30 text-ice-200 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-ice-300" />
                <span>Priority AC Service & Instant Booking</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to Enjoy Frosty, Crystal-Clean Cooling?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-ice-100/90 max-w-2xl leading-relaxed">
                Book your AC service today. Our certified technicians arrive within 45 to 60 minutes with all diagnostic gear and genuine spare parts.
              </p>

              {/* Response Timer Badge */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs font-bold text-ice-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-ice-300" /> Dispatch Window:
                </span>
                
                <div className="flex items-center gap-2 font-mono font-bold text-sm">
                  <span className="px-3 py-1 bg-white/15 rounded-lg border border-white/20">
                    Same-Day Instant Dispatch
                  </span>
                </div>
              </div>

              {/* Trust Checkmarks */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-ice-100">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ice-300" /> Same-day 45-60 min arrival
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ice-300" /> Guaranteed service warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ice-300" /> 100% Genuine OEM parts
                </span>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 justify-center">
              <button
                onClick={onBookService}
                className="w-full py-4 px-8 rounded-2xl bg-white text-navy-900 hover:bg-ice-50 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <Calendar className="w-5 h-5 text-deep-600" />
                <span>Book AC Service Online</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline: {CONTACT_INFO.phone}</span>
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
