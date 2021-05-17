import { UserProfileRepository } from '../../../core/application/UserProfileRepository';
import { UserProfile } from '../../../core/domain/UserProfile';

export class InMemoryUserProfileRepository implements UserProfileRepository {
  private readonly entities: { [id: string]: UserProfile } = {};

  findByUserId(userId: string): Promise<UserProfile | undefined> {
    return Promise.resolve(this.entities[userId]);
  }

  async save(userProfile: UserProfile): Promise<void> {
    this.entities[userProfile.userId] = userProfile;
  }

  findAll(): Promise<UserProfile[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }

  findByUserEmail(email: string): Promise<UserProfile | undefined> {
    const allUsers: UserProfile[] = Object.keys(this.entities).map((id) => this.entities[id]);
    const user: UserProfile | undefined = allUsers.find(elem => elem.email === email);
    return Promise.resolve(user);
  }
}
