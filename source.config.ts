import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

const knowledgeStatus = z.enum(['seedling', 'growing', 'evergreen']);

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      tags: z.array(z.string()).default([]),
      status: knowledgeStatus.default('seedling'),
      aliases: z.array(z.string()).default([]),
      sources: z.array(z.url()).default([]),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({});
