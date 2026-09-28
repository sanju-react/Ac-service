import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, PhoneCall, Calendar, Menu, X, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../utils/constants';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: '3D Demo', href: '#3d-experience' },
    { name: 'About Raghav Vishwakarma', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Work Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = navLinks.map(l => l.href.substring(1));
          for (const section of sections.reverse()) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 160) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-ice-500/10 border-b border-ice-200/90 py-2.5'
            : 'bg-white/90 backdrop-blur-md border-b border-ice-100 py-3'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo - Navkar AC Sales & Service */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="Navkar AC Sales and Service"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-deep-600 to-ice-400 flex items-center justify-center text-white shadow-md shadow-ice-400/30 group-hover:scale-105 transition-transform duration-300">
              <Snowflake className="w-5 h-5 animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-navy-900 leading-tight">
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

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold transition-colors duration-200 rounded-lg group ${
                    isActive
                      ? 'text-deep-600 font-bold'
                      : 'text-navy-900/80 hover:text-deep-600'
                  }`}
                >
                  {link.name}
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-ice-400 to-deep-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-ice-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Action Buttons: Direct Call & Book Service */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* 24/7 Hotline with phone 9998814838 */}
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-2.5 text-xs font-bold text-navy-900 px-3.5 py-2 rounded-xl bg-ice-50 hover:bg-ice-100 border border-ice-200/80 transition-colors shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-deep-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-slateText uppercase font-semibold">Call Raghav Vishwakarma</div>
                <span className="text-xs sm:text-sm text-deep-700 font-extrabold">{CONTACT_INFO.phone}</span>
              </div>
            </a>

            {/* Book Service Button */}
            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-ice-500 via-deep-600 to-deep-700 rounded-xl shadow-md shadow-deep-600/20 hover:shadow-lg hover:shadow-deep-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Calendar className="w-4 h-4" />
              <span>Book AC Service</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-navy-900 hover:bg-ice-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden w-full bg-white/95 backdrop-blur-xl p-6 shadow-2xl border-b border-ice-200 z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-navy-900 hover:bg-ice-50 hover:text-deep-600 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slateText" />
                  </a>
                ))}

                <div className="pt-4 mt-2 border-t border-ice-100 flex flex-col gap-3">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-deep-700 bg-ice-50 rounded-xl border border-ice-200"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Raghav: {CONTACT_INFO.phone}</span>
                  </a>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-ice-500 to-deep-600 rounded-xl shadow-lg shadow-deep-600/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book AC Service Online</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
