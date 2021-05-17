import { UserProfile } from '../domain/UserProfile';

export interface UserProfileRepository {
  save(userProfile: UserProfile): Promise<void>;

  findByUserId(userId: string): Promise<UserProfile | undefined>;

  findByUserEmail(email: string): Promise<UserProfile | undefined>;

  findAll(): Promise<UserProfile[]>;
}
