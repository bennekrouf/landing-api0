import type { Metadata } from 'next';
import { Home } from '@/components/Home';

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { en: '/', fr: '/fr' } },
};

export default function HomePage() {
  return <Home lang="en" />;
}
