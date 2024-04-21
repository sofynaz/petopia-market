import { User } from './user.model';
import { container } from 'tsyringe';
import {
  Prop,
  type Ref,
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
} from '@typegoose/typegoose';

export class Token {
  @Prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Prop({ required: true, unique: true })
  jti: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: false })
  is_block: boolean;

  @Prop()
  expires_at?: Date;

  @Prop()
  blocked_at?: Date;
}

// global container
export const TOKEN_KEY = Token.name;
container.registerInstance(TOKEN_KEY, getModelForClass(Token));

// types
export type TokenModel = ReturnModelType<typeof Token>;
export type TokenDocument = DocumentType<Token>;
