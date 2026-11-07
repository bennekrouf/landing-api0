import type { Metadata } from 'next';
import { GuideList } from '@/components/guides/GuideList';
import { en } from '@/i18n/en';

export const metadata: Metadata = {
  title: en.meta.guidesTitle,
  description: en.meta.guidesDescription,
  alternates: { canonical: '/guides', languages: { en: '/guides', fr: '/fr/guides' } },
};

export default function GuidesPage() {
  return <GuideList />;
}
