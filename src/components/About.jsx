import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Award, 
  Users, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  PhoneCall,
  Wrench,
  Cpu
} from 'lucide-react';
import { IMAGES, BRANDS, CONTACT_INFO, FALLBACK_IMAGE } from '../utils/constants';

function AnimatedCounter({ target, suffix = '', decimals = 0, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animId = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * target;
      setCount(val);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInView, target, duration]);

  const display = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-US');

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function About({ onBookService }) {
  const stats = [
    { label: "AC Units Serviced", target: 5000, suffix: "+", desc: "Homes & commercial offices", icon: Users },
    { label: "Years Experience", target: 10, suffix: "+", desc: "Master HVAC engineering expertise", icon: Award },
    { label: "Certified Engineers", target: 25, suffix: "+", desc: "Trained under Raghav Vishwakarma", icon: ShieldCheck },
    { label: "Customer Rating", target: 4.9, decimals: 1, suffix: "/5", desc: "Based on 1,400+ verified ratings", icon: Star },
  ];

  return (
    <section id="about" className="py-24 bg-ice-50 relative z-10 overflow-hidden w-full clear-both">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-ice-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Split Layout: Images Left / Story Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Multilayered Imagery & Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Main Primary Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-ice-100">
              <img
                src={IMAGES.technicianWorking}
                alt="Raghav Vishwakarma AC Repairing Specialist at Navkar AC Sales and Service"
                className="w-full h-[440px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
              
              {/* Bottom image overlay caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-deep-600/90 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  Raghav Vishwakarma – Lead AC Specialist
                </span>
                <p className="mt-2 text-sm font-medium text-ice-100">
                  Navkar AC Sales & Service: Precision digital diagnostic tools & 100% genuine parts.
                </p>
              </div>
            </div>

            {/* Secondary Floating Image Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="hidden sm:block absolute -bottom-8 -right-8 w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white z-20"
            >
              <img
                src={IMAGES.acMaintenance}
                alt="AC Jet Servicing by Navkar AC"
                className="w-full h-36 object-cover bg-ice-100"
                loading="lazy"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="p-3">
                <div className="text-[11px] font-bold text-navy-900">Jet Pump Coil Wash</div>
                <div className="text-[10px] text-slateText">100% Anti-Bacterial Sanitization</div>
              </div>
            </motion.div>

            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -left-6 z-20 glass-card px-5 py-3.5 rounded-2xl border border-white/90 shadow-glass flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-ice-500 to-deep-600 text-white flex items-center justify-center font-extrabold text-base shadow-md">
                <AnimatedCounter target={10} suffix="+" />
              </div>
              <div>
                <div className="text-xs font-bold text-navy-900">Years Mastery</div>
                <div className="text-[10px] text-deep-600 font-semibold">Navkar AC Service</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Company Story & Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-deep-600" />
              <span>About Navkar AC Sales & Service</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Meet <span className="text-gradient-cool">Raghav Vishwakarma</span> & Navkar AC Team
            </h2>

            <p className="mt-5 text-base text-slateText leading-relaxed">
              Founded and managed by master HVAC engineer <strong>Raghav Vishwakarma</strong>, <strong>Navkar AC Sales & Service</strong> is one of the most trusted names in air conditioning repair, high-pressure jet cleaning, gas charging, PCB circuit troubleshooting, and commercial VRF maintenance.
            </p>

            <p className="mt-3 text-sm text-slateText leading-relaxed">
              With over 10+ years of hands-on expertise across all major brands (Daikin, Voltas, LG, Mitsubishi, Blue Star, Carrier, Samsung), Raghav Vishwakarma and his team provide honest diagnostics, upfront fixed rates, and prompt 45-minute doorstep service.
            </p>

            {/* Core Values Checklist */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                "Led by Raghav Vishwakarma (Master Tech)",
                "Same-Day 45-60 Minute Doorstep Visit",
                "100% Genuine OEM Factory Spare Parts",
                "Guaranteed Service Warranty on All Repairs",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-navy-900">{item}</span>
                </div>
              ))}
            </div>

            {/* 4 Animated Stats Counters */}
            <div className="mt-8 pt-8 border-t border-ice-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="p-4 rounded-2xl bg-white border border-ice-200/80 shadow-sm hover:shadow-md hover:border-ice-300 text-center transition-all group"
                  >
                    <div className="w-10 h-10 mx-auto rounded-xl bg-ice-100 group-hover:bg-deep-50 text-deep-600 flex items-center justify-center mb-2.5 transition-colors">
                      <StatIcon className="w-5 h-5 text-deep-600" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                      <AnimatedCounter
                        target={stat.target}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <div className="text-xs font-bold text-slateText mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onBookService}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-deep-600 hover:bg-deep-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-deep-600/25 transition-all"
              >
                <span>Book AC Service Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-ice-200 text-navy-900 hover:bg-ice-50 text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-deep-600" />
                <span>Call Raghav: {CONTACT_INFO.phone}</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Brand Logos Bar */}
        <div className="mt-20 pt-10 border-t border-ice-200/60 text-center w-full">
          <p className="text-xs font-bold text-slateText uppercase tracking-widest mb-6">
            Navkar AC Sales & Service Supports All Major AC Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 opacity-90">
            {BRANDS.map((brand, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white border border-ice-200/80 text-xs font-extrabold text-navy-900 shadow-sm hover:text-deep-600 hover:border-ice-300 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
