import { GuidePage, guideMetadata, guideStaticParams } from '@/lib/guide-page';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => guideStaticParams('fr');
export const generateMetadata = (props: Params) => guideMetadata('fr', props);

export default function Page(props: Params) {
  return GuidePage('fr', props);
}
