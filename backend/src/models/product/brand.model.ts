import {
  Prop,
  ModelOptions,
  getModelForClass,
  type DocumentType,
  type ReturnModelType,
} from '@typegoose/typegoose';
import { container } from 'tsyringe';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Brand {
  @Prop()
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  img: string;

  @Prop({ default: true })
  status: boolean;
}

// global container
export const BRAND_KEY = Brand.name;
container.registerInstance(BRAND_KEY, getModelForClass(Brand));

// types
export type BrandModel = ReturnModelType<typeof Brand>;
export type BrandDocument = DocumentType<Brand>;
