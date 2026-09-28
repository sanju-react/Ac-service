import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  PhoneCall, 
  X, 
  Zap
} from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

export default function WhatsAppButton({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyMessage = encodeURIComponent("🚨 Urgent AC Breakdown! My AC has stopped cooling. Raghav Vishwakarma ji, please send Navkar AC mobile service van immediately.");
  const generalInquiryMessage = encodeURIComponent("Hello Navkar AC Sales & Service! Raghav Vishwakarma ji, I want to book an AC servicing and checkup visit.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Quick Action Flyout Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="w-72 sm:w-80 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-ice-200 shadow-2xl space-y-3.5 text-navy-900"
          >
            <div className="flex items-center justify-between pb-2 border-b border-ice-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  24/7 AC Technician Dispatch
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slateText hover:text-navy-900 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slateText">
              Need fast AC repair or jet servicing? Chat directly with our technician dispatch team or call <strong>{CONTACT_INFO.phone}</strong>.
            </p>

            {/* Emergency WhatsApp Button */}
            <a
              href={`https://wa.me/919998814838?text=${emergencyMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all group"
            >
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Emergency 45-Min AC Repair</span>
            </a>

            {/* General Inquiry WhatsApp */}
            <a
              href={`https://wa.me/919998814838?text=${generalInquiryMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-ice-50 hover:bg-ice-100 border border-ice-200 text-navy-900 text-xs font-bold transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat (+91 99988 14838)</span>
            </a>

            {/* Call Direct: 9998814838 */}
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-3 p-3 rounded-2xl bg-ice-50 hover:bg-ice-100 border border-ice-200 text-navy-900 text-xs font-bold transition-all"
            >
              <PhoneCall className="w-4 h-4 text-deep-600" />
              <span>Direct Call: {CONTACT_INFO.phone}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {/* Helper tooltip pill on desktop */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-ice-200 text-navy-900 shadow-md text-xs font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Need AC Service? Chat Now</span>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none group"
          aria-label="Open WhatsApp Dispatch"
        >
          {/* Animated pulsing outer ring */}
          <span className="absolute -inset-1 rounded-2xl bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
          <MessageSquare className="w-7 h-7 relative z-10" />
        </button>
      </div>

    </div>
  );
}
