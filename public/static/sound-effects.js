/**
 * Hover Sound Effects System
 * Subtle audio feedback for interactive elements
 */

class SoundEffectsManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.2; // Subtle volume
    this.sounds = {};
    this.audioContext = null;
    
    // Check if Web Audio API is supported
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      this.audioContext = new (AudioContext || webkitAudioContext)();
      this.init();
    } else {
      console.warn('Web Audio API not supported. Sound effects disabled.');
    }
  }

  init() {
    // Generate sound effects using Web Audio API (no external files needed)
    this.generateSounds();
    
    // Add sound effects to interactive elements
    this.attachSoundEffects();
    
    // Add toggle control
    this.createSoundToggle();
    
    console.log('🔊 Sound effects initialized');
  }

  /**
   * Generate sound effects using oscillators
   */
  generateSounds() {
    // These are lightweight, synthesized sounds
    this.sounds = {
      hover: this.createHoverSound.bind(this),
      click: this.createClickSound.bind(this),
      success: this.createSuccessSound.bind(this),
      error: this.createErrorSound.bind(this),
      whoosh: this.createWhooshSound.bind(this)
    };
  }

  /**
   * Create hover sound (soft ping)
   */
  createHoverSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.type = 'sine';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  /**
   * Create click sound (soft tap)
   */
  createClickSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);
    
    oscillator.type = 'triangle';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }

  /**
   * Create success sound (ascending chime)
   */
  createSuccessSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const playNote = (frequency, startTime, duration) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gainNode.gain.setValueAtTime(this.volume * 0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.type = 'sine';
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = this.audioContext.currentTime;
    playNote(523, now, 0.15); // C
    playNote(659, now + 0.08, 0.15); // E
    playNote(784, now + 0.16, 0.2); // G
  }

  /**
   * Create error sound (descending beep)
   */
  createErrorSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    
    oscillator.type = 'square';
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  /**
   * Create whoosh sound (page transition)
   */
  createWhooshSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const bufferSize = this.audioContext.sampleRate * 0.3;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate white noise with frequency sweep
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const envelope = Math.sin(t * Math.PI); // Smooth envelope
      data[i] = (Math.random() * 2 - 1) * envelope * this.volume * 0.3;
    }
    
    const source = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    source.start(this.audioContext.currentTime);
  }

  /**
   * Attach sound effects to interactive elements
   */
  attachSoundEffects() {
    // Buttons and CTAs
    document.querySelectorAll('button, .magnetic-btn, .cta-button, a[href]').forEach(element => {
      // Skip if already has sound
      if (element.dataset.soundAttached) return;
      
      element.addEventListener('mouseenter', () => {
        this.playSound('hover');
      });
      
      element.addEventListener('click', () => {
        this.playSound('click');
      });
      
      element.dataset.soundAttached = 'true';
    });

    // Form inputs
    document.querySelectorAll('input, textarea, select').forEach(element => {
      if (element.dataset.soundAttached) return;
      
      element.addEventListener('focus', () => {
        this.playSound('hover');
      });
      
      element.dataset.soundAttached = 'true';
    });

    // Cards that are hoverable
    document.querySelectorAll('.glass, .card').forEach(element => {
      if (element.dataset.soundAttached) return;
      
      let timeout;
      element.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.playSound('hover');
        }, 100); // Slight delay to avoid too many sounds
      });
      
      element.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
      });
      
      element.dataset.soundAttached = 'true';
    });
  }

  /**
   * Play a sound effect
   */
  playSound(soundName) {
    if (!this.enabled || !this.sounds[soundName]) return;
    
    try {
      this.sounds[soundName]();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  /**
   * Create sound toggle control
   */
  createSoundToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'sound-toggle';
    toggle.setAttribute('aria-label', 'Toggle sound effects');
    toggle.innerHTML = this.enabled ? '🔊' : '🔇';
    toggle.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(42, 157, 143, 0.2);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(42, 157, 143, 0.3);
      color: #f5f3ef;
      font-size: 20px;
      cursor: pointer;
      z-index: 9999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    toggle.addEventListener('mouseenter', () => {
      toggle.style.transform = 'scale(1.1)';
      toggle.style.background = 'rgba(42, 157, 143, 0.3)';
    });

    toggle.addEventListener('mouseleave', () => {
      toggle.style.transform = 'scale(1)';
      toggle.style.background = 'rgba(42, 157, 143, 0.2)';
    });

    toggle.addEventListener('click', () => {
      this.enabled = !this.enabled;
      toggle.innerHTML = this.enabled ? '🔊' : '🔇';
      
      // Save preference
      localStorage.setItem('soundEffectsEnabled', this.enabled);
      
      // Play confirmation sound
      if (this.enabled) {
        this.playSound('success');
      }
    });

    document.body.appendChild(toggle);

    // Load saved preference
    const savedPreference = localStorage.getItem('soundEffectsEnabled');
    if (savedPreference !== null) {
      this.enabled = savedPreference === 'true';
      toggle.innerHTML = this.enabled ? '🔊' : '🔇';
    }
  }

  /**
   * Update volume
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Enable/disable sound effects
   */
  toggle() {
    this.enabled = !this.enabled;
  }

  /**
   * Re-attach sounds to dynamically added elements
   */
  refresh() {
    this.attachSoundEffects();
  }
}

// Initialize sound effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure other components are loaded
  setTimeout(() => {
    window.soundEffects = new SoundEffectsManager();
  }, 500);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundEffectsManager;
}
