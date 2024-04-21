import jwt from 'jsonwebtoken';
import config from '@/conf/config';
import { singleton } from 'tsyringe';
import { UnauthorizedError } from '@repo/core';

export interface JwtPayload extends jwt.JwtPayload {
  type?: string;
}

@singleton()
export class JwtTokenHelper {
  private get secret(): string {
    return config.get('jwt.secret');
  }

  private get jti(): string {
    return crypto.randomUUID();
  }

  private get iss(): string {
    return config.get('jwt.issuer');
  }

  /**
   * create jwt payload
   */
  payload(sub: string, extra?: Record<string, any>): JwtPayload {
    return { jti: this.jti, iss: this.iss, sub, ...extra };
  }

  /**
   * create jwt token
   */
  generate(payload: JwtPayload, options?: jwt.SignOptions) {
    // create jwt token
    const token = jwt.sign(payload, this.secret, options);
    // token
    return token;
  }

  /**
   * verify jwt token
   */
  verify<T = JwtPayload>(token: string, options?: jwt.VerifyOptions): T {
    try {
      return jwt.verify(token, this.secret, options) as T;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError)
        throw new UnauthorizedError('Jwt token is expired');
      if (error instanceof jwt.JsonWebTokenError)
        throw new UnauthorizedError(error.message);
      throw error;
    }
  }
}
