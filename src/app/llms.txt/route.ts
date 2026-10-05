import { createLLMIndexResponse } from '@knotaru/docs-ui';
import { publicMarkdown } from '@/config/site';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const response = createLLMIndexResponse(source);
  return new Response(publicMarkdown(await response.text()), { headers: response.headers });
}
