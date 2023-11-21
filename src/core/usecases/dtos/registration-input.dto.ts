import { User } from '@core/domain/user';

export default interface RegistrationInputDto {
  user: Omit<User, 'id'>;
}
