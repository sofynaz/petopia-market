import { User } from './user.model';
import { container } from 'tsyringe';
import { ActivityEnum } from '@/constants';
import {
  Prop,
  type Ref,
  type DocumentType,
  type ReturnModelType,
  getModelForClass,
} from '@typegoose/typegoose';

export class Activity {
  @Prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Prop({ type: String, default: ActivityEnum.LOGIN, enum: ActivityEnum })
  type: ActivityEnum;

  @Prop()
  browser?: string;

  @Prop()
  platform?: string;

  @Prop()
  ip_address?: string;

  @Prop({ default: Date.now })
  logged_at: Date;
}

// global container
export const ACTIVITY_KEY = Activity.name;
container.registerInstance(ACTIVITY_KEY, getModelForClass(Activity));

// types
export type ActivityModel = ReturnModelType<typeof Activity>;
export type ActivityDocument = DocumentType<Activity>;
