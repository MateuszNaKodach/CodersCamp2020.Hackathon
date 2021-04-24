import { UserScore } from '../domain/UserScore';

export interface ScoresRepository {
  save(userScore: UserScore): Promise<void>;

  findAll(): Promise<UserScore[]>;

  findByUserId(userId: string): Promise<UserScore | undefined>;
}
