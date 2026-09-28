import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Interactive3DShowcase from './components/Interactive3DShowcase';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import SpecialOfferCTA from './components/SpecialOfferCTA';
import FAQ from './components/FAQ';
import ContactAndBooking from './components/ContactAndBooking';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ServiceModal from './components/ServiceModal';
import BookingModal from './components/BookingModal';
export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [preselectedServiceTitle, setPreselectedServiceTitle] = useState('');

  // Handle Book Service trigger
  const handleOpenBooking = (serviceName = '') => {
    setPreselectedServiceTitle(serviceName);
    setBookingModalOpen(true);
  };

  // Scroll to section helper
  const handleExploreServices = (e) => {
    e?.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-navy-900 font-sans selection:bg-ice-200 selection:text-deep-700 antialiased overflow-x-hidden">
      
      {/* 1. Floating Sticky Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Main Content Container */}
      <main id="main-content" className="w-full">
        {/* Hero Section with 3D Split AC + Live Airflow & Controls */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleExploreServices}
        />

        {/* 3. Services Section */}
        <Services
          onSelectService={(service) => setSelectedServiceForModal(service)}
          onBookService={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* 4. Interactive 3D Cooling Simulator */}
        <Interactive3DShowcase
          onBookService={() => handleOpenBooking('AC Jet Servicing & Maintenance')}
        />

        {/* 5. About Us & Stats Section */}
        <About
          onBookService={() => handleOpenBooking('Certified AC Inspection')}
        />

        {/* 6. Why Choose Us Section */}
        <WhyChooseUs
          onBookService={() => handleOpenBooking('AC Fault Diagnostic')}
        />

        {/* 7. How It Works Timeline Process */}
        <HowItWorks
          onBookService={() => handleOpenBooking()}
        />

        {/* 8. Our Work Gallery & Before/After Comparison */}
        <Gallery
          onBookService={() => handleOpenBooking('AC Deep Jet Cleaning')}
        />

        {/* 9. Customer Testimonials Carousel */}
        <Testimonials />

        {/* 10. Special Instant Booking Banner */}
        <SpecialOfferCTA
          onBookService={() => handleOpenBooking('Priority AC Service')}
        />

        {/* 11. FAQ Accordion Section */}
        <FAQ
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 12. Contact & Direct Appointment Booking */}
        <ContactAndBooking
          initialService={preselectedServiceTitle}
        />
      </main>

      {/* 13. Luxury Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onSelectService={(service) => setSelectedServiceForModal(service)}
      />

      {/* 14. Floating 24/7 WhatsApp Dispatch & Emergency Hotline */}
      <WhatsAppButton
        onOpenBooking={() => handleOpenBooking('Emergency AC Breakdown')}
      />

      {/* Service Details Deep-Dive Modal */}
      <ServiceModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={(serviceTitle) => handleOpenBooking(serviceTitle)}
      />

      {/* Global Quick Appointment Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedServiceTitle}
      />

    </div>
  );
}
