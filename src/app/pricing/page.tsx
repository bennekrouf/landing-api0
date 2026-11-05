import type { Metadata } from 'next';
import { Pricing } from '@/components/Pricing';
import { fetchPlans } from '@/lib/plans';

import { en } from '@/i18n/en';

export const metadata: Metadata = {
  title: en.meta.pricingTitle,
  description: en.meta.pricingDescription,
  alternates: { canonical: '/pricing', languages: { en: '/pricing', fr: '/fr/pricing' } },
};

// Re-read the plans from the gateway at most hourly.
export const revalidate = 3600;

export default async function PricingPage() {
  const { plans, rates } = await fetchPlans();
  return <Pricing plans={plans} rates={rates} />;
}
