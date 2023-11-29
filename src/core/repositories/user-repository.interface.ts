import { User } from '@core/domain/user';
import { Repository } from './repository.interface';

export interface UserRepository extends Repository<User> {}
