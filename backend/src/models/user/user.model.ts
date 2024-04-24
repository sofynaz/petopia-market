import { RoleEnum } from '@/constants';
import { passwordHash } from '@/shared/utils';
import {
  Pre,
  Prop,
  ModelOptions,
  getModelForClass,
  type DocumentType,
  type ReturnModelType,
} from '@typegoose/typegoose';
import { container } from 'tsyringe';

// middleware decorator
@Pre<User>('save', function (next) {
  if (this.password) {
    if (!this?.isModified('password')) return next();
    this.password = passwordHash(this.password);
  }
  next();
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  fullname?: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: RoleEnum.CUSTOMER, enum: RoleEnum })
  role: RoleEnum;

  @Prop()
  avatar?: string;

  @Prop({ default: false })
  is_blocked: boolean;

  @Prop({ default: false })
  is_email_verify: boolean;

  @Prop({ default: false })
  is_phone_verify: boolean;

  get isAdmin() {
    return this.role === RoleEnum.ADMIN;
  }

  get isCustomer() {
    return this.role === RoleEnum.CUSTOMER;
  }

  get isSeller() {
    return this.role === RoleEnum.SELLER;
  }
}

// global container
export const USER_KEY = User.name;
container.registerInstance(USER_KEY, getModelForClass(User));

// types
export type UserDocument = DocumentType<User>;
export type UserModel = ReturnModelType<typeof User>;
