import { container } from 'tsyringe';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';

/**
 * Local strategy
 */
export const LocalStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username: string, password: string, done) => {
    try {
      // check user is validate or not
      const user = await container
        .resolve(AuthService)
        .auth(username, password);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);
