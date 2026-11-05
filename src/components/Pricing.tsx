'use client';

// The workspace plans, from the gateway (GET /api/workspace-plans, fetched by
// the page on the server). Billed in CHF; the visitor picks the currency they
// read prices in (guessed from their time zone, kept in localStorage), and
// EUR and USD show as approximations.

import React, { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import {
  DISPLAY_CURRENCIES,
  DisplayCurrency,
  Rates,
  displayPrice,
  guessCurrency,
  rememberCurrency,
} from '@/lib/display-currency';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  currency: string;
  price_cents: number;
  included_seats: number;
  seat_price_cents: number;
  monthly_credits: number;
  overage_cents_per_1k: number;
}

const APP_URL = 'https://app.api0.ai/?view=settings&tab=workspace-plan';
// Where Enterprise enquiries go.
const ENTERPRISE_CONTACT = 'mailto:mb@mayorana.ch?subject=api0%20Enterprise';

export function Pricing({ plans, rates }: { plans: PricingPlan[]; rates: Rates }) {
  // CHF on the server, the visitor's own after the first render.
  const [currency, setCurrency] = useState<DisplayCurrency>('chf');
  useEffect(() => setCurrency(guessCurrency()), []);

  const pick = (c: DisplayCurrency) => {
    setCurrency(c);
    rememberCurrency(c);
  };
  const price = (cents: number, billed: string) => displayPrice(cents, billed, currency, rates);
  const billedIn = plans[0]?.currency.toUpperCase() ?? 'CHF';

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Pricing per workspace</h2>
        <p className="text-center text-muted-foreground mb-8">
          Seats and credits included. Extra members per seat; credits past the allowance on the next invoice.
        </p>

        <div className="flex justify-center gap-2 mb-10" role="radiogroup" aria-label="Currency">
          {DISPLAY_CURRENCIES.map((c) => (
            <button
              key={c.id}
              role="radio"
              aria-checked={currency === c.id}
              onClick={() => pick(c.id)}
              className={`px-3 py-1.5 rounded-full border text-sm transition ${
                currency === c.id ? 'border-[#FF6B00] text-[#FF6B00] bg-[#FF6B00]/10' : 'border-border text-muted-foreground'
              }`}
            >
              <span className="mr-1.5">{c.flag}</span>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-3 text-3xl font-bold text-foreground">
                {price(plan.price_cents, plan.currency)}
                <span className="text-sm font-normal text-muted-foreground"> / month</span>
              </div>
              {plan.description && <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>}
              <ul className="mt-5 space-y-2 text-sm text-foreground">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{plan.included_seats} seats included</li>
                {plan.seat_price_cents > 0 && (
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{price(plan.seat_price_cents, plan.currency)} per extra seat</li>
                )}
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{plan.monthly_credits.toLocaleString('en-US')} credits / month</li>
                {plan.overage_cents_per_1k > 0 && (
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{price(plan.overage_cents_per_1k, plan.currency)} per 1,000 extra credits</li>
                )}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cap mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
              >
                Start
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          ))}

          <div className="flex flex-col rounded-xl border border-dashed border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Enterprise</h3>
            <div className="mt-3 text-3xl font-bold text-foreground">Custom</div>
            <p className="mt-2 text-sm text-muted-foreground">
              More seats and credits, invoice instead of card, a contract and data processing agreement.
            </p>
            <a
              href={ENTERPRISE_CONTACT}
              className="btn-cap mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent"
            >
              Contact us
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Billed in {billedIn}, VAT included.{currency !== billedIn.toLowerCase() && ' Prices in other currencies are approximate.'}
        </p>
      </div>
    </section>
  );
}
