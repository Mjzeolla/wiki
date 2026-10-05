import { createKnotaruOpenGraphImage } from '@knotaru/docs-ui';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getPageImage, source } from '@/lib/source';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET(_request: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return createKnotaruOpenGraphImage({
    title: page.data.title,
    description: page.data.description,
    site: siteConfig.name,
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
