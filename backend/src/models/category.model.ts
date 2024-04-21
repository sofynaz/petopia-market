import {
  Prop,
  type Ref,
  type DocumentType,
  type ReturnModelType,
  ModelOptions,
  getModelForClass,
} from '@typegoose/typegoose';
import { container } from 'tsyringe';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Category {
  @Prop({ ref: () => Category })
  parent: Ref<Category>;

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
export const CATEGORY_KEY = Category.name;
container.registerInstance(CATEGORY_KEY, getModelForClass(Category));

// types
export type CategoryModel = ReturnModelType<typeof Category>;
export type CategoryDocument = DocumentType<Category>;
