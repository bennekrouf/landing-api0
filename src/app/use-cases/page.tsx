import type { Metadata } from 'next';
import { UseCases } from '@/components/UseCases';
import { en } from '@/i18n/en';

export const metadata: Metadata = {
  title: en.meta.useCasesTitle,
  description: en.meta.useCasesDescription,
  alternates: { canonical: '/use-cases', languages: { en: '/use-cases', fr: '/fr/use-cases' } },
};

export default function UseCasesPage() {
  return <UseCases />;
}
