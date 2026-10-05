import { createFullLLMResponse } from '@knotaru/docs-ui';
import { getLLMText, source } from '@/lib/source';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return createFullLLMResponse(source, getLLMText);
}
