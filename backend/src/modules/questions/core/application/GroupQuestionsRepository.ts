import { GroupQuestions } from '../domain/GroupQuestions';

export interface GroupQuestionsRepository {
  save(groupQuestions: GroupQuestions): Promise<void>;

  findByGroupId(groupId: string): Promise<GroupQuestions | undefined>;

  findAll(): Promise<GroupQuestions[]>;
}
