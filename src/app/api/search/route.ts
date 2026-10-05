import { createSearchHandlers } from '@knotaru/docs-ui';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export const { staticGET: GET } = createSearchHandlers(source, { language: 'english' });
