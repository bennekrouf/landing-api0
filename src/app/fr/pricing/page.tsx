import type { Metadata } from 'next';
import { Pricing } from '@/components/Pricing';
import { fetchPlans } from '@/lib/plans';
import { fr } from '@/i18n/fr';

export const metadata: Metadata = {
  title: fr.meta.pricingTitle,
  description: fr.meta.pricingDescription,
  alternates: { canonical: '/fr/pricing', languages: { en: '/pricing', fr: '/fr/pricing' } },
};

// Re-read the plans from the gateway at most hourly.
export const revalidate = 3600;

export default async function PricingPageFr() {
  const { plans, rates } = await fetchPlans();
  return <Pricing plans={plans} rates={rates} lang="fr" />;
}
