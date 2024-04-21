import type { Schema } from 'mongoose';

export const format = (schema: Schema) =>
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret, _options) {
      const id = ret._id;
      delete ret._id;
      return { id, ...ret };
    },
  });
