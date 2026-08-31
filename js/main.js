import { IconsColor } from './icons-color.js';
import { IconsBlack } from './icons-black.js';
import { IconsWhite } from './icons-white.js';

// All three icon sets, keyed by theme name
const ICON_SETS = {
  color: IconsColor,
  black: IconsBlack,
  white: IconsWhite,
};

/**
 * Get the raw SVG markup for a coin/token symbol from a given theme.
 * @param {string} symbol - e.g. 'btc', 'eth' (case-insensitive)
 * @param {'color'|'black'|'white'} theme - defaults to 'color'
 * @returns {string|null} SVG markup, or null if not found
 */
export function getCryptoIconSvg(symbol, theme = 'color') {
  const set = ICON_SETS[theme] || ICON_SETS.color;
  const key = String(symbol).toLowerCase();
  return set[key] || null;
}

/**
 * Inject a coin icon into an <img> element as a data URI.
 * @param {HTMLImageElement} imgEl
 * @param {string} symbol
 * @param {'color'|'black'|'white'} theme
 * @returns {boolean} true if icon was found and applied
 */
export function setCryptoIcon(imgEl, symbol, theme = 'color') {
  if (!imgEl) return false;
  const svg = getCryptoIconSvg(symbol, theme);
  if (!svg) {
    console.warn(`[icons] no "${theme}" icon found for symbol "${symbol}"`);
    return false;
  }
  imgEl.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  return true;
}

/**
 * Auto-apply icons to every element with a data-coin attribute.
 * Usage in HTML:
 *   <img data-coin="btc" data-theme="color" alt="Bitcoin Icon" class="crypto-icon">
 *   <img data-coin="eth" alt="Ethereum Icon" class="crypto-icon">  (theme defaults to "color")
 */
function applyAllCryptoIcons() {
  document.querySelectorAll('[data-coin]').forEach((el) => {
    const symbol = el.dataset.coin;
    const theme = el.dataset.theme || 'color';
    setCryptoIcon(el, symbol, theme);
  });
}

document.addEventListener('DOMContentLoaded', applyAllCryptoIcons);
