import React, { useState } from 'react';
import { 
  Snowflake, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SERVICES, CONTACT_INFO } from '../utils/constants';

export default function Footer({ onOpenBooking, onSelectService }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-ice-200/80 pt-20 pb-12 relative z-10 overflow-hidden w-full clear-both">
      {/* Background soft blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ice-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-ice-200/80 w-full">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-deep-600 to-ice-400 flex items-center justify-center text-white shadow-md shadow-ice-400/30">
                <Snowflake className="w-5 h-5 animate-pulse-subtle" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-navy-900 leading-tight">
                  Navkar <span className="text-deep-600">AC</span>
                  <span className="text-xs ml-1.5 px-1.5 py-0.5 rounded-full bg-ice-100 text-deep-700 font-bold uppercase tracking-wider">
                    Sales & Service
                  </span>
                </span>
                <span className="text-[10px] text-slateText tracking-wider uppercase font-semibold">
                  Raghav Vishwakarma AC Repairing
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slateText leading-relaxed max-w-sm">
              Professional residential & commercial AC repair, high-pressure jet wash, gas refilling, and new AC installation services led by master technician Raghav Vishwakarma.
            </p>

            {/* Certifications Badge */}
            <div className="p-3.5 rounded-2xl bg-white border border-ice-200 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-navy-900">Raghav Vishwakarma Certified HVAC</div>
                <div className="text-[10px] text-slateText">100% Genuine Spare Parts Guaranteed</div>
              </div>
            </div>

            {/* Call Box: 9998814838 */}
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deep-600 hover:bg-deep-700 text-white text-xs font-bold transition-all shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Raghav: {CONTACT_INFO.phone}</span>
            </a>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slateText">
              <li><a href="#home" className="hover:text-deep-600 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-deep-600 transition-colors">AC Services</a></li>
              <li><a href="#3d-experience" className="hover:text-deep-600 transition-colors">3D Climate Simulator</a></li>
              <li><a href="#about" className="hover:text-deep-600 transition-colors">About Raghav Vishwakarma</a></li>
              <li><a href="#why-us" className="hover:text-deep-600 transition-colors">Why Navkar AC</a></li>
              <li><a href="#gallery" className="hover:text-deep-600 transition-colors">Work Gallery</a></li>
              <li><a href="#reviews" className="hover:text-deep-600 transition-colors">Customer Reviews</a></li>
              <li><a href="#faq" className="hover:text-deep-600 transition-colors">FAQ & Support</a></li>
              <li><a href="#contact" className="hover:text-deep-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* AC Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider">
              Navkar AC Services
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slateText">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s)}
                    className="hover:text-deep-600 transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-deep-600 font-bold hover:underline flex items-center gap-1 mt-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book AC Service Online</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-navy-900 uppercase tracking-wider">
              Direct Contact & Support
            </h4>
            <div className="space-y-2 text-xs text-slateText">
              <div>Raghav Vishwakarma: <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="font-bold text-deep-700 hover:underline">{CONTACT_INFO.phone}</a></div>
              <div>WhatsApp Chat: <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 hover:underline">{CONTACT_INFO.phone}</a></div>
              <div>Email: <a href="mailto:support@navkaracservice.com" className="font-medium text-navy-900">support@navkaracservice.com</a></div>
            </div>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-2">
                Seasonal Maintenance Alerts
              </h5>
              {newsletterSubscribed ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ice-200 text-xs text-navy-900 placeholder:text-slateText focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-deep-600 hover:bg-deep-700 text-white text-xs font-bold transition-all"
                    >
                      Join
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Operational Hours */}
            <div className="pt-2 text-xs text-slateText space-y-1">
              <div className="font-bold text-navy-900">Emergency Breakdown Service:</div>
              <div><strong className="text-deep-700">24 Hours / 7 Days a Week Available</strong></div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slateText w-full">
          <div>
            © {new Date().getFullYear()} Navkar AC Sales & Service. Master Technician: <strong>Raghav Vishwakarma ({CONTACT_INFO.phone})</strong>.
          </div>

          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-deep-600 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-deep-600 transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-deep-600 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
