import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Truck, 
  Wrench, 
  Smile, 
  Sparkles, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Book Your AC Service",
    subtitle: "Quick 60-Second Booking",
    desc: "Select your required AC service (installation, gas refill, deep jet cleaning, or breakdown fix), enter your address, and pick a convenient appointment time.",
    icon: Calendar,
    duration: "1 Min Online",
    highlight: "Instant Booking",
  },
  {
    step: "02",
    title: "Technician Arrives",
    subtitle: "Punctual Mobile Service Van",
    desc: "Our certified master technician arrives on time, fully equipped with digital manifold gauges, jet wash pumps, and factory spare parts.",
    icon: Truck,
    duration: "45-60 Mins",
    highlight: "Fast Dispatch",
  },
  {
    step: "03",
    title: "Precision Service & Clean",
    subtitle: "Deep Sanitization & Diagnostics",
    desc: "We perform multi-point sensor testing, high-pressure antimicrobial coil jet wash, gas top-up, and clean up any mess before packing up.",
    icon: Wrench,
    duration: "45-90 Mins Service",
    highlight: "Professional Tools",
  },
  {
    step: "04",
    title: "Enjoy Pure Ice-Cold Air",
    subtitle: "Guaranteed Satisfaction & Warranty",
    desc: "Relax in sanitized, ice-cold air. Receive a digital service summary with our comprehensive service and replacement parts warranty.",
    icon: Smile,
    duration: "Warranty Included",
    highlight: "100% Satisfaction",
  },
];

export default function HowItWorks({ onBookService }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 bg-white relative z-10 overflow-hidden w-full clear-both">
      {/* Soft background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-ice-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-600" />
            <span>Simple 4-Step Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            How Our AC Service{' '}
            <span className="text-gradient-cool">Works For You</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            From booking your service to enjoying pure, frosty cooling, experience a fast, reliable, and hassle-free service journey.
          </motion.p>
        </div>

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="relative w-full">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-[10%] right-[10%] h-1 bg-gradient-to-r from-ice-200 via-deep-300 to-ice-200 rounded-full z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 w-full">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isSelected = activeStep === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-white to-ice-50/80 border-deep-400 shadow-xl shadow-deep-600/10 scale-[1.03]'
                      : 'bg-white border-ice-200 shadow-soft-card hover:border-ice-300'
                  }`}
                >
                  <div>
                    {/* Top Step Number + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-tr from-ice-500 to-deep-600 text-white shadow-md shadow-deep-600/30'
                          : 'bg-ice-100 text-deep-700'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>

                      <span className="text-3xl font-black text-ice-200">
                        {step.step}
                      </span>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="text-[11px] font-bold text-deep-600 uppercase tracking-wider mb-1">
                      {step.subtitle}
                    </div>
                    <h3 className="text-lg font-bold text-navy-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-slateText leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Step Metric Footer */}
                  <div className="mt-6 pt-4 border-t border-ice-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slateText flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-deep-500" />
                      {step.duration}
                    </span>
                    <span className="font-bold text-deep-700">
                      {step.highlight}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onBookService}
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-ice-500 via-deep-600 to-deep-700 rounded-2xl shadow-xl shadow-deep-600/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book Your AC Service Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
