import type { Request } from 'express';
import { ActivityEnum } from '@/constants';
import { inject, singleton } from 'tsyringe';
import { ACTIVITY_KEY, type ActivityModel } from '@/models/activity.model';

@singleton()
export class ActivityService {
  constructor(
    @inject(ACTIVITY_KEY)
    private activityModel: ActivityModel,
  ) {}

  async create(user_id: string, type: ActivityEnum, req: Request) {
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
      user_id,
      browser,
      platform,
      ip_address,
    });
  }
}
