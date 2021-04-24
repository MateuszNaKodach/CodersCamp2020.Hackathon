import { UserQuestionsRepository } from '../../../core/application/UserQuestionsRepository';
import { UserQuestions } from '../../../core/domain/UserQuestions';

export class InMemoryQuestionsRepository implements UserQuestionsRepository {
  private readonly entities: { [id: string]: UserQuestions } = {};

  async save(userQuestions: UserQuestions): Promise<void> {
    this.entities[userQuestions.authorId] = userQuestions;
  }

  findByAuthorId(authorId: string): Promise<UserQuestions | undefined> {
    return Promise.resolve(this.entities[authorId]);
  }
}
