import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Search, 
  HelpCircle, 
  MessageCircleQuestion, 
  PhoneCall,
  Calendar
} from 'lucide-react';
import { FAQS, CONTACT_INFO } from '../utils/constants';

export default function FAQ({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Emergency', 'Brands', 'Troubleshooting', 'Booking'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative z-10 overflow-hidden w-full clear-both">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-ice-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-deep-600" />
            <span>Got Questions? We Have Answers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Frequently Asked <span className="text-gradient-cool">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            Everything you need to know about our AC installation, emergency repair, gas refilling, jet cleaning, and warranty policies.
          </motion.p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slateText absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. gas, brand)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-ice-50/70 border border-ice-200 text-xs sm:text-sm text-navy-900 placeholder:text-slateText focus:outline-none focus:ring-2 focus:ring-deep-500/20 focus:border-deep-500 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-deep-600 text-white shadow-sm'
                    : 'bg-ice-50 text-slateText hover:text-navy-900 hover:bg-ice-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 w-full">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-ice-50/70 border-deep-300 shadow-md'
                      : 'bg-white border-ice-200 hover:border-ice-300 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-ice-100 text-deep-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-navy-900">
                        {faq.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-deep-600 text-white rotate-180' : 'bg-ice-100 text-navy-900'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slateText leading-relaxed border-t border-ice-200/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 p-6 rounded-3xl bg-ice-50 border border-ice-200">
              <MessageCircleQuestion className="w-10 h-10 text-slateText mx-auto mb-2" />
              <p className="text-sm font-bold text-navy-900">No questions matched your query.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs font-bold text-deep-600 underline"
              >
                Clear filter & view all FAQs
              </button>
            </div>
          )}
        </div>

        {/* Bottom Contact Help Card with phone 9998814838 */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-ice-gradient border border-ice-200/80 shadow-soft-card flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <div>
            <h4 className="text-base sm:text-lg font-extrabold text-navy-900">
              Still have questions about your AC problem?
            </h4>
            <p className="text-xs sm:text-sm text-slateText mt-1">
              Call our helpline directly at <strong>{CONTACT_INFO.phone}</strong> for instant advice and booking.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl bg-white text-navy-900 border border-ice-200 font-bold text-xs flex items-center gap-2 hover:bg-ice-50 transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-deep-600" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-deep-600 hover:bg-deep-700 text-white font-bold text-xs transition-all shadow-md shadow-deep-600/20 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
