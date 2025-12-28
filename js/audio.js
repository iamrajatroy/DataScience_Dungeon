// ========================================
// DATA SCIENCE DUNGEON - AUDIO MANAGER
// ========================================
// Retro 8-bit sound effects using Web Audio API

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.musicGain = null;
        this.sfxGain = null;
        this.isMuted = false;
        this.musicMuted = false;
        this.currentMusic = null;
        this.musicEnabled = true;
        this.sfxEnabled = true;

        // Try to initialize audio context (may need user interaction)
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Master gain
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 0.5;
            this.masterGain.connect(this.audioContext.destination);

            // Music gain
            this.musicGain = this.audioContext.createGain();
            this.musicGain.gain.value = 0.3;
            this.musicGain.connect(this.masterGain);

            // SFX gain
            this.sfxGain = this.audioContext.createGain();
            this.sfxGain.gain.value = 0.6;
            this.sfxGain.connect(this.masterGain);

            this.initialized = true;
            console.log('[AudioManager] Initialized');
        } catch (e) {
            console.error('[AudioManager] Failed to initialize:', e);
        }
    }

    resumeContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // ==================== SOUND EFFECTS ====================

    playChestOpen() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Create oscillators for a magical chest sound
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc1.type = 'square';
        osc2.type = 'triangle';

        // Ascending arpeggio
        osc1.frequency.setValueAtTime(330, now);
        osc1.frequency.setValueAtTime(440, now + 0.08);
        osc1.frequency.setValueAtTime(550, now + 0.16);
        osc1.frequency.setValueAtTime(660, now + 0.24);

        osc2.frequency.setValueAtTime(660, now);
        osc2.frequency.setValueAtTime(880, now + 0.08);
        osc2.frequency.setValueAtTime(1100, now + 0.16);
        osc2.frequency.setValueAtTime(1320, now + 0.24);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialDecayTo = (0.01, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.sfxGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
    }

    playCorrect() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Happy ascending two-tone success sound
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(523, now);        // C5
        osc.frequency.setValueAtTime(659, now + 0.1);  // E5
        osc.frequency.setValueAtTime(784, now + 0.2);  // G5

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.35);
    }

    playIncorrect() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Sad descending buzz
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playPortal() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Whooshy magical portal sound
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.6);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.6);
    }

    playRoomComplete() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Triumphant fanfare
        const notes = [523, 659, 784, 1047]; // C E G C
        const delays = [0, 0.12, 0.24, 0.36];

        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + delays[i]);

            gain.gain.setValueAtTime(0, now + delays[i]);
            gain.gain.linearRampToValueAtTime(0.15, now + delays[i] + 0.02);
            gain.gain.linearRampToValueAtTime(0.01, now + delays[i] + 0.3);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(now + delays[i]);
            osc.stop(now + delays[i] + 0.3);
        });
    }

    playGameOver() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Sad descending game over tune
        const notes = [392, 370, 330, 262]; // G4, F#4, E4, C4
        const delays = [0, 0.25, 0.5, 0.75];

        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + delays[i]);

            gain.gain.setValueAtTime(0.2, now + delays[i]);
            gain.gain.linearRampToValueAtTime(0.01, now + delays[i] + 0.35);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(now + delays[i]);
            osc.stop(now + delays[i] + 0.35);
        });
    }

    playVictory() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Epic victory fanfare
        const melody = [
            { freq: 523, time: 0 },     // C5
            { freq: 659, time: 0.15 },  // E5
            { freq: 784, time: 0.30 },  // G5
            { freq: 1047, time: 0.45 }, // C6
            { freq: 784, time: 0.6 },   // G5
            { freq: 1047, time: 0.75 }, // C6
        ];

        melody.forEach(note => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(note.freq, now + note.time);

            gain.gain.setValueAtTime(0.15, now + note.time);
            gain.gain.linearRampToValueAtTime(0.01, now + note.time + 0.2);

            osc.connect(gain);
            gain.connect(this.sfxGain);

            osc.start(now + note.time);
            osc.stop(now + note.time + 0.2);
        });
    }

    playMenuSelect() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Quick blip
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    playMenuHover() {
        if (!this.sfxEnabled) return;
        this.init();
        this.resumeContext();

        const now = this.audioContext.currentTime;

        // Subtle tick
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.02);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        osc.stop(now + 0.02);
    }

    // ==================== BACKGROUND MUSIC ====================

    startMenuMusic() {
        if (!this.musicEnabled) return;
        this.stopMusic();
        this.init();
        this.resumeContext();

        this.playChiptuneLoop('menu');
    }

    startGameMusic() {
        if (!this.musicEnabled) return;
        this.stopMusic();
        this.init();
        this.resumeContext();

        this.playChiptuneLoop('game');
    }

    startVictoryMusic() {
        if (!this.musicEnabled) return;
        this.stopMusic();
        this.init();
        this.resumeContext();

        this.playChiptuneLoop('victory');
    }

    playChiptuneLoop(type) {
        if (!this.initialized || !this.musicEnabled) return;

        const now = this.audioContext.currentTime;

        // Looping parameters
        let bpm;
        if (type === 'menu') bpm = 100;
        else if (type === 'victory') bpm = 140;
        else bpm = 120;

        const beatDuration = 60 / bpm;
        const measureDuration = beatDuration * 4;

        // Define musical patterns (notes in Hz, 0 = rest)
        let bassPattern, melodyPattern;

        if (type === 'menu') {
            // Chill menu music
            bassPattern = [131, 0, 165, 0, 175, 0, 165, 0]; // C3, E3, F3, E3
            melodyPattern = [523, 0, 659, 0, 523, 0, 494, 0]; // C5, E5, C5, B4
        } else if (type === 'victory') {
            // Super cheerful, happy retro victory music (faster and more upbeat)
            bpm = 160; // Much faster for celebration
            bassPattern = [262, 330, 392, 330, 262, 392, 330, 262]; // C4, E4, G4 - bouncy pattern
            melodyPattern = [1047, 1319, 1568, 1319, 1760, 1568, 1319, 1047]; // C6, E6, G6, E6, A6, G6, E6, C6
        } else {
            // More energetic game music
            bassPattern = [131, 131, 165, 165, 175, 175, 165, 131];
            melodyPattern = [523, 659, 784, 659, 523, 494, 523, 659];
        }

        // Create oscillators for bass and melody
        const playPattern = (pattern, waveType, gainValue, octaveShift = 1) => {
            const stepDuration = measureDuration / pattern.length;

            pattern.forEach((freq, i) => {
                if (freq === 0) return;

                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();

                osc.type = waveType;
                osc.frequency.setValueAtTime(freq * octaveShift, now + i * stepDuration);

                gain.gain.setValueAtTime(gainValue, now + i * stepDuration);
                gain.gain.linearRampToValueAtTime(gainValue * 0.3, now + (i + 0.8) * stepDuration);

                osc.connect(gain);
                gain.connect(this.musicGain);

                osc.start(now + i * stepDuration);
                osc.stop(now + (i + 0.9) * stepDuration);
            });
        };

        // Play one measure
        playPattern(bassPattern, 'triangle', 0.08);
        playPattern(melodyPattern, 'square', 0.05);

        // Schedule next loop
        this.currentMusic = setTimeout(() => {
            if (this.musicEnabled) {
                this.playChiptuneLoop(type);
            }
        }, measureDuration * 1000);
    }

    stopMusic() {
        if (this.currentMusic) {
            clearTimeout(this.currentMusic);
            this.currentMusic = null;
        }
    }

    // ==================== CONTROLS ====================

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }

    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        return this.sfxEnabled;
    }

    setMasterVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }

    setMusicVolume(value) {
        if (this.musicGain) {
            this.musicGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }

    setSFXVolume(value) {
        if (this.sfxGain) {
            this.sfxGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}

// Create global instance
window.audioManager = new AudioManager();
