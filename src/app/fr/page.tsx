import type { Metadata } from 'next';
import { Home } from '@/components/Home';
import { fr } from '@/i18n/fr';

export const metadata: Metadata = {
  title: { absolute: fr.meta.title },
  description: fr.meta.description,
  alternates: { canonical: '/fr', languages: { en: '/', fr: '/fr' } },
  openGraph: { locale: 'fr_CH', url: '/fr', title: fr.meta.title, description: fr.meta.description },
};

export default function HomePageFr() {
  return <Home lang="fr" />;
}
