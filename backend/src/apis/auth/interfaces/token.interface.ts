import type { TokenEnum } from '@/constants';

export type Payload = {
  user: string;
  save: boolean;
  type: TokenEnum;
  expiresIn: string;
  [key: string]: any;
};
