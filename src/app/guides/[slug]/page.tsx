import { GuidePage, guideMetadata, guideStaticParams } from '@/lib/guide-page';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => guideStaticParams('en');
export const generateMetadata = (props: Params) => guideMetadata('en', props);

export default function Page(props: Params) {
  return GuidePage('en', props);
}
