import { UserQuestions } from '../domain/UserQuestions';

export interface QuestionsRepository {
  save(userQuestions: UserQuestions): Promise<void>;

  findAll(): Promise<UserQuestions[]>;
}
