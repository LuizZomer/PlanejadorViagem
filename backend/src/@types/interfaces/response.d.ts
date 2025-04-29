import { User } from '@prisma/client';
import { Response } from 'express';

export interface RequestWithUser extends Response {
  user: User;
}
