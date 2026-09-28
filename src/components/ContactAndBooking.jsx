import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, BRANDS, CONTACT_INFO } from '../utils/constants';

export default function ContactAndBooking({ initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'High-Pressure AC Jet Servicing',
    brand: 'Daikin',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (8:00 AM - 11:00 AM)',
    address: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    'Emergency Immediate (Within 45-60 Mins)',
    'Morning (8:00 AM - 11:00 AM)',
    'Midday (11:00 AM - 2:00 PM)',
    'Afternoon (2:00 PM - 5:00 PM)',
    'Evening (5:00 PM - 8:00 PM)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomRef = 'NAV-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomRef);
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

  // WhatsApp formatted message generator for Raghav Vishwakarma (9998814838)
  const getWhatsAppBookingUrl = () => {
    const text = encodeURIComponent(
      `Hello Raghav Vishwakarma ji! (Navkar AC Sales & Service)\n` +
      `I would like to book an AC Service appointment (#${bookingRef}).\n\n` +
      `*Customer Name:* ${formData.name || 'Customer'}\n` +
      `*Mobile Number:* ${formData.phone}\n` +
      `*Service Required:* ${formData.service}\n` +
      `*AC Brand:* ${formData.brand}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Time Window:* ${formData.timeSlot}\n` +
      `*Service Address:* ${formData.address || 'Address provided'}\n` +
      `*Problem Notes:* ${formData.message || 'Doorstep AC Service'}`
    );
    return `https://wa.me/919998814838?text=${text}`;
  };

  return (
    <section id="contact" className="py-24 bg-ice-50 relative z-10 overflow-hidden w-full clear-both">
      {/* Ambient background decoration */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-ice-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyanAccent-400/15 rounded-full blur-3xl pointer-events-none" />

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
            <span>24/7 Priority AC Service Booking</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Contact <span className="text-gradient-cool">Navkar AC Sales & Service</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            Book your appointment online in 60 seconds or call <strong>Raghav Vishwakarma</strong> directly at <strong>{CONTACT_INFO.phone}</strong> for quick 45-minute doorstep AC repair.
          </motion.p>
        </div>

        {/* 2-Column Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Left Column: Contact Cards & Business Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6 w-full"
          >
            {/* Quick Contact Info Cards */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-ice-200 shadow-soft-card bg-white space-y-6">
              <h3 className="text-xl font-extrabold text-navy-900 pb-3 border-b border-ice-100">
                Direct Contact & Support
              </h3>

              <div className="space-y-4">
                {/* Phone: 9998814838 */}
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-ice-50/80 hover:bg-ice-100 border border-ice-200/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-deep-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-deep-600 uppercase tracking-wider">Direct Call Raghav Vishwakarma</div>
                    <div className="text-base font-extrabold text-navy-900 mt-0.5">{CONTACT_INFO.phone}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Technician Dispatch Ready
                    </div>
                  </div>
                </a>

                {/* WhatsApp: 9998814838 */}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Official WhatsApp Chat</div>
                    <div className="text-sm font-bold text-navy-900 mt-0.5">{CONTACT_INFO.phone}</div>
                    <div className="text-[11px] text-slateText">Quick response within 2 minutes</div>
                  </div>
                </a>

                {/* Business Info */}
                <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-ice-50/80 border border-ice-200/60">
                  <div className="w-10 h-10 rounded-xl bg-ice-100 text-deep-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slateText uppercase tracking-wider">Navkar AC Service Hours</div>
                    <div className="text-xs font-bold text-navy-900 mt-0.5">Monday to Sunday – 24/7 Available</div>
                    <div className="text-[11px] text-slateText mt-0.5 font-medium">
                      Doorstep service across all residential & commercial areas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Coverage Area Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-ice-200 shadow-md h-48 bg-ice-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              
              <div className="relative z-10 text-center p-5 glass-panel rounded-2xl border border-white/90 shadow-lg max-w-sm">
                <div className="w-8 h-8 rounded-full bg-deep-600 text-white flex items-center justify-center mx-auto mb-1.5 shadow-md animate-bounce">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs font-extrabold text-navy-900">Navkar AC Mobile Service Vans</div>
                <div className="text-[11px] text-slateText mt-0.5">
                  Raghav Vishwakarma & certified technicians on standby ready for quick 45-minute doorstep arrival.
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Appointment Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 w-full"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-ice-200 shadow-xl bg-white relative w-full">
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* Success View */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                      Navkar AC Booking Confirmed
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-3">
                      Thank You, {formData.name || 'Valued Customer'}!
                    </h3>

                    <p className="mt-2 text-sm text-slateText max-w-md mx-auto">
                      Your AC service request <strong>#{bookingRef}</strong> has been received by <strong>Raghav Vishwakarma</strong>. Our technician will call you at <strong>{formData.phone}</strong> shortly.
                    </p>

                    {/* Booking Details Card */}
                    <div className="mt-6 p-5 rounded-2xl bg-ice-50 border border-ice-200 text-left max-w-md mx-auto space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slateText">Service Type:</span>
                        <strong className="text-navy-900">{formData.service}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slateText">AC Brand:</span>
                        <strong className="text-navy-900">{formData.brand}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slateText">Preferred Slot:</span>
                        <strong className="text-deep-700">{formData.date} ({formData.timeSlot})</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slateText">Location:</span>
                        <strong className="text-navy-900 truncate max-w-[200px]">{formData.address || 'Standard Location'}</strong>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getWhatsAppBookingUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Booking to Raghav on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData(prev => ({ ...prev, name: '', phone: '', email: '', message: '' }));
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ice-100 hover:bg-ice-200 text-navy-900 text-xs font-bold transition-all"
                      >
                        Book Another Service
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Main Appointment Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div>
                      <span className="text-[11px] font-bold text-deep-600 uppercase tracking-wider">
                        Navkar AC Doorstep Service Request
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-0.5">
                        Book AC Service with Raghav Vishwakarma
                      </h3>
                      <p className="text-xs sm:text-sm text-slateText mt-1">
                        Fill in your details below. Our certified technician will arrive at your scheduled time.
                      </p>
                    </div>

                    {/* Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          placeholder="Your Mobile Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Service Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          Select AC Service *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* AC Brand & Preferred Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          AC Brand
                        </label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        >
                          {BRANDS.map((brand, i) => (
                            <option key={i} value={brand}>{brand}</option>
                          ))}
                          <option value="Other">Other Brand</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          required
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Preferred Time Slot */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Preferred Arrival Window
                      </label>
                      <select
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                      >
                        {timeSlots.map((slot, i) => (
                          <option key={i} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        Service Location / Address *
                      </label>
                      <input
                        type="text"
                        required
                        name="address"
                        placeholder="House / Flat No., Society / Building, Area / Landmark"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
                      />
                    </div>

                    {/* Issue description */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                        AC Problem / Symptoms (Optional)
                      </label>
                      <textarea
                        rows={2}
                        name="message"
                        placeholder="e.g. AC blowing warm air, water leakage, strange rattling noise, gas refilling needed..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-ice-50/60 border border-ice-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-ice-500 via-deep-600 to-deep-700 hover:from-ice-600 hover:to-deep-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-deep-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Scheduling Raghav Vishwakarma & Team...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>Confirm AC Service Booking</span>
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slateText pt-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Navkar AC Sales & Service • 100% Genuine Spare Parts Guarantee</span>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
