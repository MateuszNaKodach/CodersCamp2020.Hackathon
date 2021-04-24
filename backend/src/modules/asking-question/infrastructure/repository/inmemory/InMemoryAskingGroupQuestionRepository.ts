import { AskingGroupQuestionRepository } from '../../../core/application/AskingGroupQuestionRepository';
import { GroupQuestion } from '../../../core/domain/GroupQuestion';

export class InMemoryAskingGroupQuestionRepository implements AskingGroupQuestionRepository {
  private readonly entities: { [id: string]: GroupQuestion } = {};

  findByGroupId(groupId: string): Promise<GroupQuestion | undefined> {
    return Promise.resolve(this.entities[groupId]);
  }

  async save(question: GroupQuestion): Promise<void> {
    this.entities[question.questionId] = question;
  }
}
