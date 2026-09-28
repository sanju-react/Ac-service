import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Cpu, 
  ShieldCheck, 
  Droplets, 
  Building2, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  PhoneCall,
  Calendar
} from 'lucide-react';
import { SERVICES, CONTACT_INFO, FALLBACK_IMAGE } from '../utils/constants';

const ICON_MAP = {
  Wrench,
  Cpu,
  ShieldCheck,
  Droplets,
  Building2,
  Zap,
};

export default function Services({ onSelectService, onBookService }) {
  return (
    <section id="services" className="py-24 bg-white relative z-10 overflow-hidden w-full clear-both">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ice-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyanAccent-400/10 rounded-full blur-3xl pointer-events-none" />

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
            <span>Professional AC Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Complete AC Solutions for{' '}
            <span className="text-gradient-cool">Every Space</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText leading-relaxed"
          >
            From precision residential split installation to deep jet cleaning, gas refilling, and emergency breakdown repair, we deliver ice-cold cooling and 100% satisfaction.
          </motion.p>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {SERVICES.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Wrench;

            return (
              <div
                key={service.id}
                className="group glass-card rounded-3xl overflow-hidden border border-ice-200/90 shadow-soft-card hover:shadow-card-hover flex flex-col justify-between transition-all duration-300 bg-white"
              >
                <div>
                  {/* Service Card Image with Zoom effect & badge */}
                  <div className="relative h-52 overflow-hidden bg-ice-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-deep-600/90 backdrop-blur-md shadow-sm">
                        {service.badge}
                      </span>
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md text-deep-600 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Service Type Tag */}
                    <div className="absolute bottom-4 left-4 text-white font-extrabold text-xs sm:text-sm drop-shadow-md bg-navy-950/70 px-3 py-1 rounded-lg backdrop-blur-sm">
                      {service.serviceType}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6">
                    <div className="text-[11px] font-bold text-deep-600 uppercase tracking-wider mb-1">
                      {service.tagline}
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-deep-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slateText leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Service Feature Bullets */}
                    <ul className="mt-4 space-y-2">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-navy-900 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-deep-500 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-ice-100 flex items-center justify-between gap-3 mt-4">
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-deep-600 hover:text-deep-700 group/btn"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onBookService(service.title)}
                    className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-ice-500 to-deep-600 hover:from-ice-600 hover:to-deep-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-ice-gradient border border-ice-200/80 shadow-glass flex flex-col sm:flex-row items-center justify-between gap-6 w-full"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-navy-900">
              Need Immediate AC Repair or Commercial HVAC Support?
            </h4>
            <p className="text-sm text-slateText mt-1">
              Speak directly with our expert AC dispatchers for immediate technician allocation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="px-6 py-3.5 bg-deep-600 hover:bg-deep-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {CONTACT_INFO.phone}</span>
            </a>
            <button
              onClick={() => onBookService()}
              className="px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-xl transition-all shadow-md"
            >
              Book Inspection Online
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
