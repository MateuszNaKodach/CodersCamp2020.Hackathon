import { QuestionsRepository } from '../../../core/application/QuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private readonly entities: { [id: string]: UserQuestions } = {};

  async save(userQuestions: UserQuestions): Promise<void> {
    this.entities[userQuestions.questionId] = userQuestions;
  }

  findAll(): Promise<UserQuestions[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
