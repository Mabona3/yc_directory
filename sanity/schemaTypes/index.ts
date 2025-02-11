import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { startup } from './startup.ts';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup ],
}
