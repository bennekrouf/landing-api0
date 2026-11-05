// src/lib/display-currency.ts
//
// Prices shown in the visitor's currency, detected from where they are; they
// are never offered a choice. Plans are billed in CHF by Stripe;
// EUR and USD are marketing prices near the rates the super admin sets (the
// gateway's GET /api/workspace-plans → display_rates, units per 1 CHF),
// ending in 9 like a price list; they may differ a little from the CHF billed. The same file lives in the dashboard
// (dashboard-api0/src/utils/display-currency.ts): keep the two in step.

export type DisplayCurrency = 'chf' | 'eur' | 'usd';

export type Rates = Partial<Record<DisplayCurrency, number>>;

/** The visitor's currency, from their time zone (never picked by them): Switzerland CHF, the rest of Europe EUR, elsewhere USD. */
export function guessCurrency(): DisplayCurrency {
  if (typeof window === 'undefined') return 'chf';
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  if (zone === 'Europe/Zurich' || zone === 'Europe/Vaduz') return 'chf';
  if (zone.startsWith('Europe/')) return 'eur';
  return 'usd';
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
