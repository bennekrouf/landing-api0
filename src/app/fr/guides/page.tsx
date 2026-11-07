import type { Metadata } from 'next';
import { GuideList } from '@/components/guides/GuideList';
import { fr } from '@/i18n/fr';

export const metadata: Metadata = {
  title: fr.meta.guidesTitle,
  description: fr.meta.guidesDescription,
  alternates: { canonical: '/fr/guides', languages: { en: '/guides', fr: '/fr/guides' } },
};

export default function GuidesPageFr() {
  return <GuideList lang="fr" />;
}
