import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Calendar,
  PhoneCall
} from 'lucide-react';
import { CONTACT_INFO, FALLBACK_IMAGE } from '../utils/constants';

export default function ServiceModal({ service, onClose, onBookService }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-ice-200 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-navy-900 flex items-center justify-center hover:bg-white transition-colors shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner with Photo */}
          <div className="h-56 sm:h-64 relative bg-ice-100">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />

            <div className="absolute bottom-5 left-6 right-6 text-white">
              <span className="px-3 py-1 rounded-full bg-deep-600/90 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {service.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Quick Specs Pill Row */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-ice-50 border border-ice-200 text-center">
              <div>
                <div className="text-[10px] font-bold text-slateText uppercase">Category</div>
                <div className="text-xs sm:text-sm font-extrabold text-deep-700 mt-0.5">{service.serviceType}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slateText uppercase">Duration</div>
                <div className="text-xs sm:text-sm font-extrabold text-navy-900 mt-0.5">{service.duration}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slateText uppercase">Warranty</div>
                <div className="text-xs sm:text-sm font-extrabold text-emerald-600 mt-0.5">{service.warranty}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-deep-600 uppercase tracking-wider mb-2">
                Detailed Scope of Work
              </h4>
              <p className="text-xs sm:text-sm text-slateText leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Deliverables Checklist */}
            <div>
              <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                What's Included in This Service:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-navy-900 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Footer with Phone 9998814838 */}
            <div className="pt-4 border-t border-ice-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="text-xs font-bold text-navy-900 hover:text-deep-600 flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-deep-600" />
                <span>Call Helpline: {CONTACT_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookService(service.title);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-ice-500 to-deep-600 hover:from-ice-600 hover:to-deep-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Service Now</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
