import type { UserDocument } from '@/models';

// Extend the User interface in the Express namespace
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
