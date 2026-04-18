/**
 * 4Lambda — Interactive Effects
 * https://4lambda.io
 *
 * Cursor-following radial glow (desktop) and touch glow (mobile).
 * Respects prefers-reduced-motion.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initializes the cursor/touch following glow effect.
 * Uses pointermove for unified mouse+touch on desktop, with
 * a separate touchmove listener for mobile drag support.
 */
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || prefersReducedMotion) return;

  let rafId = null;
  let targetX = 50;
  let targetY = 50;

  const updateGlow = (clientX, clientY) => {
    targetX = clientX;
    targetY = clientY;

    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      glow.style.setProperty('--glow-x', `${targetX}px`);
      glow.style.setProperty('--glow-y', `${targetY}px`);
      rafId = null;
    });
  };

  /* Desktop: pointermove covers mouse + pen */
  window.addEventListener('pointermove', (e) => {
    if (!glow.classList.contains('active')) {
      glow.classList.add('active');
    }
    updateGlow(e.clientX, e.clientY);
  }, { passive: true });

  /* Mobile: touchmove for drag-based glow (fixes the decade-old TODO) */
  window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    if (!glow.classList.contains('active')) {
      glow.classList.add('active');
    }
    updateGlow(touch.clientX, touch.clientY);
  }, { passive: true });

  /* Fade out when pointer leaves the viewport */
  document.addEventListener('pointerleave', () => {
    glow.classList.remove('active');
  });

  /* Touchend: keep glow visible for a moment, then fade */
  window.addEventListener('touchend', () => {
    setTimeout(() => {
      glow.classList.remove('active');
    }, 1500);
  }, { passive: true });
}

/* ── Initialization ── */
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
});
