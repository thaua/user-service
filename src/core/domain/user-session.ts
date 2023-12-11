import { User } from '@core/domain/user';

export class UserSession implements Omit<User, 'passwordHash'> {
  email: string;
  id: number;
  name: string;
  photoUrl?: string | null;
}
