import { GroupQuestionsRepository } from '../../../core/application/GroupQuestionsRepository';
import { GroupQuestion } from '../../../core/domain/GroupQuestion';

export class InMemoryGroupQuestionsRepository implements GroupQuestionsRepository {
  private readonly entities: { [id: string]: GroupQuestion } = {};

  findByGroupId(groupId: string): Promise<GroupQuestion | undefined> {
    return Promise.resolve(Object.values(this.entities).find((q) => q.groupId === groupId));
  }

  async save(question: GroupQuestion): Promise<void> {
    this.entities[question.questionId] = question;
  }
}
