// glimmerEffect.js
// Adds a subtle glimmer (shine) animation effect to any HTML element.

class GlimmerEffect {
  /**
   * @param {HTMLElement} element - The element to apply the glimmer effect on.
   * @param {number} duration - Duration of one glimmer cycle in milliseconds.
   */
  constructor(element, duration = 1500) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('A valid HTML element is required.');
    }
    this.element = element;
    this.duration = duration;
    this._styleElement = null;
    this._animationName = `glimmer_${Math.random().toString(36).substr(2, 9)}`;
    this._applyEffect();
  }

  _applyEffect() {
    // Create keyframes style
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes ${this._animationName} {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;
    document.head.appendChild(style);
    this._styleElement = style;

    // Apply the glimmer effect with a gradient background animation
    Object.assign(this.element.style, {
      position: 'relative',
      overflow: 'hidden',
      background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)`,
      backgroundSize: '200% 100%',
      animation: `${this._animationName} ${this.duration}ms infinite`,
    });
  }

  /**
   * Stops and removes the glimmer effect.
   */
  destroy() {
    if (this._styleElement) {
      this._styleElement.remove();
      this._styleElement = null;
    }
    this.element.style.animation = '';
    this.element.style.background = '';
  }
}

// Usage example:
// const glimmer = new GlimmerEffect(document.querySelector('.button'), 2000);
// To remove effect: glimmer.destroy();

export default GlimmerEffect;
