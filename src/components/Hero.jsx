import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Plus, 
  Minus, 
  Zap, 
  CheckCircle2, 
  PhoneCall, 
  Calendar 
} from 'lucide-react';
import HeroThreeAC from './HeroThreeAC';
import { breezeAudio } from '../utils/audioSynth';
import { CONTACT_INFO } from '../utils/constants';

export default function Hero({ onOpenBooking, onExploreServices }) {
  const [temperature, setTemperature] = useState(24);
  const [fanSpeed, setFanSpeed] = useState('turbo');
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleTempUp = () => {
    if (temperature < 30) {
      const next = temperature + 1;
      setTemperature(next);
      if (audioPlaying) breezeAudio.setIntensity(next);
    }
  };

  const handleTempDown = () => {
    if (temperature > 16) {
      const next = temperature - 1;
      setTemperature(next);
      if (audioPlaying) breezeAudio.setIntensity(next);
    }
  };

  const toggleSound = () => {
    if (audioPlaying) {
      breezeAudio.stop();
      setAudioPlaying(false);
    } else {
      breezeAudio.start();
      breezeAudio.setIntensity(temperature);
      setAudioPlaying(true);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-ice-50 via-white to-ice-50/40 flex items-center w-full"
    >
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-ice-200/50 to-deep-200/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-24 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyanAccent-400/20 to-ice-300/30 blur-3xl pointer-events-none" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe40_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe40_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Headline, Value Props & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-center lg:text-left pt-2"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-ice-200 shadow-sm text-deep-700 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ice-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-deep-600"></span>
              </span>
              <span className="text-navy-900 font-bold">Navkar AC Sales & Service</span>
              <span className="text-slate-300">|</span>
              <span className="text-deep-600 font-bold flex items-center gap-1">
                <Zap className="w-4 h-4 fill-deep-600" /> Raghav Vishwakarma (9998814838)
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl xl:text-7xl font-extrabold text-navy-900 tracking-tight leading-[1.12]"
            >
              Stay Cool.{' '}
              <span className="text-gradient-cool block sm:inline">
                Live Comfortably.
              </span>
            </motion.h1>

            {/* Supporting Paragraph with SEO/AEO keywords */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-6 text-base sm:text-xl text-slateText max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Welcome to <strong>Navkar AC Sales & Service</strong> led by master AC technician <strong>Raghav Vishwakarma</strong>. Fast doorstep split AC installation, emergency repair, high-pressure jet wash, and genuine gas refilling across all top brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-ice-500 via-deep-600 to-deep-700 rounded-2xl shadow-xl shadow-deep-600/25 hover:shadow-2xl hover:shadow-deep-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5" />
                <span>Book AC Service</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-navy-900 bg-white hover:bg-ice-50/80 border border-ice-200/90 rounded-2xl shadow-sm hover:shadow-md hover:border-ice-300 transition-all duration-300"
              >
                <PhoneCall className="w-5 h-5 text-deep-600" />
                <span>Call Raghav: {CONTACT_INFO.phone}</span>
              </a>
            </motion.div>

            {/* Key Trust Checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 pt-6 border-t border-ice-200/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">45-Min Doorstep Visit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">100% Genuine OEM Spares</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-navy-900">Service Warranty</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Interactive AC Unit + Live Airflow & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center justify-center w-full"
          >
            {/* Floating Trust Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -top-4 left-4 sm:left-6 z-20 glass-card px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-white/80 shadow-glass"
            >
              <div className="w-9 h-9 rounded-xl bg-ice-100 text-deep-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-deep-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-navy-900">Raghav Vishwakarma</div>
                <div className="text-[10px] text-slateText">10+ Yrs AC Repair Specialist</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-2 right-4 sm:right-6 z-20 glass-card px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-white/80 shadow-glass"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-navy-900">Navkar AC Service</div>
                <div className="text-[10px] text-emerald-600 font-semibold">24/7 Mobile Dispatch</div>
              </div>
            </motion.div>

            {/* 3D WebGL Canvas Container */}
            <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-white/70 to-ice-100/40 p-2 border border-ice-200/80 shadow-2xl shadow-ice-500/10">
              <HeroThreeAC 
                temperature={temperature} 
                fanSpeed={fanSpeed}
                isCooling={true}
              />

              {/* Interactive Climate HUD Overlay at bottom of 3D Canvas */}
              <div className="absolute bottom-4 inset-x-4 glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/90 shadow-lg flex flex-wrap items-center justify-between gap-3">
                
                {/* Temperature Controller */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-ice-100/90 rounded-xl p-1 border border-ice-200">
                    <button
                      onClick={handleTempDown}
                      disabled={temperature <= 16}
                      className="p-1.5 rounded-lg bg-white text-navy-900 hover:bg-ice-200 active:scale-95 disabled:opacity-40 transition-all shadow-sm"
                      aria-label="Decrease Temperature"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-extrabold text-deep-700 tracking-tight">
                      {temperature}°C
                    </span>
                    <button
                      onClick={handleTempUp}
                      disabled={temperature >= 30}
                      className="p-1.5 rounded-lg bg-white text-navy-900 hover:bg-ice-200 active:scale-95 disabled:opacity-40 transition-all shadow-sm"
                      aria-label="Increase Temperature"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-[10px] font-semibold text-slateText uppercase">Cooling Power</span>
                    <span className="text-xs font-bold text-navy-900">
                      {temperature <= 18 ? 'Arctic Chill' : temperature <= 23 ? 'Optimal Cooling' : 'Eco Mode'}
                    </span>
                  </div>
                </div>

                {/* Fan Speed / Ambient Sound Toggles */}
                <div className="flex items-center gap-2">
                  <div className="flex bg-white/80 rounded-xl p-0.5 border border-ice-200 text-[11px] font-bold">
                    {['eco', 'normal', 'turbo'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setFanSpeed(mode)}
                        className={`px-2.5 py-1 rounded-lg uppercase tracking-wider transition-all ${
                          fanSpeed === mode
                            ? 'bg-deep-600 text-white shadow-sm'
                            : 'text-slateText hover:text-navy-900'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  {/* Ambient Breeze Audio Toggle */}
                  <button
                    onClick={toggleSound}
                    className={`p-2 rounded-xl border transition-all ${
                      audioPlaying
                        ? 'bg-deep-600 text-white border-deep-600 shadow-md shadow-deep-600/30'
                        : 'bg-white text-navy-900 border-ice-200 hover:bg-ice-50'
                    }`}
                    title={audioPlaying ? 'Mute Cooling Breeze Sound' : 'Play Soothing Cooling Breeze Sound'}
                    aria-label="Toggle Cooling Sound"
                  >
                    {audioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slateText" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom floating customer satisfaction pill */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 right-6 z-20 glass-card px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/90 shadow-glass"
            >
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover bg-ice-100" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"; }} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover bg-ice-100" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"; }} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover bg-ice-100" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Customer" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"; }} />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-navy-900">5,000+ ACs Serviced</div>
                <div className="text-[10px] text-amber-500 font-semibold flex items-center gap-1">
                  ★ 4.9/5 Rating (1,400+ Reviews)
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
