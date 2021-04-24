import { UserProfile } from '../domain/UserProfile';

export interface UserProfilesRepository {
  save(userProfile: UserProfile): Promise<void>;

  findByPlayerId(userId: string): Promise<UserProfile | undefined>;

  findAll(): Promise<UserProfile[]>;
}
