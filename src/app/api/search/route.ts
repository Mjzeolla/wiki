import { createSearchHandlers } from '@knotaru/docs-ui';
import { source } from '@/lib/source';

export const { GET } = createSearchHandlers(source, { language: 'english' });
