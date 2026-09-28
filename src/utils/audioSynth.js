// Web Audio API ambient cooling breeze / fan sound generator
// 100% browser native, lightweight, zero external file dependencies

class CoolingBreezeAudio {
  constructor() {
    this.ctx = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.gainNode = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Generate soothing pink/white noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise approximation
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Lowpass filter for smooth air whoosh
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Gain node for smooth fade-in
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 1.2);

    // Connect nodes
    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.noiseNode.start();
    this.isPlaying = true;
  }

  setIntensity(tempC) {
    if (!this.filterNode || !this.gainNode || !this.ctx) return;
    // Lower temperature = faster airflow / higher filter cutoff
    const norm = (30 - tempC) / (30 - 16); // 0 at 30°C, 1 at 16°C
    const targetFreq = 300 + norm * 450;
    const targetGain = 0.06 + norm * 0.14;
    
    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.3);
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
  }

  stop() {
    if (!this.isPlaying || !this.gainNode || !this.ctx) return;
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
    setTimeout(() => {
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch (e) {
          // ignore
        }
      }
      this.isPlaying = false;
    }, 650);
  }
}

export const breezeAudio = new CoolingBreezeAudio();
