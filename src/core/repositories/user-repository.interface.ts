import { Repository } from './repository.interface';
import { User } from '@core/domain/user';

export interface UserRepository extends Repository<User> {}
