import type { Metadata } from 'next';
import { FitCheck } from '@/components/FitCheck';
import { en } from '@/i18n/en';

export const metadata: Metadata = {
  title: en.meta.fitTitle,
  description: en.meta.fitDescription,
  alternates: { canonical: '/fit', languages: { en: '/fit', fr: '/fr/fit' } },
};

export default function FitPage() {
  return <FitCheck />;
}
