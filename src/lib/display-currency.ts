// src/lib/display-currency.ts
//
// Prices shown in the visitor's currency, detected from the browser's
// languages and time zone (pickCurrency); they are never offered a choice. Plans are billed in CHF by Stripe;
// EUR and USD are marketing prices near the rates the super admin sets (the
// gateway's GET /api/workspace-plans → display_rates, units per 1 CHF),
// ending in 9 like a price list; they may differ a little from the CHF billed. The same file lives in the dashboard
// (dashboard-api0/src/utils/display-currency.ts): keep the two in step.

export type DisplayCurrency = 'chf' | 'eur' | 'usd';

export type Rates = Partial<Record<DisplayCurrency, number>>;

/** Regions that pay in CHF: Switzerland and Liechtenstein. */
const CHF_REGIONS = new Set(['CH', 'LI']);

/** Regions that pay in euros: the eurozone and the microstates and others using the euro. */
const EUR_REGIONS = new Set([
  'AT', 'BE', 'BG', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK',
  'AD', 'MC', 'ME', 'SM', 'VA', 'XK',
]);

/** IANA time zones in Switzerland and Liechtenstein (Büsingen is German but pays in CHF). */
const CHF_ZONES = new Set(['Europe/Zurich', 'Europe/Vaduz', 'Europe/Busingen']);

/** IANA time zones in the regions of EUR_REGIONS. */
const EUR_ZONES = new Set([
  'Europe/Vienna', 'Europe/Brussels', 'Europe/Sofia', 'Asia/Nicosia', 'Asia/Famagusta', 'Europe/Nicosia', 'Europe/Berlin',
  'Europe/Tallinn', 'Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary', 'Europe/Helsinki', 'Europe/Mariehamn', 'Europe/Paris',
  'Europe/Athens', 'Europe/Zagreb', 'Europe/Dublin', 'Europe/Rome', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Riga',
  'Europe/Malta', 'Europe/Amsterdam', 'Europe/Lisbon', 'Atlantic/Madeira', 'Atlantic/Azores', 'Europe/Ljubljana',
  'Europe/Bratislava', 'Europe/Andorra', 'Europe/Monaco', 'Europe/Podgorica', 'Europe/San_Marino', 'Europe/Vatican',
]);

/** The region subtag of a language tag ("fr-CH" → "CH", "zh-Hant-TW" → "TW"), if it has one. */
function regionOf(tag: string): string | undefined {
  try {
    return new Intl.Locale(tag).region?.toUpperCase();
  } catch {
    return undefined;
  }
}

/**
 * The visitor's currency from what the browser says, never picked by them:
 * CHF when a preferred language (fr-CH, de-CH, it-CH…) or the time zone points
 * to Switzerland or Liechtenstein, else EUR when one points to the eurozone,
 * else USD. A Swiss or eurozone signal wins over a US one, as en-US is many
 * browsers' default wherever they are.
 */
export function pickCurrency(languages: readonly string[], timeZone: string | undefined): DisplayCurrency {
  const regions = languages.map(regionOf);
  if (regions.some(r => r && CHF_REGIONS.has(r)) || (timeZone && CHF_ZONES.has(timeZone))) return 'chf';
  if (regions.some(r => r && EUR_REGIONS.has(r)) || (timeZone && EUR_ZONES.has(timeZone))) return 'eur';
  return 'usd';
}

/** pickCurrency for this browser; CHF on the server, where there is no visitor yet. */
export function guessCurrency(): DisplayCurrency {
  if (typeof window === 'undefined') return 'chf';
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return pickCurrency(languages, Intl.DateTimeFormat().resolvedOptions().timeZone);
}

/**
 * A converted price as a price list shows it, ending in 9: 42 → 39, 160 →
 * 159, 535 → 539, 2,030 → 1,990. Under 20 (a seat or an overage rate) it keeps
 * cents, ending in .49 or .99.
 */
export function marketingPrice(value: number): number {
  if (value < 20) {
    const base = Math.floor(value);
    const options = [base - 0.01, base + 0.49, base + 0.99].filter(o => o > 0);
    return options.reduce((best, o) => (Math.abs(o - value) < Math.abs(best - value) ? o : best));
  }
  if (value < 1000) return Math.max(19, Math.round((value + 1) / 10) * 10 - 1);
  return Math.round((value + 10) / 100) * 100 - 10;
}

/**
 * `cents` of `billed` (the plan's currency) as shown in `shown`: exact in the
 * billed currency, else a marketing price near the conversion (marketingPrice).
 * The page says the plan is billed in its own currency.
 */
export function displayPrice(cents: number, billed: string, shown: DisplayCurrency, rates: Rates, locale?: string): string {
  const from = billed.toLowerCase();
  const fromRate = from === 'chf' ? 1 : rates[from as DisplayCurrency];
  const toRate = rates[shown];
  if (from === shown || !fromRate || !toRate) return format(cents / 100, from, locale);
  return format(marketingPrice(((cents / 100) / fromRate) * toRate), shown, locale);
}

function format(value: number, currency: string, locale: string | undefined) {
  const whole = Number.isInteger(Math.round(value * 100) / 100);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
