'use client';

// The workspace plans, from the gateway (GET /api/workspace-plans, fetched by
// the page on the server). Billed in CHF; prices show in the visitor's
// currency, detected from their time zone (no picker), EUR and USD as
// approximations.

import React, { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { copyFor, type Lang } from '@/i18n';
import { TeamsMark, TelegramMark, WhatsAppMark } from '@/components/brand-icons';
import { DisplayCurrency, Rates, displayPrice, guessCurrency } from '@/lib/display-currency';

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

/** The channels every plan reaches, with their brand colours. */
const CHANNELS = [
  { name: 'Telegram', Mark: TelegramMark, color: '#229ED9' },
  { name: 'WhatsApp', Mark: WhatsAppMark, color: '#25D366' },
  { name: 'Teams', Mark: TeamsMark, color: '#5B5FC7' },
];

function Channels({ label }: { label: string }) {
  return (
    <div className="mt-5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{label}</div>
      <ul className="flex flex-wrap gap-2">
        {CHANNELS.map(({ name, Mark, color }) => (
          <li key={name} className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-foreground">
            <span style={{ color }}>
              <Mark className="w-4 h-4" />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

const APP_URL = 'https://app.api0.ai/?view=settings&tab=workspace-plan';
// Where Enterprise enquiries go.
const ENTERPRISE_CONTACT = 'mailto:mb@mayorana.ch?subject=api0%20Enterprise';

export function Pricing({ plans, rates, lang = 'en' }: { plans: PricingPlan[]; rates: Rates; lang?: Lang }) {
  const t = copyFor(lang).pricing;
  // CHF on the server, the visitor's own after the first render.
  const [currency, setCurrency] = useState<DisplayCurrency>('chf');
  useEffect(() => setCurrency(guessCurrency()), []);

  const price = (cents: number, billed: string) => displayPrice(cents, billed, currency, rates, t.numberLocale);
  const billedIn = plans[0]?.currency.toUpperCase() ?? 'CHF';

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-foreground">{t.title}</h1>
        <p className="text-center text-muted-foreground mb-12">
          {t.lead}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div key={plan.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-3 text-3xl font-bold text-foreground">
                {price(plan.price_cents, plan.currency)}
                <span className="text-sm font-normal text-muted-foreground"> {t.perMonth}</span>
              </div>
              {plan.description && <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>}
              <Channels label={t.channelsLabel} />
              <ul className="mt-5 mb-6 space-y-2 text-sm text-foreground">
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{t.seatsIncluded(plan.included_seats)}</li>
                {plan.seat_price_cents > 0 && (
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{t.perExtraSeat(price(plan.seat_price_cents, plan.currency))}</li>
                )}
                <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{t.creditsPerMonth(plan.monthly_credits.toLocaleString(t.numberLocale))}</li>
                {plan.overage_cents_per_1k > 0 && (
                  <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-[#FF6B00]" />{t.overage(price(plan.overage_cents_per_1k, plan.currency))}</li>
                )}
              </ul>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cap mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
              >
                {t.start}
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          ))}

          <div className="flex flex-col rounded-xl border border-dashed border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">{t.enterprise}</h3>
            <div className="mt-3 text-3xl font-bold text-foreground">{t.custom}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.enterpriseBody}
            </p>
            <Channels label={t.channelsLabel} />
            <div className="flex-1" />
            <a
              href={ENTERPRISE_CONTACT}
              className="btn-cap mt-6 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent"
            >
              {t.contact}
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t.billedIn(billedIn)}
          {currency !== billedIn.toLowerCase() && t.indicative}
        </p>
      </div>
    </section>
  );
}
