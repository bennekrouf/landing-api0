import type { Metadata } from 'next';
import { UseCases } from '@/components/UseCases';
import { fr } from '@/i18n/fr';

export const metadata: Metadata = {
  title: fr.meta.useCasesTitle,
  description: fr.meta.useCasesDescription,
  alternates: { canonical: '/fr/use-cases', languages: { en: '/use-cases', fr: '/fr/use-cases' } },
};

export default function UseCasesPageFr() {
  return <UseCases lang="fr" />;
}
