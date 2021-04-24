import { GroupQuiz } from '../domain/GroupQuiz';

export interface GroupQuizRepository {
  findByGroupId(groupId: string): Promise<GroupQuiz[]>;

  save(quiz: GroupQuiz): Promise<void>;
}
