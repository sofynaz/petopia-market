import passport from 'passport';
import { AuthEnum } from '@/constants';

export const LocalAuth = passport.authenticate(AuthEnum.LOCAL, {
  session: false,
});

export const JwtAuth = passport.authenticate(AuthEnum.JWT, {
  session: false,
});
