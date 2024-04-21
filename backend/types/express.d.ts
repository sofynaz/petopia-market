import type { UserDocument } from '@/models/user.model';

// Extend the User interface in the Express namespace
declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}
