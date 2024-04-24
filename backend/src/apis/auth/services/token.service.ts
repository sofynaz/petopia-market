import ms from 'ms';
import config from '@/conf/config';
import { TOKEN_KEY, type TokenModel } from '@/models';
import { JwtTokenHelper } from '@/shared/helpers';
import { inject, singleton } from 'tsyringe';
import { UnauthorizedError } from '@repo/core';
import { Messages, TokenEnum } from '@/constants';
import { Payload } from '../interfaces';

@singleton()
export class TokenService {
  constructor(
    @inject(TOKEN_KEY)
    private readonly tokenModel: TokenModel,
    private readonly jwtTokenHelper: JwtTokenHelper,
  ) {}

  async isBlock(jti: string) {
    const token = await this.tokenModel.findOne({ jti });
    // check token is blocked or not
    if (token?.is_block) throw new UnauthorizedError(Messages.TOKEN_BLOCKED);
  }

  async doBlock(jti: string) {
    const token = await this.tokenModel.findOneAndUpdate(
      { jti },
      { is_block: true, blocked_at: new Date() },
    );
    return token;
  }

  async verify(token: string, type: TokenEnum) {
    // verify token
    const payload = this.jwtTokenHelper.verify(token);
    // check token type
    if (payload.type !== type)
      throw new UnauthorizedError(Messages.TOKEN_TYPE_INVALID);
    return payload;
  }

  async create({ expiresIn, save, user, ...payload }: Payload) {
    // generate payload
    const _payload = this.jwtTokenHelper.payload(user, payload);
    // generate token
    const token = this.jwtTokenHelper.generate(_payload, { expiresIn });
    // save token
    if (save)
      await this.tokenModel.create({
        user,
        token,
        jti: _payload.jti,
        type: payload.type,
        is_block: false,
        blocked_at: null,
        expires_at: new Date(Date.now() + ms(expiresIn)),
      });

    return token;
  }

  async refreshToken(user: string) {
    const exp = config.get<string>('jwt.refreshExp');
    // create token
    const token = await this.create({
      user,
      save: true,
      type: TokenEnum.REFRESH,
      expiresIn: exp,
    });
    return { token, maxAge: ms(exp) };
  }

  async accessToken(user: string) {
    const exp = config.get<string>('jwt.accessExp');
    // create token
    const token = await this.create({
      user,
      save: false,
      type: TokenEnum.ACCESS,
      expiresIn: exp,
    });
    return { token, maxAge: ms(exp) };
  }

  async generate(user: string) {
    // generate access and refresh token
    const [access, refresh] = await Promise.all([
      this.accessToken(user),
      this.refreshToken(user),
    ]);
    return { access, refresh };
  }

  async refreshAccessToken(token: string) {
    // verify token
    const payload = await this.verify(token, TokenEnum.REFRESH);
    // check token is blocked, throw error
    await this.isBlock(payload.jti);
    // generate new token
    return await this.accessToken(payload.sub);
  }

  async blockRefreshToken(token: string) {
    // verify token
    const payload = await this.verify(token, TokenEnum.REFRESH);
    // check token is blocked, throw error
    await this.isBlock(payload.jti);
    // block token
    return await this.doBlock(payload.jti);
  }
}
