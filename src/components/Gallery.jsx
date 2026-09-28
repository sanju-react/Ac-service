import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ZoomIn, 
  X, 
  CheckCircle2, 
  ArrowRight,
  SplitSquareVertical,
  Calendar
} from 'lucide-react';
import { IMAGES, FALLBACK_IMAGE } from '../utils/constants';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Split AC Inverter Installation with Concealed Copper Lines",
    category: "installation",
    categoryLabel: "AC Installation",
    image: IMAGES.modernLivingRoom,
    location: "Residential Complex",
    specs: "Daikin 1.5 Ton Dual Inverter, Vibration Dampener Brackets",
    desc: "Seamless bracket mounting with concealed conduit lines and whisper-quiet outdoor vibration isolators.",
  },
  {
    id: 2,
    title: "Refrigerant Leak Detection & Precision Gas Refilling",
    category: "repair",
    categoryLabel: "Gas Refill & Repair",
    image: IMAGES.technicianInspection,
    location: "Apartment Suite",
    specs: "Ultrasonic Sniffer Detection, Nitrogen Pressure Sealing, R32 Charge",
    desc: "Fixed a micro-leak on the flare joint, performed vacuum hold test, and restored superheat cooling to factory specs.",
  },
  {
    id: 3,
    title: "High-Pressure Jet Foam Coil Sanitization",
    category: "cleaning",
    categoryLabel: "AC Jet Servicing",
    image: IMAGES.acMaintenance,
    location: "Villa Residence",
    specs: "Jet-Pump Chemical Wash, Blower Wheel Extraction, Drain Flush",
    desc: "Removed years of accumulated mold and dust buildup, boosting airflow CFM by 45% and eliminating odors.",
  },
  {
    id: 4,
    title: "Commercial Ceiling Cassette AC Multi-Zone Maintenance",
    category: "commercial",
    categoryLabel: "Commercial AC",
    image: IMAGES.commercialHVAC,
    location: "Corporate Office Hub",
    specs: "8-Way Ceiling Cassettes, VRF Airflow Balancing",
    desc: "Engineered balanced airflow zones for 6,000 sq.ft office floor with periodic preventative maintenance.",
  },
  {
    id: 5,
    title: "Compressor Capacitor & Smart Digital PCB Board Replacement",
    category: "repair",
    categoryLabel: "AC Repair",
    image: IMAGES.technicianTools,
    location: "Urban Loft",
    specs: "OEM 55uF Dual Run Capacitor, Surge Protection Module",
    desc: "Restored emergency cooling during peak summer heatwave with genuine OEM components within 45 minutes.",
  },
  {
    id: 6,
    title: "Comprehensive Multi-Point AC Servicing & Tune-Up",
    category: "cleaning",
    categoryLabel: "AC Maintenance",
    image: IMAGES.technicianWorking,
    location: "Townhouse Residence",
    specs: "Amp Draw Diagnostic, Thermostat Calibration, Filter Sanitization",
    desc: "Comprehensive semi-annual servicing resulting in 22% reduction in monthly power consumption.",
  }
];

export default function Gallery({ onBookService }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'installation', label: 'AC Installation' },
    { id: 'cleaning', label: 'Jet Servicing & Clean' },
    { id: 'repair', label: 'Repair & Diagnostics' },
    { id: 'commercial', label: 'Commercial AC' },
    { id: 'before-after', label: '✨ Before & After Results' },
  ];

  const filteredItems = selectedFilter === 'all'
    ? GALLERY_ITEMS
    : selectedFilter === 'before-after'
    ? []
    : GALLERY_ITEMS.filter(item => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-24 bg-ice-50 relative z-10 w-full clear-both">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-ice-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-600" />
            <span>Proven Service Excellence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Our Work Speaks{' '}
            <span className="text-gradient-cool">For Itself</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            Explore real AC service results, precision split installations, and deep antimicrobial jet cleanings performed by our certified technicians.
          </motion.p>
        </div>

        {/* Category Filters Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedFilter === cat.id
                  ? 'bg-deep-600 text-white shadow-md shadow-deep-600/25 scale-105'
                  : 'bg-white text-slateText hover:text-navy-900 border border-ice-200/90 hover:bg-ice-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* INTERACTIVE BEFORE & AFTER SLIDER OR GALLERY GRID */}
        {selectedFilter === 'before-after' ? (
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border border-ice-200 shadow-2xl bg-white w-full">
            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-deep-100 text-deep-700 text-xs font-bold uppercase tracking-wider">
                Jet Cleaning Transformation
              </span>
              <h3 className="text-2xl font-extrabold text-navy-900 mt-2">
                AC Filter & Coil Jet Wash: Before vs After
              </h3>
              <p className="text-sm text-slateText mt-1">
                Drag the interactive slider below to see how our high-pressure antibacterial wash thoroughly clears clogged evaporator coils.
              </p>
            </div>

            {/* Before / After Container */}
            <div className="relative w-full h-[340px] sm:h-[450px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-ice-200">
              {/* After Image */}
              <img
                src={IMAGES.filterCleaningAfter}
                alt="Cleaned AC Coil"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                AFTER: 100% Cleaned & Sanitized
              </div>

              {/* Before Image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={IMAGES.filterCleaningBefore}
                  alt="Dirty Clogged AC Filter"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                <div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  BEFORE: Choked with Dust & Dirt
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-deep-600 text-white shadow-xl flex items-center justify-center border-2 border-white">
                  <SplitSquareVertical className="w-5 h-5" />
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                aria-label="Comparison slider"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ice-100">
              <div className="text-xs text-slateText text-center sm:text-left">
                <strong>Result:</strong> +45% Enhanced Airflow, Faster Room Chilling, Zero Foul Odors.
              </div>
              <button
                onClick={onBookService}
                className="px-6 py-2.5 rounded-xl bg-deep-600 hover:bg-deep-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Jet Servicing</span>
              </button>
            </div>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="glass-card rounded-3xl overflow-hidden border border-ice-200/90 shadow-soft-card hover:shadow-card-hover cursor-pointer group bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-ice-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-deep-600/95 backdrop-blur-md shadow-sm">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-navy-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ZoomIn className="w-4 h-4 text-deep-600" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <span className="text-[11px] font-semibold text-ice-200 uppercase tracking-wider">
                        {item.location}
                      </span>
                      <h3 className="text-base font-bold text-white line-clamp-1 mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-slateText leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <div className="pt-3 border-t border-ice-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-deep-600">View Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 text-deep-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {activeLightboxItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-ice-200"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveLightboxItem(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-navy-900 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="h-72 sm:h-96 w-full relative bg-ice-100">
                  <img
                    src={activeLightboxItem.image}
                    alt={activeLightboxItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-deep-600 text-white text-xs font-bold shadow-md">
                      {activeLightboxItem.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="text-xs font-bold text-deep-600 uppercase tracking-wider">
                    {activeLightboxItem.location}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-1">
                    {activeLightboxItem.title}
                  </h3>
                  
                  <p className="mt-3 text-sm text-slateText leading-relaxed">
                    {activeLightboxItem.desc}
                  </p>

                  <div className="mt-4 p-4 rounded-2xl bg-ice-50 border border-ice-200">
                    <div className="text-xs font-bold text-navy-900">Service Specifications & Diagnostic Scope:</div>
                    <div className="text-xs text-slateText mt-1">{activeLightboxItem.specs}</div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ice-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AC Service Completed with 100% Customer Satisfaction</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveLightboxItem(null);
                        onBookService();
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-deep-600 hover:bg-deep-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Similar AC Service</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
