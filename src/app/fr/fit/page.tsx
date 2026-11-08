import type { Metadata } from 'next';
import { FitCheck } from '@/components/FitCheck';
import { fr } from '@/i18n/fr';

export const metadata: Metadata = {
  title: fr.meta.fitTitle,
  description: fr.meta.fitDescription,
  alternates: { canonical: '/fr/fit', languages: { en: '/fit', fr: '/fr/fit' } },
};

export default function FitPageFr() {
  return <FitCheck lang="fr" />;
}
