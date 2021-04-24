import { ScoresRepository } from '../../../core/application/ScoresRepository';
import { UserScore } from '../../../core/domain/UserScore';

export class InMemoryScoresRepository implements ScoresRepository {
  private readonly entities: { [id: string]: UserScore } = {};

  async save(userScore: UserScore): Promise<void> {
    this.entities[userScore.userId] = userScore;
  }

  findAll(): Promise<UserScore[]> {
    return Promise.resolve(Object.keys(this.entities).map((score) => this.entities[score]));
  }

  findByUserId(userId: string): Promise<UserScore | undefined> {
    return Promise.resolve(this.entities[userId]);
  }
}
