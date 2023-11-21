import { Repository } from './repository.interface';
import { User } from '@domain/user';

export interface UserRepository extends Repository<User> {}
