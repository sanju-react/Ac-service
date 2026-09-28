import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Check, 
  MessageSquare, 
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, BRANDS, CONTACT_INFO } from '../utils/constants';

export default function BookingModal({ isOpen, onClose, preselectedService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || 'AC Jet Servicing & Maintenance',
    brand: 'Daikin',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (8:00 AM - 11:00 AM)',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = 'NAV-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#2563EB', '#06B6D4', '#E0F2FE']
        });
      } catch (err) {}
    }, 800);
  };

  const getWhatsAppBookingUrl = () => {
    const text = encodeURIComponent(
      `Hello Raghav Vishwakarma ji! (Navkar AC Sales & Service)\n` +
      `I have booked an AC service appointment (#${bookingRef}).\n\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Mobile Number:* ${formData.phone}\n` +
      `*AC Service:* ${formData.service}\n` +
      `*Brand:* ${formData.brand}\n` +
      `*Slot:* ${formData.date} (${formData.timeSlot})\n` +
      `*Address:* ${formData.address}`
    );
    return `https://wa.me/919998814838?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-ice-200 my-8 p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-ice-100 text-navy-900 flex items-center justify-center hover:bg-ice-200 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Booking Confirmed
            </span>

            <h3 className="text-2xl font-extrabold text-navy-900">
              AC Service Booked! Ref #{bookingRef}
            </h3>

            <p className="text-xs sm:text-sm text-slateText max-w-md mx-auto leading-relaxed">
              Our technician supervisor will call you at <strong>{formData.phone}</strong> to confirm the arrival window.
            </p>

            <div className="p-4 rounded-2xl bg-ice-50 border border-ice-200 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div><strong>Service:</strong> {formData.service}</div>
              <div><strong>Slot:</strong> {formData.date} ({formData.timeSlot})</div>
              <div><strong>Address:</strong> {formData.address}</div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsAppBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp (+91 99988 14838)</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-ice-100 hover:bg-ice-200 text-navy-900 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-deep-600 uppercase tracking-wider">
                Instant Doorstep Service
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-0.5">
                Book AC Service Appointment
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Your Mobile Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">AC Service Type *</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">AC Brand</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                >
                  {BRANDS.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                  <option value="Other">Other Brand</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">Arrival Window</label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
                >
                  <option value="Emergency ASAP (Within 45-60 Mins)">Emergency ASAP (Within 45-60 Mins)</option>
                  <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                  <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">Service Address / Location *</label>
              <input
                type="text"
                required
                placeholder="Full address, house/flat no., society, area"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-ice-50 border border-ice-200 text-xs sm:text-sm focus:outline-none focus:border-deep-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ice-500 to-deep-600 hover:from-ice-600 hover:to-deep-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Scheduling Certified Technician...</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm AC Service Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
