import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Award,
  HelpCircle
} from 'lucide-react';
import { PRICING_PLANS } from '../utils/constants';

export default function Pricing({ onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('onetime'); // 'onetime' vs 'annual'

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-ice-100/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-deep-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
            <span>Honest & Upfront Rates</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Transparent Pricing.{' '}
            <span className="text-gradient-cool">Zero Hidden Costs.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText leading-relaxed"
          >
            Choose between flexible one-time servicing or comprehensive Annual Maintenance Contracts (AMC) with guaranteed priority dispatch.
          </motion.p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-ice-100/80 border border-ice-200">
            <button
              onClick={() => setBillingCycle('onetime')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === 'onetime'
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-slateText hover:text-navy-900'
              }`}
            >
              One-Time Servicing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                billingCycle === 'annual'
                  ? 'bg-deep-600 text-white shadow-md shadow-deep-600/20'
                  : 'text-slateText hover:text-navy-900'
              }`}
            >
              <span>Annual AMC (2-4 Visits)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-emerald-950 uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const isPopular = plan.popular;
            
            // Adjust displayed demo rate based on billing cycle
            const priceDisplay = billingCycle === 'annual'
              ? plan.id === 'basic' ? '$99' : plan.id === 'standard' ? '$169' : '$249'
              : plan.price;

            const periodDisplay = billingCycle === 'annual' ? '/ year (2 services)' : '/ unit visit';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-gradient-to-b from-white via-ice-50/50 to-white border-2 border-deep-500 shadow-2xl shadow-deep-600/15 lg:-translate-y-2'
                    : 'bg-white border border-ice-200 shadow-soft-card hover:shadow-card-hover'
                }`}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-ice-500 to-deep-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
                      ⭐ Most Popular Choice
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-navy-900">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slateText mt-1">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-ice-100">
                    <span className="text-4xl sm:text-5xl font-black text-navy-900 tracking-tight">
                      {priceDisplay}
                    </span>
                    <span className="text-xs font-semibold text-slateText">
                      {periodDisplay}
                    </span>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="mt-6">
                    <div className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                      Included in this package:
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-navy-900">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}

                      {plan.notIncluded && plan.notIncluded.map((notFeat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3" />
                          </div>
                          <span className="line-through">{notFeat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan CTA Button */}
                <div className="mt-8 pt-6 border-t border-ice-100">
                  <button
                    onClick={() => onSelectPlan(plan.name, priceDisplay)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      isPopular
                        ? 'bg-gradient-to-r from-ice-500 to-deep-600 hover:from-ice-600 hover:to-deep-700 text-white shadow-lg shadow-deep-600/20 active:scale-95'
                        : 'bg-ice-50 hover:bg-deep-600 hover:text-white text-navy-900 border border-ice-200 active:scale-95'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-center text-[10px] text-slateText mt-2.5">
                    * Transparent rates. Commercial multi-unit discounts available upon inspection.
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Guarantee Note */}
        <div className="mt-16 text-center text-xs text-slateText max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>All packages include our 100% Cooling Restoration Guarantee & Verified Digital Invoices</span>
        </div>

      </div>
    </section>
  );
}
