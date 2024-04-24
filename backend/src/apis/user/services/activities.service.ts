import type { Request } from 'express';
import { ActivityEnum } from '@/constants';
import { inject, singleton } from 'tsyringe';
import { ACTIVITY_KEY, type ActivityModel } from '@/models';

@singleton()
export class ActivityService {
  constructor(
    @inject(ACTIVITY_KEY)
    private activityModel: ActivityModel,
  ) {}

  async create(user: string, type: ActivityEnum, req: Request) {
    const useragent = req.useragent;
    // get os/platform
    const platform = useragent.platform;
    // remote ip/client id
    const ip_address = req.socket.remoteAddress;
    // browser
    const browser = useragent.browser;
    // save all client activity
    return await this.activityModel.create({
      type,
      user,
      browser,
      platform,
      ip_address,
    });
  }

  async login(user: string, req: Request) {
    return this.create(user, ActivityEnum.LOGIN, req);
  }

  async logout(user: string, req: Request) {
    return this.create(user, ActivityEnum.LOGOUT, req);
  }
}
