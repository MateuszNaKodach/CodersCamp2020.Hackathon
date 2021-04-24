import { GroupQuestionsRepository } from '../../../core/application/GroupQuestionsRepository';
import { GroupQuestions } from '../../../core/domain/GroupQuestions';

export class InMemoryGroupQuestionsRepository implements GroupQuestionsRepository {
  private readonly entities: { [groupId: string]: GroupQuestions } = {};

  findByGroupId(groupId: string): Promise<GroupQuestions | undefined> {
    return Promise.resolve(this.entities[groupId]);
  }

  async save(groupQuestions: GroupQuestions): Promise<void> {
    this.entities[groupQuestions.groupId] = groupQuestions;
  }

  findAll(): Promise<GroupQuestions[]> {
    return Promise.resolve(Object.keys(this.entities).map((groupId) => this.entities[groupId]));
  }
}
