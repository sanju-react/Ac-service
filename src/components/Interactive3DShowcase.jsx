import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sliders, 
  Wind, 
  Sparkles, 
  RotateCw, 
  Volume2, 
  VolumeX,
  ThermometerSnowflake,
  Leaf,
  Calendar
} from 'lucide-react';
import HeroThreeAC from './HeroThreeAC';
import { breezeAudio } from '../utils/audioSynth';

export default function Interactive3DShowcase({ onBookService }) {
  const [temp, setTemp] = useState(21);
  const [fanSpeed, setFanSpeed] = useState('turbo');
  const [swing, setSwing] = useState(true);
  const [ecoMode, setEcoMode] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  // Dynamic climate telemetry calculations
  const coolingEfficiency = (99.2 - (temp - 16) * 0.45).toFixed(1);
  const noiseLevelDb = fanSpeed === 'turbo' ? '32 dB' : fanSpeed === 'normal' ? '24 dB' : '18 dB';
  const airflowCfm = fanSpeed === 'turbo' ? '680 CFM' : fanSpeed === 'normal' ? '510 CFM' : '340 CFM';
  const powerWatts = ecoMode ? '480W (Eco)' : fanSpeed === 'turbo' ? '1,150W' : '820W';

  const handleTempSlider = (e) => {
    const val = parseInt(e.target.value, 10);
    setTemp(val);
    if (soundActive) {
      breezeAudio.setIntensity(val);
    }
  };

  const toggleSound = () => {
    if (soundActive) {
      breezeAudio.stop();
      setSoundActive(false);
    } else {
      breezeAudio.start();
      breezeAudio.setIntensity(temp);
      setSoundActive(true);
    }
  };

  return (
    <section
      id="3d-experience"
      className="py-24 bg-gradient-to-b from-white via-ice-50/70 to-white relative overflow-hidden w-full"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-ice-300/20 via-cyanAccent-400/20 to-deep-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ice-100 text-deep-700 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-deep-600" />
            <span>Interactive 3D Climate Simulator</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight"
          >
            Experience the Power of{' '}
            <span className="text-gradient-cool">Perfect Cooling</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base sm:text-lg text-slateText"
          >
            Interact with our precision-engineered 3D inverter AC system. Adjust temperature, airflow physics, and energy metrics in real-time.
          </motion.p>
        </div>

        {/* Interactive Workspace: 3D Stage + Control Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left / Center: Interactive 3D Canvas Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-ice-200 shadow-xl shadow-ice-500/10 relative overflow-hidden"
          >
            {/* Live Status Top Bar */}
            <div className="flex items-center justify-between border-b border-ice-100 pb-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                  Live 3D Thermal Simulation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    soundActive
                      ? 'bg-deep-600 text-white border-deep-600 shadow-sm'
                      : 'bg-ice-50 text-slateText border-ice-200 hover:bg-ice-100'
                  }`}
                >
                  {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundActive ? 'Breeze Audio: ON' : 'Sound: OFF'}</span>
                </button>
              </div>
            </div>

            {/* 3D Model Rendering */}
            <div className="h-[360px] sm:h-[420px] w-full flex items-center justify-center">
              <HeroThreeAC
                temperature={temp}
                fanSpeed={fanSpeed}
                isCooling={true}
                swing={swing}
              />
            </div>

            {/* Live Airflow Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-ice-100">
              <div className="p-3 rounded-2xl bg-ice-50/70 border border-ice-100 text-center">
                <div className="text-[10px] font-bold text-slateText uppercase">Airflow Speed</div>
                <div className="text-base font-extrabold text-navy-900 mt-0.5">{airflowCfm}</div>
              </div>
              <div className="p-3 rounded-2xl bg-ice-50/70 border border-ice-100 text-center">
                <div className="text-[10px] font-bold text-slateText uppercase">Whisper Sound</div>
                <div className="text-base font-extrabold text-navy-900 mt-0.5">{noiseLevelDb}</div>
              </div>
              <div className="p-3 rounded-2xl bg-ice-50/70 border border-ice-100 text-center">
                <div className="text-[10px] font-bold text-slateText uppercase">Inverter Draw</div>
                <div className="text-base font-extrabold text-deep-600 mt-0.5">{powerWatts}</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Master Climate Control Console */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-5 w-full"
          >
            {/* 1. Main Temperature Slider Card */}
            <div className="glass-card p-6 rounded-3xl border border-ice-200 shadow-md bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-ice-100 text-deep-600 flex items-center justify-center">
                    <ThermometerSnowflake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">Target Temperature</h4>
                    <span className="text-[11px] text-slateText">Precision Thermostat</span>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-ice-500 to-deep-600 text-white font-extrabold text-lg shadow-sm">
                  {temp}°C
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-2 mt-4">
                <input
                  type="range"
                  min="16"
                  max="30"
                  value={temp}
                  onChange={handleTempSlider}
                  className="w-full temp-slider"
                  aria-label="Target Temperature Slider"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slateText px-1">
                  <span>16°C (Arctic Ice)</span>
                  <span>22°C (Optimal)</span>
                  <span>30°C (Eco)</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-ice-50/80 border border-ice-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-navy-900">Thermal Comfort Index:</span>
                <span className="font-bold text-deep-700">
                  {temp <= 18 ? 'Ultra Crisp Chilled' : temp <= 23 ? 'Ideal Living Room Chill' : 'Energy Saver Mode'}
                </span>
              </div>
            </div>

            {/* 2. Fan Speed & Flow Dynamics */}
            <div className="glass-card p-6 rounded-3xl border border-ice-200 shadow-md bg-white">
              <h4 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                <Wind className="w-4 h-4 text-deep-600" />
                <span>Fan Airflow Modes</span>
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'eco', label: 'Eco Silent', sub: '18 dB' },
                  { key: 'normal', label: 'Balanced', sub: '24 dB' },
                  { key: 'turbo', label: 'Turbo Blast', sub: '32 dB' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFanSpeed(item.key)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      fanSpeed === item.key
                        ? 'bg-deep-600 text-white border-deep-600 shadow-md shadow-deep-600/20'
                        : 'bg-white text-navy-900 border-ice-200 hover:border-ice-300 hover:bg-ice-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${fanSpeed === item.key ? 'text-ice-100' : 'text-slateText'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              {/* Toggles: Auto Swing & Inverter Eco */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-ice-100">
                <button
                  onClick={() => setSwing(!swing)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    swing
                      ? 'bg-ice-100 text-deep-700 border-ice-300'
                      : 'bg-white text-slateText border-ice-200'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${swing ? 'animate-spin' : ''}`} />
                  <span>3D Swing: {swing ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setEcoMode(!ecoMode)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    ecoMode
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-white text-slateText border-ice-200'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Eco Inverter: {ecoMode ? 'ACTIVE' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* 3. Book Tuning / Service Direct Button */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-deep-700 to-navy-900 text-white shadow-xl flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-ice-200 uppercase tracking-wider">Is Your AC Not Cooling?</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">Book AC Inspection & Service</div>
              </div>
              <button
                onClick={onBookService}
                className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-ice-400 to-deep-500 hover:from-ice-300 hover:to-deep-400 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Service</span>
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
