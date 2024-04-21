import config from '@/conf/config';
import { container } from 'tsyringe';
import { UserService } from '@/apps/users';
import { UnauthorizedError } from '@repo/core';
import { Messages, TokenEnum } from '@/constants';
import { Strategy, ExtractJwt } from 'passport-jwt';

/**
 * Access token strategy
 */
export const JwtStrategy = new Strategy(
  {
    secretOrKey: config.get('jwt.secret'),
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req) => req.cookies?.['accessToken'] || null,
    ]),
  },
  async (payload, done) => {
    try {
      if (payload.type !== TokenEnum.ACCESS)
        throw new UnauthorizedError(`Access ${Messages.TOKEN_TYPE_INVALID}`);
      // find user
      const user = await container.resolve(UserService).findById(payload.sub);
      // check user is not blocked
      if (user.is_blocked)
        throw new UnauthorizedError(Messages.USER_IS_BLOCKED);
      // return user to done callback function
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
