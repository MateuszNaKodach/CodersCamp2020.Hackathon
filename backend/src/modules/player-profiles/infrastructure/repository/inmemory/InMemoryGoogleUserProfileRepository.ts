import { GoogleUserProfilesRepository } from '../../../core/application/GoogleUserProfilesRepository';
import { GoogleUserProfile } from '../../../core/domain/GoogleUserProfile';

export class InMemoryGoogleUserProfileRepository implements GoogleUserProfilesRepository {
  private readonly entities: { [id: string]: GoogleUserProfile } = {};

  findByPlayerId(userId: string): Promise<GoogleUserProfile | undefined> {
    return Promise.resolve(this.entities[userId]);
  }

  async save(userProfile: GoogleUserProfile): Promise<void> {
    this.entities[userProfile.userId] = userProfile;
  }

  findAll(): Promise<GoogleUserProfile[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
