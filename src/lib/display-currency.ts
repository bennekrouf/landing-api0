// src/lib/display-currency.ts
//
// Prices shown in the visitor's currency. Plans are billed in CHF by Stripe;
// EUR and USD are approximations from the rates the super admin sets (the
// gateway's GET /api/workspace-plans → display_rates, units per 1 CHF), shown
// with "≈" and rounded to a round number. The same file lives in the dashboard
// (dashboard-api0/src/utils/display-currency.ts): keep the two in step.

export type DisplayCurrency = 'chf' | 'eur' | 'usd';

export const DISPLAY_CURRENCIES: { id: DisplayCurrency; flag: string; label: string }[] = [
  { id: 'chf', flag: '🇨🇭', label: 'CHF' },
  { id: 'eur', flag: '🇪🇺', label: 'EUR' },
  { id: 'usd', flag: '🇺🇸', label: 'USD' },
];

export type Rates = Partial<Record<DisplayCurrency, number>>;

const STORAGE_KEY = 'api0.display-currency';

/** The visitor's currency by their time zone: Switzerland CHF, the rest of Europe EUR, elsewhere USD. */
export function guessCurrency(): DisplayCurrency {
  if (typeof window === 'undefined') return 'chf';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'chf' || saved === 'eur' || saved === 'usd') return saved;
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  if (zone === 'Europe/Zurich' || zone === 'Europe/Vaduz') return 'chf';
  if (zone.startsWith('Europe/')) return 'eur';
  return 'usd';
}

export function rememberCurrency(c: DisplayCurrency) {
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, c);
}

/** A converted price rounded the way a price list is: to 1 under 100, to 5 under 1,000, else to 10. */
function roundPrice(value: number): number {
  if (value < 100) return Math.round(value);
  if (value < 1000) return Math.round(value / 5) * 5;
  return Math.round(value / 10) * 10;
}

/**
 * `cents` of `billed` (the plan's currency) as shown in `shown`. Exact when
 * they are the same currency; otherwise "≈" and rounded. Small amounts (an
 * overage rate) keep their cents.
 */
export function displayPrice(cents: number, billed: string, shown: DisplayCurrency, rates: Rates, locale?: string): string {
  const from = billed.toLowerCase();
  const exact = from === shown;
  const fromRate = from === 'chf' ? 1 : rates[from as DisplayCurrency];
  const toRate = rates[shown];
  if (!exact && (!fromRate || !toRate)) {
    return format(cents / 100, from, locale, true);
  }
  const value = exact ? cents / 100 : ((cents / 100) / fromRate!) * toRate!;
  const small = value < 20;
  const shownValue = exact || small ? value : roundPrice(value);
  return `${exact ? '' : '≈ '}${format(shownValue, shown, locale, small)}`;
}

function format(value: number, currency: string, locale: string | undefined, keepCents: boolean) {
  const whole = Number.isInteger(value) && !keepCents;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: whole || Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(value);
}
