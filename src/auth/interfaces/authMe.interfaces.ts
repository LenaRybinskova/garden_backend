import { User } from '@prisma/client';

export interface AuthenticatedUser extends User {
  id: string;
  login: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: AuthenticatedUser;
}