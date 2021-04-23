import { QuestionsRepository } from '../../../core/application/QuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';
import { TournamentId } from '../../../core/domain/TournamentId';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private readonly entities: { [id: string]: UserQuestions } = {};

  async save(registrations: UserQuestions): Promise<void> {
    this.entities[registrations.tournamentId.raw] = new UserQuestions();
  }

  findAll(): Promise<UserQuestions[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
