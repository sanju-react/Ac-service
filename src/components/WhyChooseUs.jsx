import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  Cpu, 
  CalendarCheck, 
  HeartHandshake, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Wrench,
  Calendar
} from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Certified & Experienced Technicians",
    desc: "Every technician is master certified, background-verified, and equipped with precision diagnostic instruments.",
    highlight: "100% Verified Crew"
  },
  {
    icon: Clock,
    title: "Fast 45-60 Min Response Time",
    desc: "Summer AC breakdowns can't wait. Our mobile service vans arrive quickly at your doorstep with spare parts ready.",
    highlight: "Rapid Dispatch"
  },
  {
    icon: Cpu,
    title: "100% Genuine OEM Spare Parts",
    desc: "We exclusively use factory-original capacitors, fan motors, sensors, and PC boards with official warranties.",
    highlight: "Original Parts"
  },
  {
    icon: CalendarCheck,
    title: "Punctual On-Time Appointments",
    desc: "We value your schedule. Pick convenient time slots with real-time technician arrival updates.",
    highlight: "Flexible Slots"
  },
  {
    icon: Wrench,
    title: "High-Pressure Jet Sanitization",
    desc: "We use professional waterproof jet cleaning covers and antimicrobial foams to restore crystal clean airflow.",
    highlight: "Deep Jet Clean"
  },
  {
    icon: HeartHandshake,
    title: "100% Service Satisfaction Guarantee",
    desc: "If your AC cooling isn't completely restored, our technician re-visits free of charge to resolve the problem.",
    highlight: "Warranty Included"
  }
];

export default function WhyChooseUs({ onBookService }) {
  return (
    <section id="why-us" className="py-24 bg-ice-50 relative z-10 overflow-hidden w-full clear-both">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-deep-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-ice-200/50 rounded-full blur-3xl pointer-events-none" />

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
            <span>The Navkar AC Advantage</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Why Customers Trust Our{' '}
            <span className="text-gradient-cool">AC Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText leading-relaxed"
          >
            We combine high-tech precision instruments with courteous craftsmanship to provide the most reliable cooling solutions in your area.
          </motion.p>
        </div>

        {/* 6 Grid Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 rounded-3xl border border-ice-200 shadow-soft-card hover:shadow-card-hover bg-white flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-ice-100 to-deep-50 text-deep-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-deep-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-deep-700 bg-ice-100/80 border border-ice-200">
                      {benefit.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-deep-600 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm text-slateText leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ice-100 flex items-center gap-2 text-xs font-semibold text-deep-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Quality Assurance Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Callout Banner with Phone 9998814838 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl overflow-hidden bg-gradient-to-r from-deep-900 via-deep-950 to-navy-950 text-white shadow-2xl p-8 sm:p-12 relative w-full"
        >
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-ice-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ice-400/20 text-ice-300 text-xs font-bold uppercase tracking-wider mb-3">
                <span>Fast & Reliable AC Technician On Call</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                AC stopped working or leaking water?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Call our mobile technical response van directly. A certified technician will visit your location to troubleshoot and restore chilled cooling.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ice-400 to-deep-500 hover:from-ice-300 hover:to-deep-400 text-white font-extrabold text-sm shadow-lg shadow-deep-500/30 transition-all text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {CONTACT_INFO.phone}</span>
              </a>
              <button
                onClick={onBookService}
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs text-center flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service Online</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
