// Procedural Web Audio API sound generator for "Математичний Трон"
// Zero external files, works offline and on GitHub Pages!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user gesture
    const saved = localStorage.getItem('math_throne_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('math_throne_muted', String(muted));
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public play(name: 'click' | 'select' | 'correct' | 'wrong' | 'tick' | 'tick_urgent' | 'freeze' | 'shield' | 'hint' | 'skip' | 'round_start' | 'victory' | 'game_over') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      switch (name) {
        case 'click': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, t);
          osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.05);
          break;
        }

        case 'select': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, t); // C5
          osc.frequency.exponentialRampToValueAtTime(659.25, t + 0.1); // E5
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.1);
          break;
        }

        case 'correct': {
          // Royal triumphant major chord: C5, E5, G5, C6
          const freqs = [523.25, 659.25, 783.99, 1046.50];
          freqs.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = idx === 3 ? 'triangle' : 'sine';
            const startTime = t + idx * 0.06;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.15, startTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.45);
          });
          break;
        }

        case 'wrong': {
          // Low dissonance buzz
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = 'sawtooth';
          osc2.type = 'sawtooth';
          osc1.frequency.setValueAtTime(140, t);
          osc2.frequency.setValueAtTime(147, t);
          osc1.frequency.exponentialRampToValueAtTime(80, t + 0.35);
          osc2.frequency.exponentialRampToValueAtTime(75, t + 0.35);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.35);
          osc2.stop(t + 0.35);
          break;
        }

        case 'tick': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, t);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.03);
          break;
        }

        case 'tick_urgent': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(980, t);
          osc.frequency.exponentialRampToValueAtTime(1200, t + 0.04);
          gain.gain.setValueAtTime(0.09, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.06);
          break;
        }

        case 'freeze': {
          // Magical icy crystals
          const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
          notes.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const startTime = t + idx * 0.04;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.08, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.3);
          });
          break;
        }

        case 'shield': {
          // Metallic ringing strike
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(320, t);
          osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.4);
          break;
        }

        case 'hint': {
          // Papyrus magical harp
          const notes = [440, 554.37, 659.25, 880];
          notes.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const st = t + idx * 0.05;
            osc.frequency.setValueAtTime(freq, st);
            gain.gain.setValueAtTime(0.08, st);
            gain.gain.exponentialRampToValueAtTime(0.001, st + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(st);
            osc.stop(st + 0.35);
          });
          break;
        }

        case 'skip': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, t); // D5
          osc.frequency.exponentialRampToValueAtTime(880, t + 0.15); // A5
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.25);
          break;
        }

        case 'round_start': {
          // Horn fanfare
          const notes = [261.63, 329.63, 392.00, 523.25];
          notes.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const st = t + idx * 0.1;
            osc.frequency.setValueAtTime(freq, st);
            gain.gain.setValueAtTime(0.18, st);
            gain.gain.exponentialRampToValueAtTime(0.001, st + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(st);
            osc.stop(st + 0.5);
          });
          break;
        }

        case 'victory': {
          // Royal fanfare coronation sequence
          const sequence = [
            { f: 523.25, time: 0.0, dur: 0.18 },
            { f: 523.25, time: 0.2, dur: 0.18 },
            { f: 523.25, time: 0.4, dur: 0.18 },
            { f: 659.25, time: 0.65, dur: 0.35 },
            { f: 587.33, time: 1.05, dur: 0.18 },
            { f: 659.25, time: 1.25, dur: 0.18 },
            { f: 783.99, time: 1.5, dur: 0.8 },
          ];
          sequence.forEach(note => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const st = t + note.time;
            osc.frequency.setValueAtTime(note.f, st);
            gain.gain.setValueAtTime(0, st);
            gain.gain.linearRampToValueAtTime(0.2, st + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, st + note.dur);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(st);
            osc.stop(st + note.dur);
          });
          break;
        }

        case 'game_over': {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, t);
          osc.frequency.exponentialRampToValueAtTime(65, t + 0.8);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.8);
          break;
        }
      }
    } catch {
      // Audio autoplay policy or not supported; gracefully ignore
    }
  }
}

export const sound = new SoundEngine();
