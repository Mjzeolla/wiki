import { createLLMIndexResponse } from '@knotaru/docs-ui';
import { source } from '@/lib/source';

export const revalidate = false;

export function GET() {
  return createLLMIndexResponse(source);
}
