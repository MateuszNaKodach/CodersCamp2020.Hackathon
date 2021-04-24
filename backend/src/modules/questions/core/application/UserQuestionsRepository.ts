import { UserQuestions } from '../domain/UserQuestions';

export interface UserQuestionsRepository {
  save(userQuestions: UserQuestions): Promise<void>;

  findByAuthorId(authorId: string): Promise<UserQuestions | undefined>;
}
