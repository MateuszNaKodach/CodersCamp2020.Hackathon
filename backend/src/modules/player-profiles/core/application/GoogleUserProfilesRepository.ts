import { GoogleUserProfile } from '../domain/GoogleUserProfile';

export interface GoogleUserProfilesRepository {
  save(userProfile: GoogleUserProfile): Promise<void>;

  findByPlayerId(userId: string): Promise<GoogleUserProfile | undefined>;

  findAll(): Promise<GoogleUserProfile[]>;
}
