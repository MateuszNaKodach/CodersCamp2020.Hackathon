import { GroupQuestion } from '../domain/GroupQuestion';

export interface AskingGroupQuestionRepository {
  save(currentGroupQuestion: GroupQuestion): Promise<void>;

  findByGroupId(groupId: string): Promise<GroupQuestion | undefined>;
}
