import { UserProfilesRepository } from '../../../core/application/UserProfilesRepository';
import { UserProfile } from '../../../core/domain/UserProfile';

export class InMemoryUserProfileRepository implements UserProfilesRepository {
  private readonly entities: { [id: string]: UserProfile } = {};

  findByPlayerId(userId: string): Promise<UserProfile | undefined> {
    return Promise.resolve(this.entities[userId]);
  }

  async save(userProfile: UserProfile): Promise<void> {
    this.entities[userProfile.userId] = userProfile;
  }

  findAll(): Promise<UserProfile[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
